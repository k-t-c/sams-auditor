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

  let items = itemsGetCustomSortedItemsNames();

  for (const item of items) {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    selector.appendChild(option);
  }

  // Insert at the top of the arsenal view
  arsenalView.insertBefore(selector, arsenalView.firstChild);
  
  document.getElementById("arsenalItemSelector").addEventListener("change", function (e) {
    arsenalProcessSelection();
  });
  document.getElementById("arsenalChartType").addEventListener("change", function (e) {
    arsenalProcessSelection();
  });
}

function arsenalDataReady() {
  arsenalPopulateItemDropdown();
}
