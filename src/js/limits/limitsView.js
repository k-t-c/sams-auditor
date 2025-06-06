function limitsMakeInputNumericOnly(el) {
  el.type = "number";
  el.setAttribute("inputmode", "numeric");
  el.addEventListener("keypress", function (evt) {
    if (evt.key === "Enter") {
      // allow enter keypresses
      return;
    }
    if (evt.which < 48 || evt.which > 57) {
      // prevent anything else that's not numeric
      evt.preventDefault();
    }
  });
}

function limitsRenderItems() {
  let items = window.itemDefinitions;
  if (!items) {
    // TODO: error handling
    return;
  }
  const itemLimitsViewDiv = document.getElementById("itemLimitsView");
  itemLimitsViewDiv.innerHTML = "";
  
  const resetAllButton = document.createElement("button");
  resetAllButton.type = "button";
  resetAllButton.id = "limitsResetAll";
  resetAllButton.innerHTML = "Reset All to Default";
  resetAllButton.addEventListener("click", limitsResetAllToDefault);
  resetAllButton.style = "margin: auto auto 1em auto";
  itemLimitsViewDiv.appendChild(resetAllButton);

  const form = document.createElement("form");
  form.id = "itemLimitsForm";
  const itemNames = itemsGetCustomSortedItemsNames();
  for (const itemName of itemNames) {
    const id = "limit-" + itemName.replace(" ", "-");
    const an = items[itemName].acceptableNumbers;

    const div = document.createElement("div");
    div.id = id;
    div.setAttribute("data-value", itemName);

    const span0 = document.createElement("span");
    span0.innerHTML = `${itemName}`;
    span0.classList = "itemLimitsView-spacer";

    const span1 = document.createElement("span");
    span1.innerHTML = " is limited to ";

    const singlePurchaseLabel = document.createElement("label");
    singlePurchaseLabel.htmlFor = id + "-singlePurchaseLabel";
    const singlePurchaseInput = document.createElement("input");
    singlePurchaseInput.id = id + "-singlePurchaseInput";
    limitsMakeInputNumericOnly(singlePurchaseInput);
    const singlePurchaseValue = an.perSingleTransaction;
    singlePurchaseInput.value = singlePurchaseValue;
    singlePurchaseInput.setAttribute("data-value", singlePurchaseValue);

    const span2 = document.createElement("span");
    span2.innerHTML = ` purchases in a single transaction or `;

    const perTimeIntervalLabel = document.createElement("label");
    perTimeIntervalLabel.htmlFor = id + "-perTimeIntervalLabel";
    const perTimeIntervalInput = document.createElement("input");
    perTimeIntervalInput.id = id + "-perTimeIntervalInput";
    limitsMakeInputNumericOnly(perTimeIntervalInput);
    const perTimeIntervalValue = an.perTimeInterval;
    perTimeIntervalInput.value = perTimeIntervalValue;
    perTimeIntervalInput.setAttribute("data-value", perTimeIntervalValue);

    const span3 = document.createElement("span");
    span3.innerHTML = ` purchases within `;

    const timeIntervalLabel = document.createElement("label");
    timeIntervalLabel.htmlFor = id + "-timeIntervalLabel";
    const timeIntervalInput = document.createElement("input");
    timeIntervalInput.id = id + "-timeIntervalInput";
    limitsMakeInputNumericOnly(timeIntervalInput);
    const timeIntervalValue = an.timeDescription.split(" ")[0];
    timeIntervalInput.value = timeIntervalValue;
    timeIntervalInput.setAttribute("data-value", timeIntervalValue);

    const selectLabel = document.createElement("label");
    selectLabel.htmlFor = id + "-selectLabel";
    const select = document.createElement("select");
    select.id = id + "-timeIntervalSelect";
    select.innerHTML = `
            <option>Seconds</option>
            <option>Minutes</option>
            <option>Hours</option>
            <option>Days</option>
            <option>Weeks</option>
        `;
    const timeDescriptionValue = an.timeDescription.split(" ")[1];
    select.value = timeDescriptionValue;
    select.setAttribute("data-value", timeDescriptionValue);

    div.appendChild(span0);
    div.appendChild(span1);
    div.appendChild(singlePurchaseLabel);
    div.appendChild(singlePurchaseInput);
    div.appendChild(span2);
    div.appendChild(perTimeIntervalLabel);
    div.appendChild(perTimeIntervalInput);
    div.appendChild(span3);
    div.appendChild(timeIntervalLabel);
    div.appendChild(timeIntervalInput);
    div.appendChild(selectLabel);
    div.appendChild(select);

    if (!limitsItemIsDefault(itemName)) {
      const resetItemButton = document.createElement("button");
      resetItemButton.type = "button";
      resetItemButton.id = `limitsReset${itemName.replace(" ", "-")}`;
      resetItemButton.innerHTML = "Reset to Default";
      resetItemButton.dataset.itemName = itemName;
      const callback = function (event) {
        const itemName = event.target.dataset.itemName;
        limitsResetItemToDefault(itemName);
      };
      resetItemButton.addEventListener("click", callback);
      div.appendChild(resetItemButton);
    }

    form.appendChild(div);
  }
  itemLimitsViewDiv.appendChild(form);
}
