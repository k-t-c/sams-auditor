function populateItemDropdown() {
  const arsenalView = document.getElementById("arsenalView");
  if (!arsenalView) return;

  // Remove old selector if it exists
  const oldSelector = document.getElementById("itemSelector");
  if (oldSelector) {
      oldSelector.remove();
  }

  const selector = document.createElement("select");
  selector.id = "itemSelector";

  for (const item of ITEM_TYPES) {
      const option = document.createElement("option");
      option.value = item;
      option.textContent = item;
      selector.appendChild(option);
  }

  // Insert at the top of the arsenal view
  arsenalView.insertBefore(selector, arsenalView.firstChild);
}


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