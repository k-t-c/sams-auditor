function checkPurchaseViolationsGroupedByInitiator(initiators, ITEM_DEFINITIONS) {
  const result = {};

  for (const initiator of initiators) {
    const itemTimestampsMap = {};
    const initiatorViolations = [];
    const usedTimestamps = new Set(); // <-- to skip already-violated txs in rateNum

    for (const tx of initiator.transactions) {
      if (!(tx instanceof ArsenalTransaction)) continue;

      const { itemName, quantity, timestamp, doneAt } = tx;
      const def = ITEM_DEFINITIONS[itemName];
      if (!def || !def.acceptableNumbers) continue;

      const { numAtOnce, rateNum, rateInterval } = def.acceptableNumbers;

      // Violation: too many in one transaction
      if (quantity > numAtOnce) {
        initiatorViolations.push({
          type: "numAtOnce",
          itemName,
          quantity,
          allowed: numAtOnce,
          timestamp,
          timestamps: [doneAt],
          description: `Bought ${quantity}x ${itemName} in one transaction (limit: ${numAtOnce})`,
        });
        usedTimestamps.add(doneAt); // mark it to skip in rateNum
      }

      if (!itemTimestampsMap[itemName]) {
        itemTimestampsMap[itemName] = [];
      }

      itemTimestampsMap[itemName].push({ quantity, timestamp, doneAt });
    }

    for (const [itemName, entries] of Object.entries(itemTimestampsMap)) {
      const def = ITEM_DEFINITIONS[itemName];
      if (!def || !def.acceptableNumbers) continue;

      const { rateNum, rateInterval } = def.acceptableNumbers;
      entries.sort((a, b) => a.timestamp - b.timestamp);

      let windowStart = 0;
      let cumulativeQty = 0;

      for (let i = 0; i < entries.length; i++) {
        const { timestamp, quantity, doneAt } = entries[i];

        if (usedTimestamps.has(doneAt)) continue;

        cumulativeQty += quantity;

        while (timestamp - entries[windowStart].timestamp > rateInterval) {
          if (!usedTimestamps.has(entries[windowStart].doneAt)) {
            cumulativeQty -= entries[windowStart].quantity;
          }
          windowStart++;
        }

        const timestampsInWindow = entries
          .slice(windowStart, i + 1)
          .filter(e => !usedTimestamps.has(e.doneAt))
          .map(e => e.doneAt);

        const totalInWindow = entries
          .slice(windowStart, i + 1)
          .filter(e => !usedTimestamps.has(e.doneAt))
          .reduce((sum, e) => sum + e.quantity, 0);

        if (totalInWindow > rateNum) {
          initiatorViolations.push({
            type: "rateNum",
            itemName,
            quantityWindow: totalInWindow,
            allowed: rateNum,
            windowStart: entries[windowStart].timestamp,
            windowEnd: timestamp,
            timestamps: timestampsInWindow,
            description: `Bought ${totalInWindow}x ${itemName} within ${rateInterval / 1000}s (limit: ${rateNum})`,
          });

          // Optionally mark all involved as used — uncomment below if you want stricter filtering
          // timestampsInWindow.forEach(t => usedTimestamps.add(t));
        }
      }
    }

    if (initiatorViolations.length > 0) {
      result[initiator.id] = {
        name: initiator.name,
        violations: initiatorViolations,
      };
    }
  }

  return result;
}



function reportViolations () {
    const groupedViolations = checkPurchaseViolationsGroupedByInitiator(
      Object.values(initiatorsByID),
      ITEM_DEFINITIONS
    );
    console.log(groupedViolations);
    let targetDiv = document.getElementById("violationsReport");
    if (targetDiv) {
        let violatorsById = Object.keys(groupedViolations);
        // render results here
        
        targetDiv.innerHTML = ""; // clear previous output

        for (const initiatorID of violatorsById) {
          const { name, violations } = groupedViolations[initiatorID];

          // Create a container for this initiator
          const initiatorSection = document.createElement("div");
          initiatorSection.classList.add("initiator-block");

          // Add a heading for the initiator
          const header = document.createElement("h3");
          header.textContent = `${name} (${initiatorID})`;
          initiatorSection.appendChild(header);

          // Create a list of violations
          const list = document.createElement("ul");
          violations.forEach(v => {
            const li = document.createElement("li");

            const timeList = v.timestamps.map(t => `\n      • ${t}`).join("");

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
}

