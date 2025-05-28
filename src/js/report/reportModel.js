function reportNormalizeItemKey(raw = "") {
  return raw.trim().toLowerCase();
}

// returns grouped obj
function reportCheckPurchaseViolationsGroupedByInitiator(initiators = [], itemDefinitions = {}) {
  const defsByKey = Object.fromEntries(
    Object.entries(itemDefinitions).map(([k, v]) => [
      reportNormalizeItemKey(k),
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

      const lookupKey = reportNormalizeItemKey(tx.itemName ?? "");
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
              convertMsToString(timeInterval)
            } (limit: ${perTimeInterval})`,
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
function reportBuildViolationsText(groupedViolations) {
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