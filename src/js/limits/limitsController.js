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
    console.log("[target, target.value] >", [target, target.value]);
    const itemName = target.parentElement.id.slice(6).replace("-", " ");
    console.log("itemName>", itemName);
    console.log("ITEM_DEFINITION", window.itemDefinitions[itemName]);

    // const currentValue
    switch (true) {
      case id.includes("-singlePurchaseInput"):
        console.log("single purchase input case");
        limitsSetSingleTransaction(itemName, parseInt(target.value));
        break;
      case id.includes("-perTimeIntervalInput"):
        console.log("per time interval input case");
        limitsSetPerTimeInterval(itemName, parseInt(target.value));
        break;
      case id.includes("-timeIntervalInput") || id.includes("-timeIntervalSelect"):
        const inputId = `limit-${itemName.replace(" ", "-")}-timeIntervalInput`;
        const selectId = `limit-${itemName.replace(" ", "-")}-timeIntervalSelect`
        console.log("time interval input or time interval select case");

        const inputValue = document.getElementById(inputId)?.value;
        const selectValue = document.getElementById(selectId)?.value;
        console.log("[inputValue, selectValue]", [inputValue, selectValue]);
        const newLimitStr = `${inputValue} ${selectValue}`;
        const newLimit = getMsFromString(newLimitStr);
        console.log("newLimit", newLimit);
        limitsSetTimeInterval(itemName, newLimit);
        
        break;
      default:
        // TODO: error handing
        break;
    }
  });
});
