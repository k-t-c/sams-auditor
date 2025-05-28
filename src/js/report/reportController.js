function normaliseItemKey(raw = "") {
  return raw.trim().toLowerCase();
}

// returns grouped obj
function checkPurchaseViolationsGroupedByInitiator(initiators = [], itemDefinitions = {}) {
  const defsByKey = Object.fromEntries(
    Object.entries(itemDefinitions).map(([k, v]) => [
      normaliseItemKey(k),
      { ...v, __displayName: k.trim() },
    ])
  );

  const result = {};

  for (const initiator of initiators) {
    if (!initiator || !Array.isArray(initiator.transactions)) continue;

    const itemTimestampsMap = {};
    const initiatorViolations = [];
    const usedTxnKeys = new Set();

    for (const tx of initiator.transactions) {
      if (!(tx instanceof ArsenalTransaction)) continue;

      const lookupKey = normaliseItemKey(tx.itemName ?? "");
      const def = defsByKey[lookupKey];
      if (!def || !def.acceptableNumbers) continue;

      const itemNameForReport = def.__displayName;
      const ts = typeof tx.timestamp === "number" ? tx.timestamp : new Date(tx.timestamp).getTime();
      const doneAt = tx.doneAt;
      const qty = tx.quantity ?? 0;
      const { perSingleTransaction, perTimeInterval, timeInterval } = def.acceptableNumbers;

      // perSingleTransaction
      if (qty > perSingleTransaction) {
        initiatorViolations.push({
          type: "perSingleTransaction",
          itemName: itemNameForReport,
          quantity: qty,
          allowed: perSingleTransaction,
          timestamps: [doneAt],
          description: `Bought ${qty}x ${itemNameForReport} in one transaction (limit: ${perSingleTransaction})`,
        });
        usedTxnKeys.add(`${doneAt}|${ts}`);
      }

      // gather for perTimeInterval
      (itemTimestampsMap[lookupKey] ||= []).push({ quantity: qty, timestamp: ts, doneAt });
    }

    // perTimeInterval sliding windows
    for (const [lookupKey, entries] of Object.entries(itemTimestampsMap)) {
      const def = defsByKey[lookupKey];
      if (!def) continue;
      const { perTimeInterval, timeInterval } = def.acceptableNumbers;
      const itemNameForReport = def.__displayName;
      entries.sort((a, b) => a.timestamp - b.timestamp);

      for (let i = 0; i < entries.length; i++) {
        const base = entries[i];
        const winEnd = base.timestamp + timeInterval;
        const windowEntries = entries.filter(
          (e) =>
            e.timestamp >= base.timestamp &&
            e.timestamp <= winEnd &&
            !usedTxnKeys.has(`${e.doneAt}|${e.timestamp}`)
        );

        // de‑dup
        const uniq = [];
        const seen = new Set();
        for (const e of windowEntries) {
          const k = `${e.doneAt}|${e.timestamp}`;
          if (seen.has(k)) continue;
          seen.add(k);
          uniq.push(e);
        }

        const totalQty = uniq.reduce((s, e) => s + e.quantity, 0);
        if (totalQty > perTimeInterval) {
          initiatorViolations.push({
            type: "perTimeInterval",
            itemName: itemNameForReport,
            quantityWindow: totalQty,
            allowed: perTimeInterval,
            windowStart: base.timestamp,
            windowEnd: winEnd,
            timestamps: uniq.map((e) => e.doneAt),
            description: `Bought ${totalQty}x ${itemNameForReport} within ${
              timeInterval / 1000
            }s (limit: ${perTimeInterval})`,
          });
          uniq.forEach((e) => usedTxnKeys.add(`${e.doneAt}|${e.timestamp}`));
        }
      }
    }

    if (initiatorViolations.length) {
      result[initiator.id] = { name: initiator.name, violations: initiatorViolations };
    }
  }
  return result;
}

//  plain text export helpers
function buildViolationsText(groupedViolations) {
  const lines = [];
  for (const [initiatorID, { name, violations }] of Object.entries(groupedViolations)) {
    lines.push(`${name} (${initiatorID})`);
    violations.forEach((v) => {
      lines.push(`  • ${v.description}`);
      lines.push("    Timestamps:");
      v.timestamps.forEach((t) => lines.push(`      – ${t}`));
      lines.push("");
    });
    lines.push("");
  }
  return lines.join("\n");
}

function exportViolationsReport() {
  const grouped = checkPurchaseViolationsGroupedByInitiator(
    Object.values(initiatorsByID),
    window.itemDefinitions
  );
  if (!Object.keys(grouped).length) {
    alert("No violations to export.");
    return;
  }

  const txt = buildViolationsText(grouped);
  const blob = new Blob([txt], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `violations-report-${new Date().toISOString().slice(0, 10)}.txt`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}

//  for on‑screen view. super quick and dirty
function reportViolations() {
  const groupedViolations = checkPurchaseViolationsGroupedByInitiator(
    Object.values(initiatorsByID),
    window.itemDefinitions
  );

  console.log(groupedViolations);

  const targetDiv = document.getElementById("violationsReport");
  if (!targetDiv) return;

  targetDiv.innerHTML = "";
  const ids = Object.keys(groupedViolations);
  if (!ids.length) {
    targetDiv.textContent = "No violations found.";
    return;
  }

  ids.forEach((id) => {
    const { name, violations } = groupedViolations[id];
    const section = document.createElement("div");
    section.classList.add("initiator-block");
    section.innerHTML = `<h3>${name} (${id})</h3>`;
    const ul = document.createElement("ul");
    violations.forEach((v) => {
      const li = document.createElement("li");
      li.innerHTML = `${v.description}<br><em>Timestamps:</em><pre>${v.timestamps
        .map((t) => `\n      • ${t}`)
        .join("")}</pre>`;
      ul.appendChild(li);
    });
    section.appendChild(ul);
    targetDiv.appendChild(section);
  });
}

// logging out a list of item definitions and limits in plain english
/* for (const item of Object.keys(window.itemDefinitions)) {
    if (window.itemDefinitions.hasOwnProperty(item)) {
        const an = window.itemDefinitions[item].acceptableNumbers;
        let interval = an.timeInterval && an.timeInterval || 0
        let description = "";
        if (rateTable[interval]) {
            description = rateTable[interval];
        }
        else {
            description = `${interval / 1000} seconds`;
        }
        console.log(`${item} has limit:\n  ${an.perSingleTransaction} in a single transaction\n  or ${an.perTimeInterval} per ${description}`);
    }
} */