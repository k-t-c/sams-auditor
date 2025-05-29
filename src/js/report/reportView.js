//  for on‑screen view. super quick and dirty
function reportViolations() {
  const groupedViolations = reportCheckPurchaseViolationsGroupedByInitiator(
    Object.values(initiatorsByID),
    window.itemDefinitions
  );

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