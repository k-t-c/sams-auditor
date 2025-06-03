function arsenalPopulateItemDropdown() {
  const arsenalView = document.getElementById("arsenalView");
  if (!arsenalView) return;

  // Remove old selector if it exists
  const oldSelector = document.getElementById("arsenalItemSelector");
  if (oldSelector) {
      oldSelector.remove();
  }

  const selector = document.createElement("select");
  selector.id = "arsenalItemSelector";

  for (const item of Object.keys(window.itemDefinitions)) {
      const option = document.createElement("option");
      option.value = item;
      option.textContent = item;
      selector.appendChild(option);
  }

  // Insert at the top of the arsenal view
  arsenalView.insertBefore(selector, arsenalView.firstChild);
}

window.addEventListener("DOMContentLoaded", arsenalPopulateItemDropdown);