const LIMITS_UPPER_RANGE = {
  perSingleTransaction: 1000,
  perTimeInterval: 1000,
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

function limitsValidateInput(newValue, inputType) {
  let results = [false, -1];
  if (newValue !== 0 && !newValue) {
    handleError("limitsValidateInput > newValue is undefined.");
    return results;
  }
  if (!inputType) {
    handleError("limitsValidateInput > type is undefined.");
    return results;
  }
  
  newValue = parseInt(newValue);

  if(!isInt(newValue)) {
    handleError("limitsValidateInput > newValue is not an integer.", "Please enter an integer.");
    return results;
  }

  let upperLimit = 0;
  switch (inputType) {
    case "singlePurchaseInput":
      upperLimit = LIMITS_UPPER_RANGE.perSingleTransaction;
      break;
    case "perTimeIntervalInput":
      upperLimit = LIMITS_UPPER_RANGE.perTimeInterval;
      break;
    case "timeIntervalInput":
      upperLimit = LIMITS_UPPER_RANGE.timeInterval;
      if (newValue > upperLimit) {
        showMessage("Please set a time limit of 3 weeks or less");
        return [true, upperLimit];
      }
      break;
    default:
      handleError("limitsValidateInput > inputType value is invalid");
      break;
  }

  if (newValue < 0 || newValue > upperLimit) {
    let message = "";
    if (inputType === "timeIntervalInput") {
      message = "Please enter a time range from 0 Seconds to 3 Weeks";
    }
    else {
      message = `Please enter a value from 0 to ${upperLimit}`
    }
    showMessage(message);
    newValue < 0 ? results = [true, 0] : results = [true, upperLimit]
    return results;
  }
    results = [true, newValue];
    
  return results;
}

function limitsHandleChange(event) {
  const target = event.target;
  const currentValue = target.dataset.value;
  let newValue = target.value;
  const id = target.id;
  const itemName = target.parentElement.id.slice(6).replace("-", " ");

  let validationResults = [false, -1];

  switch (true) {
    case id.includes("singlePurchaseInput"):
      validationResults = limitsValidateInput(newValue, "singlePurchaseInput");
      if (validationResults[0]) {
        limitsSetSingleTransaction(itemName, validationResults[1]);
      }
      break;
    case id.includes("perTimeIntervalInput"):
      validationResults = limitsValidateInput(newValue, "perTimeIntervalInput");
      if (validationResults[0]) {
        limitsSetPerTimeInterval(itemName, validationResults[1]);
      }
      break;
    case id.includes("timeIntervalInput") || id.includes("timeIntervalSelect"):
      const inputId = `limit-${itemName.replace(" ", "-")}-timeIntervalInput`;
      const selectId = `limit-${itemName.replace(" ", "-")}-timeIntervalSelect`;

      const inputValue = document.getElementById(inputId)?.value;
      const selectValue = document.getElementById(selectId)?.value;
      const newLimitStr = `${inputValue} ${selectValue}`;
      const newLimit = getMsFromString(newLimitStr);
      validationResults = limitsValidateInput(newLimit, "timeIntervalInput");
      if (validationResults[0]) {
        limitsSetTimeInterval(itemName, validationResults[1]);
      }
      break;
    default:
      // TODO: error handing
      break;
  }

  if (!validationResults[0]) {
    target.value = currentValue;
  }
}