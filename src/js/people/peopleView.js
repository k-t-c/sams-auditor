function peopleRenderTransactions(peopleDatalistValue = null, personID = null, renderType = null) {
  let transactions = [];
  let container = document.getElementById("peopleReportContainer");
  if (!container) {
    handleError("peopleRenderTransactions > container doesn't exist");
  }
  if(!personID) {
    handleError("peopleRenderTransactions > Invalid or missing renderType");
  }
  if(!renderType || typeof renderType !== "string") {
    handleError("peopleRenderTransactions > Invalid or missing renderType");
  }
  container.innerHTML = "";

  let headerDiv = document.createElement("div");

  switch (renderType) {
    case "all":
      container.appendChild(initiatorsByID[personID].getRenderableAllTransactions());
      break;
    case "arsenal":
      //let container = document.getElementById("peopleReportContainer");
      container.appendChild(initiatorsByID[personID].getRenderableArsenalTransactions());
      break;
    case "check":
      // TODO: FIX CHECK TRANSACTION DETECTION
      container.appendChild(initiatorsByID[personID].getRenderableCheckTransactions());
      break;
    case "deposit":
      container.appendChild(initiatorsByID[personID].getRenderableDepositTransactions());
      break;
    case "invoice":
      container.appendChild(initiatorsByID[personID].getRenderableInvoiceTransactions());
      break;
    case "payment":
      container.appendChild(initiatorsByID[personID].getRenderablePaymentTransactions());
      break;
    case "salary":
      container.appendChild(initiatorsByID[personID].getRenderableSalaryTransactions());
      break;
    case "transferIn":
      container.appendChild(initiatorsByID[personID].getRenderableTransferInTransactions());
      break;
    case "transferOut":
      container.appendChild(initiatorsByID[personID].getRenderableTransferOutTransactions());
      break;
    case "withdraw":
      container.appendChild(initiatorsByID[personID].getRenderableWithdrawTransactions());
      break;
    case "other":
      console.log("peopleRenderTransactions >", "TODO >", renderType);
      break;
    default:
      console.log("peopleRenderTransactions >", "TODO >", renderType);
      break;
  }
  console.log("transactions >", transactions);
  /* if (transactions.length <= 0) {
    container.innerHTML = `No ${renderType} transactions by ${personID}`
    return;
  }
  container.appendChild(headerDiv);
  peopleRenderFilteredTransactions (container, peopleDatalistValue, renderType, transactions); */
}
function convertKvToDivPair(key, value) {
  let returnDiv = document.createElement("div");
  returnDiv.innerHTML = `<span>${key}</span> <span>${value}</span>`
  return returnDiv;
}
function peopleGetRenderedTransaction (renderType, transaction) {
  let returnDiv = document.createElement("div");
  returnDiv.className = "transaction";
  
  
  switch (transaction.type) {
    case "Arsenal":
      returnDiv.className += " arsenalTransaction";
      break;
    case "Check":
      
      break;
    case "Deposit":
      
      break;
    case "Invoice":
      
      break;
    case "Payment":
      
      break;
    case "Salary":
      
      break;
    case "TransferIn":
      
      break;
    case "TransferOut":
      
      break;
    case "Withdraw":
      
      break;
    case "Other":
      break;
    default:
      break;
  }

  returnDiv.appendChild(wrapSpan(transaction.fromAccount));
  returnDiv.appendChild(wrapSpan(transaction.toAccount));
  returnDiv.appendChild(wrapSpan(transaction.amount));
  returnDiv.appendChild(wrapSpan(transaction.description));
  returnDiv.appendChild(wrapSpan(transaction.doneAt));


  return returnDiv;
}

function peopleRenderFilteredTransactions (container, peopleDatalistValue, renderType, transactions) {
  for (const transaction of transactions) {
    const transactionDiv = peopleGetRenderedTransaction(renderType, transaction);
    container.appendChild(transactionDiv);
  }
}