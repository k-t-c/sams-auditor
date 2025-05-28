function populateItemDropdown() {
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

// TODO: move all below this line to a new main.js or boot.js
window.addEventListener('DOMContentLoaded', populateItemDropdown);

document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach(button => {
      button.addEventListener("click", () => {
          const target = button.dataset.tab;

          tabButtons.forEach(btn => btn.classList.remove("active"));
          button.classList.add("active");

          tabContents.forEach(content => {
              content.classList.toggle("active", content.id === target);
          });
      });
  });
});