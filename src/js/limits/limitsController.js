const LIMITS_UPPER_RANGE = {
  perSingleTransaction: 100,
  perTimeInterval: 10,
  timeInterval: 1814400000,
};

function limitsDataReady() {
  const itemDefinitions = getItemDefinitions();
  limitsRenderItems(itemDefinitions);

  const itemLimitsForm = document.querySelector("#itemLimitsView");
  itemLimitsForm.addEventListener("change", (event) => {
    limitsHandleChange(event);
  });
}

function limitsUpdated() {
  localStorage.setItem("itemDefinitions", JSON.stringify(window.itemDefinitions));
  limitsRenderItems();
  reportViolations();
  showMessage("Limits Updated");
}
