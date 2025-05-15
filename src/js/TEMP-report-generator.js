/**
 * ---------------------------------------------------------------
 *  Purchase‑violation checker  (no auto‑execution / no ES‑modules)
 * ---------------------------------------------------------------
 *  ‑ No `export` / `import` – this file is a plain <script> include.
 *  ‑ Nothing runs on page‑load; you must call `reportViolations()` (or
 *    `checkPurchaseViolationsGroupedByInitiator()` directly) yourself.
 *  ‑ `reportViolations()` is **bit‑for‑bit identical** to the original so any
 *    existing code that invokes it will work as before.
 *
 *  Improvements kept from earlier iterations:
 *    • Case‑insensitive + trimmed item‑name matching.
 *    • ISO‑string timestamps converted to epoch‑ms before arithmetic.
 *    • Consistent de‑dupe key to prevent double‑counting.
 * ---------------------------------------------------------------
 */

// helper – lower‑case/trim once
function normaliseItemKey(raw = "") {
  return raw.trim().toLowerCase();
}

/**
 * Core algorithm.
 *
 * @param {Array} initiators       – list of initiator objects whose
 *                                   `.transactions` is an array of
 *                                   `ArsenalTransaction` objects.
 * @param {Object} itemDefinitions – ITEM_DEFINITIONS lookup (global in app).
 *
 * @return {Object} grouped by initiatorID → { name, violations:[…] }
 */
function checkPurchaseViolationsGroupedByInitiator(initiators = [], itemDefinitions = {}) {
  // Build a case‑insensitive lookup table each invocation (cheap, small N)
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
      if (!def || !def.acceptableNumbers) continue; // unknown item

      const itemNameForReport = def.__displayName;
      const timestampMs =
        typeof tx.timestamp === "number" ? tx.timestamp : new Date(tx.timestamp).getTime();
      const doneAt = tx.doneAt;
      const quantity = tx.quantity ?? 0;
      const { numAtOnce, rateNum, rateInterval } = def.acceptableNumbers;

      // 1) numAtOnce violation – too many in one transaction
      if (quantity > numAtOnce) {
        initiatorViolations.push({
          type: "numAtOnce",
          itemName: itemNameForReport,
          quantity,
          allowed: numAtOnce,
          timestamps: [doneAt],
          description: `Bought ${quantity}x ${itemNameForReport} in one transaction (limit: ${numAtOnce})`,
        });
        usedTxnKeys.add(`${doneAt}|${timestampMs}`);
      }

      // Collect for sliding‑window check
      (itemTimestampsMap[lookupKey] ||= []).push({
        quantity,
        timestamp: timestampMs,
        doneAt,
      });
    }

    // 2) rateNum violation – too many within interval
    for (const [lookupKey, entries] of Object.entries(itemTimestampsMap)) {
      const def = defsByKey[lookupKey];
      if (!def) continue;
      const { rateNum, rateInterval } = def.acceptableNumbers;
      const itemNameForReport = def.__displayName;

      // sort oldest‑first
      entries.sort((a, b) => a.timestamp - b.timestamp);

      for (let i = 0; i < entries.length; i++) {
        const base = entries[i];
        const windowEnd = base.timestamp + rateInterval;

        // collect entries in window not already consumed by another violation
        const windowEntries = entries.filter(
          (e) =>
            e.timestamp >= base.timestamp &&
            e.timestamp <= windowEnd &&
            !usedTxnKeys.has(`${e.doneAt}|${e.timestamp}`)
        );

        // de‑dup identical rows
        const unique = [];
        const seenKeys = new Set();
        for (const e of windowEntries) {
          const k = `${e.doneAt}|${e.timestamp}`;
          if (seenKeys.has(k)) continue;
          seenKeys.add(k);
          unique.push(e);
        }

        const totalQty = unique.reduce((sum, e) => sum + e.quantity, 0);
        if (totalQty > rateNum) {
          initiatorViolations.push({
            type: "rateNum",
            itemName: itemNameForReport,
            quantityWindow: totalQty,
            allowed: rateNum,
            windowStart: base.timestamp,
            windowEnd: windowEnd,
            timestamps: unique.map((e) => e.doneAt),
            description: `Bought ${totalQty}x ${itemNameForReport} within ${
              rateInterval / 1000
            }s (limit: ${rateNum})`,
          });
          unique.forEach((e) => usedTxnKeys.add(`${e.doneAt}|${e.timestamp}`));
        }
      }
    }

    if (initiatorViolations.length) {
      result[initiator.id] = {
        name: initiator.name,
        violations: initiatorViolations,
      };
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
//  reportViolations()  ←  UNCHANGED from original implementation
// ---------------------------------------------------------------------------
function reportViolations() {
  const groupedViolations = checkPurchaseViolationsGroupedByInitiator(
    Object.values(initiatorsByID),
    ITEM_DEFINITIONS
  );

  console.log(groupedViolations);

  const targetDiv = document.getElementById("violationsReport");
  if (!targetDiv) return;

  // wipe previous render
  targetDiv.innerHTML = "";

  const violatorsById = Object.keys(groupedViolations);
  if (violatorsById.length === 0) {
    targetDiv.textContent = "No violations found.";
    return;
  }

  for (const initiatorID of violatorsById) {
    const { name, violations } = groupedViolations[initiatorID];

    const initiatorSection = document.createElement("div");
    initiatorSection.classList.add("initiator-block");

    const header = document.createElement("h3");
    header.textContent = `${name} (${initiatorID})`;
    initiatorSection.appendChild(header);

    const list = document.createElement("ul");

    violations.forEach((v) => {
      const li = document.createElement("li");
      const timeList = v.timestamps.map((t) => `\n      • ${t}`).join("");

      li.innerHTML = `
          ${v.description}<br>
          <em>Timestamps:</em><pre>${timeList}</pre>
        `;
      list.appendChild(li);
    });

    initiatorSection.appendChild(list);
    targetDiv.appendChild(initiatorSection);
  }
}
