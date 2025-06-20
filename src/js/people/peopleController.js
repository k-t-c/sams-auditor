let peopleLastChoice = "";

function peopleDropdownOnPick (e) {
  const {value, list, inputType} = e.target;
  if (inputType === "insertReplacementText") {
    peopleDropdownAccept(value);
    return;
  }
  const isExactMatch = [...list.options].some(o => o.value === value);
  if (isExactMatch && value !== peopleLastChoice) {
    peopleDropdownAccept(value);
  }
}

function peopleDropdownAccept(v){
  peopleHandleDropdownChange();
}

function peopleHandleDropdownChange (event) {
  const peopleDatalistValue = document.getElementById("peopleDatalistInput").value;
  const personIDChoice = document.querySelector(`#peopleDatalist option[value="${peopleDatalistValue}"]`).dataset.id;
  const transactionTypeChoice = document.getElementById("peopleTransactionTypeSelect").value;
  console.log("ID >", personIDChoice);
  console.log("Transaction Type >", transactionTypeChoice);
}

function peoplePopulateItemDropdown () {
  if (!initiatorsByID || Object.keys(initiatorsByID).length <= 0) {
    handleError("initiatorsById does not exist or length is 0");
    return;
  }
  else {
    const datalistDiv = document.getElementById("peopleDatalist");
    if (!datalistDiv) {
      handleError("peopleDatalist not found");
      return;
    }
    for (const initiatorID of Object.keys(initiatorsByID)) {
      const intitiator = initiatorsByID[initiatorID];
      const name = intitiator["name"];
      const optionEl = document.createElement("option");
      const optionElValue = `(${initiatorID}) ${name}`;
      optionEl.value = optionElValue
      optionEl.setAttribute("data-value", optionElValue);
      optionEl.setAttribute("data-id", initiatorID);

      datalistDiv.appendChild(optionEl);
    }
  }
}

function peopleDataReady () {
  peoplePopulateItemDropdown();
  document.getElementById("peopleDatalistInput").addEventListener("input", peopleDropdownOnPick);
  document.getElementById("peopleTransactionTypeSelect").addEventListener("change", peopleHandleDropdownChange);
}