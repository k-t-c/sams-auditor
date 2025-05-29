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
    const id = target.id;
    const itemName = target.parentElement.id.slice(6).replace("-", " ");

    // const currentValue
    switch (true) {
      case id.includes("-singlePurchaseInput"):
        limitsSetSingleTransaction(itemName, parseInt(target.value));
        break;
      case id.includes("-perTimeIntervalInput"):
        limitsSetPerTimeInterval(itemName, parseInt(target.value));
        break;
      case id.includes("-timeIntervalInput") || id.includes("-timeIntervalSelect"):
        const inputId = `limit-${itemName.replace(" ", "-")}-timeIntervalInput`;
        const selectId = `limit-${itemName.replace(" ", "-")}-timeIntervalSelect`

        const inputValue = document.getElementById(inputId)?.value;
        const selectValue = document.getElementById(selectId)?.value;
        const newLimitStr = `${inputValue} ${selectValue}`;
        const newLimit = getMsFromString(newLimitStr);
        limitsSetTimeInterval(itemName, newLimit);
        
        break;
      default:
        // TODO: error handing
        break;
    }
  });
});
