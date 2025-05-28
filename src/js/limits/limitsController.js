const LIMITS_UPPER_RANGE = {
  perSingleTransaction: 100,
  perTimeInterval: 10,
  timeInterval: 1814400000,
};

function limitsDataReady() {}

function limitsUpdated() {
  localStorage.setItem("itemDefinitions", JSON.stringify(window.itemDefinitions));
  limitsRenderItems();
  reportViolations();
}

document.addEventListener("DOMContentLoaded", () => {
  const itemDefinitions = getItemDefinitions();
  limitsRenderItems(itemDefinitions);

  const itemLimitsForm = document.querySelector("#itemLimitsView");
  itemLimitsForm.addEventListener("change", (event) => {
    const target = event.target;
    console.log("target >", target);
    const itemName = target.parentElement.id.slice(6).replace("-", " ");
    console.log("itemName>", itemName);
    console.log("ITEM_DEFINITION", window.itemDefinitions[itemName]);

    // const currentValue
    switch (target) {
      case 'input[type="number"], select':
        break;

      default:
        break;
    }
  });
});
