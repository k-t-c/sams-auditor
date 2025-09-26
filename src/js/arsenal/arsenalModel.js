class Transaction {
  constructor(row) {
    let dateObj = new Date(row.doneAt);
    this.action = row.action;
    this.doneBy = row.doneBy;
    this.fromAccount = parseInt(row.fromAccount || 0);
    this.toAccount = parseInt(row.toAccount || 0);
    this.amount = parseInt(row.amount || 0);
    this.description = row.description;
    this.doneAt = row.doneAt;

    this.dateObj = dateObj;
    this.timestamp = dateObj.getTime();
    this.raw = row;

    const regex = /(.+?) \((\d+)\)/;
    const match = row.doneBy?.match(regex);
    if (match && match.length > 2) {
      this.initiatorName = match[1];
      this.initiatorID = parseInt(match[2]);
    } else {
      this.initiatorName = null;
      this.initiatorID = null;
    }
  }
}

class ArsenalTransaction extends Transaction {
  constructor(row) {
    super(row);
    this.type = "Arsenal";
    const regex = /(\d+)x(.+?)\s+by\s+(.+?)\((\d+)\)/;
    const match = row.description.match(regex);
    if (match && match.length > 4) {
      this.quantity = parseInt(match[1] || 0);
      this.itemName = match[2] || "";
      this.initiatorName = (match[3] && match[3].trim()) || "";
      this.initiatorID = parseInt(match[4] || 0);
    }
  }
}

class CheckTransaction extends Transaction {
  constructor(row) {
    super(row);
    this.type = "Check";
    const regex = /by (.+?)\((\d+)\) for (\d+)\((.+?)\)\. Reason: (.+)/;
    const match = row.description.match(regex);
    if (match && match.length > 5) {
      this.initiatorName = match[1] || "";
      this.initiatorID = parseInt(match[2] || 0);
      this.recipientID = parseInt(match[3] || 0);
      this.recipientName = match[4] || "";
      this.reason = match[5] || 0;
    }
  }
}

class DepositTransaction extends Transaction {
  constructor(row) {
    super(row);
    this.type = "Deposit";
  }
}

class InvoiceTransaction extends Transaction {
  constructor(row) {
    super(row);
    this.type = "Invoice";
    const regex = /charging (.+?)\. (None|Silver|Gold|Platinum) Insurance\. Reference number (\d+)/;
    const match = row.description.match(regex);
    if (match) {
      this.insuranceLevel = match[2] || "";
      this.invoiceNumber = parseInt(match[3] || 0);
    }
  }
}

class OtherTransaction extends Transaction {
  constructor(row) {
    super(row);
    this.type = "Other";
  }
}

class PaymentTransaction extends Transaction {
  constructor(row) {
    super(row);
    this.type = "Payment";
  }
}

class SalaryTransaction extends Transaction {
  constructor(row) {
    super(row);
    this.type = "Salary";
    const regex = /for (.+?)\((\d+)\)/;
    const match = row.description.match(regex);
    if (match && match.length > 2) {
      this.initiatorName = match[1] || "";
      this.initiatorID = parseInt(match[2] || 0);
    }
  }
}

class TransferInTransaction extends Transaction {
  constructor(row) {
    super(row);
    this.type = "TransferIn";
  }
}

class TransferOutTransaction extends Transaction {
  constructor(row) {
    super(row);
    this.type = "TransferOut";
  }
}

class WithdrawTransaction extends Transaction {
  constructor(row) {
    super(row);
    this.type = "Withdraw";
  }
}

class Purchase {
  constructor({ quantity, item, buyer, date, raw }) {
    this.quantity = quantity;
    this.item = item;
    this.buyer = buyer;
    this.date = new Date(date);
    this.raw = raw;
  }
}

class Initiator {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.transactions = [];
    this.salaryTransactions = [];
    this.totalSalary = 0;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
  addSalary(transaction) {
    this.totalSalary += transaction.amount;
    this.salaryTransactions.push(transaction);
  }
  getAllTransactions() {
    return this.transactions;
  }
  getArsenalTransactions() {
    return this.transactions.filter(transaction => transaction instanceof ArsenalTransaction);
  }
  getCheckTransactions() {
    return this.transactions.filter(transaction => transaction instanceof CheckTransaction);
  }
  getDepositTransactions() {
    return this.transactions.filter(transaction => transaction instanceof DepositTransaction);
  }
  getInvoiceTransactions() {
    return this.transactions.filter(transaction => transaction instanceof InvoiceTransaction);
  }
  getPaymentTransactions() {
    return this.transactions.filter(transaction => transaction instanceof PaymentTransaction);
  }
  getSalaryTransactions() {
    return this.transactions.filter(transaction => transaction instanceof SalaryTransaction);
  }
  getTransferInTransactions() {
    return this.transactions.filter(transaction => transaction instanceof TransferInTransaction);
  }
  getTransferOutTransactions() {
    return this.transactions.filter(transaction => transaction instanceof TransferOutTransaction);
  }
  getWithdrawTransactions() {
    return this.transactions.filter(transaction => transaction instanceof WithdrawTransaction);
  }
  getOtherTransactions() {
    return this.transactions.filter(transaction => transaction instanceof OtherTransaction);
  }

  getRenderableAllTransactions() {
    let returnDiv = document.createElement("div");
    
    let arsenalHeaderDiv = document.createElement("div");
    arsenalHeaderDiv.innerHTML = `Arsenal Transactions For (${this.id}) ${this.name}`;
    arsenalHeaderDiv.className = "transactionHeader";
    returnDiv.appendChild(arsenalHeaderDiv);
    returnDiv.appendChild(this.getRenderableArsenalTransactions());
    
    let checkHeaderDiv = document.createElement("div");
    checkHeaderDiv.innerHTML = `Check Transactions For (${this.id}) ${this.name}`;
    checkHeaderDiv.className = "transactionHeader";
    returnDiv.appendChild(checkHeaderDiv);
    returnDiv.appendChild(this.getRenderableCheckTransactions());

    let depositHeaderDiv = document.createElement("div");
    depositHeaderDiv.innerHTML = `Deposit Transactions For (${this.id}) ${this.name}`;
    depositHeaderDiv.className = "transactionHeader";
    returnDiv.appendChild(depositHeaderDiv);
    returnDiv.appendChild(this.getRenderableDepositTransactions());

    let invoiceHeaderDiv = document.createElement("div");
    invoiceHeaderDiv.innerHTML = `Invoice Transactions For (${this.id}) ${this.name}`;
    invoiceHeaderDiv.className = "transactionHeader";
    returnDiv.appendChild(invoiceHeaderDiv);
    returnDiv.appendChild(this.getRenderableInvoiceTransactions());

    let paymentHeaderDiv = document.createElement("div");
    paymentHeaderDiv.innerHTML = `Payment Transactions For (${this.id}) ${this.name}`;
    paymentHeaderDiv.className = "transactionHeader";
    returnDiv.appendChild(paymentHeaderDiv);
    returnDiv.appendChild(this.getRenderablePaymentTransactions());

    let salaryHeaderDiv = document.createElement("div");
    salaryHeaderDiv.innerHTML = `Salary Transactions For (${this.id}) ${this.name}`;
    salaryHeaderDiv.className = "transactionHeader";
    returnDiv.appendChild(salaryHeaderDiv);
    returnDiv.appendChild(this.getRenderableSalaryTransactions());

    let transferInHeaderDiv = document.createElement("div");
    transferInHeaderDiv.innerHTML = `Transfer In Transactions For (${this.id}) ${this.name}`;
    transferInHeaderDiv.className = "transactionHeader";
    returnDiv.appendChild(transferInHeaderDiv);
    returnDiv.appendChild(this.getRenderableTransferInTransactions());

    let transferOutHeaderDiv = document.createElement("div");
    transferOutHeaderDiv.innerHTML = `Transfer Out Transactions For (${this.id}) ${this.name}`;
    transferOutHeaderDiv.className = "transactionHeader";
    returnDiv.appendChild(transferOutHeaderDiv);
    returnDiv.appendChild(this.getRenderableTransferOutTransactions());

    let withdrawHeaderDiv = document.createElement("div");
    withdrawHeaderDiv.innerHTML = `Withdraw Transactions For (${this.id}) ${this.name}`;
    withdrawHeaderDiv.className = "transactionHeader";
    returnDiv.appendChild(withdrawHeaderDiv);
    returnDiv.appendChild(this.getRenderableWithdrawTransactions());

    let otherHeaderDiv = document.createElement("div");
    otherHeaderDiv.innerHTML = `Other Transactions For (${this.id}) ${this.name}`;
    otherHeaderDiv.className = "transactionHeader";
    returnDiv.appendChild(otherHeaderDiv);
    returnDiv.appendChild(this.getRenderableOtherTransactions());

    return returnDiv;
  }
  getRenderableArsenalTransactions() {
    let arsenalTransactions = this.getArsenalTransactions();
    let returnDiv = document.createElement("div");
    if (arsenalTransactions.length <= 0) {
      returnDiv.innerHTML = `No arsenal transactions.`;
      returnDiv.style.marginBottom = "0.5rem";
      return returnDiv;
    }

    let headerDiv = document.createElement("div");

    headerDiv.className = "transaction transactionHeader arsenalTransaction";
    headerDiv.appendChild(wrapSpan("Amount"));
    headerDiv.appendChild(wrapSpan("Description"));
    headerDiv.appendChild(wrapSpan("Date"));
    returnDiv.appendChild(headerDiv);
    
    for (const transaction of arsenalTransactions) {
      let transactionDiv = document.createElement("div");
      transactionDiv.className = "transaction arsenalTransaction";
      transactionDiv.appendChild(wrapSpan(transaction.amount));
      transactionDiv.appendChild(wrapSpan(transaction.description));
      transactionDiv.appendChild(wrapSpan(transaction.doneAt));
      
      returnDiv.appendChild(transactionDiv);
    }
    console.log("arsenal success");
    return returnDiv;
  }
  getRenderableCheckTransactions() {
    // TODO: FIX CHECK TRANSACTION DETECTION
    let checkTransactions = this.getCheckTransactions();
    let returnDiv = document.createElement("div");
    if (checkTransactions.length <= 0) {
      returnDiv.innerHTML = `No check transactions.`;
      returnDiv.style.marginBottom = "0.5rem";
      return returnDiv;
    }
    let headerDiv = document.createElement("div");
    
    headerDiv.className = "transaction transactionHeader checkTransaction";
    headerDiv.appendChild(wrapSpan("From Acct"));
    headerDiv.appendChild(wrapSpan("To Acct"));
    headerDiv.appendChild(wrapSpan("Amount"));
    headerDiv.appendChild(wrapSpan("Description"));
    headerDiv.appendChild(wrapSpan("Date"));
    returnDiv.appendChild(headerDiv);

    for (const transaction of checkTransactions) {
      let transactionDiv = document.createElement("div");
      transactionDiv.className = "transaction checkTransaction";
      transactionDiv.appendChild(wrapSpan(transaction.fromAccount));
      transactionDiv.appendChild(wrapSpan(transaction.toAccount));
      transactionDiv.appendChild(wrapSpan(transaction.amount));
      transactionDiv.appendChild(wrapSpan(transaction.description));
      transactionDiv.appendChild(wrapSpan(transaction.doneAt));
      
      returnDiv.appendChild(transactionDiv);
    }
    console.log("check success");
    return returnDiv;
  }
  getRenderableDepositTransactions() {
    let returnDiv = document.createElement("div");
    let depositTransactions = this.getDepositTransactions();
    if (depositTransactions.length <= 0) {
      returnDiv.innerHTML = `No deposit transactions.`;
      returnDiv.style.marginBottom = "0.5rem";
      return returnDiv;
    }
    
    let headerDiv = document.createElement("div");
    
    headerDiv.className = "transaction transactionHeader depositTransaction";
    headerDiv.appendChild(wrapSpan("From Acct"));
    headerDiv.appendChild(wrapSpan("To Acct"));
    headerDiv.appendChild(wrapSpan("Amount"));
    headerDiv.appendChild(wrapSpan("Description"));
    headerDiv.appendChild(wrapSpan("Date"));
    returnDiv.appendChild(headerDiv);

    for (const transaction of depositTransactions) {
      let transactionDiv = document.createElement("div");
      transactionDiv.className = "transaction depositTransaction";
      transactionDiv.appendChild(wrapSpan(transaction.fromAccount));
      transactionDiv.appendChild(wrapSpan(transaction.toAccount));
      transactionDiv.appendChild(wrapSpan(transaction.amount));
      transactionDiv.appendChild(wrapSpan(transaction.description));
      transactionDiv.appendChild(wrapSpan(transaction.doneAt));
      
      returnDiv.appendChild(transactionDiv);
    }
    console.log("deposit success");
    return returnDiv;
  }
  getRenderableInvoiceTransactions() {
    let returnDiv = document.createElement("div");
    let invoiceTransactions = this.getInvoiceTransactions();
    if (invoiceTransactions.length <= 0) {
      returnDiv.innerHTML = `No invoice transactions.`;
      returnDiv.style.marginBottom = "0.5rem";
      return returnDiv;
    }
    
    let headerDiv = document.createElement("div");
    
    headerDiv.className = "transaction transactionHeader invoiceTransaction";
    headerDiv.appendChild(wrapSpan("From Acct"));
    headerDiv.appendChild(wrapSpan("To Acct"));
    headerDiv.appendChild(wrapSpan("Amount"));
    headerDiv.appendChild(wrapSpan("Description"));
    headerDiv.appendChild(wrapSpan("Date"));
    returnDiv.appendChild(headerDiv);

    for (const transaction of invoiceTransactions) {
      let transactionDiv = document.createElement("div");
      transactionDiv.className = "transaction invoiceTransaction";
      transactionDiv.appendChild(wrapSpan(transaction.fromAccount));
      transactionDiv.appendChild(wrapSpan(transaction.toAccount));
      transactionDiv.appendChild(wrapSpan(transaction.amount));
      transactionDiv.appendChild(wrapSpan(transaction.description));
      transactionDiv.appendChild(wrapSpan(transaction.doneAt));
      
      returnDiv.appendChild(transactionDiv);
    }
    console.log("invoice success");
    return returnDiv;
  }
  getRenderablePaymentTransactions() {
    let returnDiv = document.createElement("div");
    let paymentTransactions = this.getPaymentTransactions();
    if (paymentTransactions.length <= 0) {
      returnDiv.innerHTML = `No payment transactions.`;
      returnDiv.style.marginBottom = "0.5rem";
      return returnDiv;
    }
    
    
    let headerDiv = document.createElement("div");
    
    headerDiv.className = "transaction transactionHeader paymentTransaction";
    headerDiv.appendChild(wrapSpan("From Acct"));
    headerDiv.appendChild(wrapSpan("To Acct"));
    headerDiv.appendChild(wrapSpan("Amount"));
    headerDiv.appendChild(wrapSpan("Description"));
    headerDiv.appendChild(wrapSpan("Date"));
    returnDiv.appendChild(headerDiv);

    for (const transaction of paymentTransactions) {
      let transactionDiv = document.createElement("div");
      transactionDiv.className = "transaction paymentTransaction";
      transactionDiv.appendChild(wrapSpan(transaction.fromAccount));
      transactionDiv.appendChild(wrapSpan(transaction.toAccount));
      transactionDiv.appendChild(wrapSpan(transaction.amount));
      transactionDiv.appendChild(wrapSpan(transaction.description));
      transactionDiv.appendChild(wrapSpan(transaction.doneAt));
      
      returnDiv.appendChild(transactionDiv);
    }
    console.log("payment success");
    return returnDiv;
  }
  getRenderableSalaryTransactions() {
    let returnDiv = document.createElement("div");
    let salaryTransactions = this.getSalaryTransactions();
    if (salaryTransactions.length <= 0) {
      returnDiv.innerHTML = `No salary transactions.`;
      returnDiv.style.marginBottom = "0.5rem";
      return returnDiv;
    }
    
    
    let headerDiv = document.createElement("div");
    
    headerDiv.className = "transaction transactionHeader salaryTransaction";
    headerDiv.appendChild(wrapSpan("From Acct"));
    headerDiv.appendChild(wrapSpan("To Acct"));
    headerDiv.appendChild(wrapSpan("Amount"));
    headerDiv.appendChild(wrapSpan("Description"));
    headerDiv.appendChild(wrapSpan("Date"));
    returnDiv.appendChild(headerDiv);

    for (const transaction of salaryTransactions) {
      let transactionDiv = document.createElement("div");
      transactionDiv.className = "transaction salaryTransaction";
      transactionDiv.appendChild(wrapSpan(transaction.fromAccount));
      transactionDiv.appendChild(wrapSpan(transaction.toAccount));
      transactionDiv.appendChild(wrapSpan(transaction.amount));
      transactionDiv.appendChild(wrapSpan(transaction.description));
      transactionDiv.appendChild(wrapSpan(transaction.doneAt));
      
      returnDiv.appendChild(transactionDiv);
    }
    console.log("salary success");
    return returnDiv;
  }
  getRenderableTransferInTransactions() {
    let returnDiv = document.createElement("div");
    let transferInTransactions = this.getTransferInTransactions();
    if (transferInTransactions.length <= 0) {
      returnDiv.innerHTML = `No transfer in transactions.`;
      returnDiv.style.marginBottom = "0.5rem";
      return returnDiv;
    }
    
    
    let headerDiv = document.createElement("div");
    
    headerDiv.className = "transaction transactionHeader transferInTransaction";
    headerDiv.appendChild(wrapSpan("From Acct"));
    headerDiv.appendChild(wrapSpan("To Acct"));
    headerDiv.appendChild(wrapSpan("Amount"));
    headerDiv.appendChild(wrapSpan("Description"));
    headerDiv.appendChild(wrapSpan("Date"));
    returnDiv.appendChild(headerDiv);

    for (const transaction of transferInTransactions) {
      let transactionDiv = document.createElement("div");
      transactionDiv.className = "transaction transferInTransaction";
      transactionDiv.appendChild(wrapSpan(transaction.fromAccount));
      transactionDiv.appendChild(wrapSpan(transaction.toAccount));
      transactionDiv.appendChild(wrapSpan(transaction.amount));
      transactionDiv.appendChild(wrapSpan(transaction.description));
      transactionDiv.appendChild(wrapSpan(transaction.doneAt));
      
      returnDiv.appendChild(transactionDiv);
    }
    console.log("transferIn success");
    return returnDiv;
  }
  getRenderableTransferOutTransactions() {
    let returnDiv = document.createElement("div");
    let transferOutTransactions = this.getTransferOutTransactions();
    if (transferOutTransactions.length <= 0) {
      returnDiv.innerHTML = `No transfer out transactions.`;
      returnDiv.style.marginBottom = "0.5rem";
      return returnDiv;
    }
    
    
    let headerDiv = document.createElement("div");
    
    headerDiv.className = "transaction transactionHeader transferOutTransaction";
    headerDiv.appendChild(wrapSpan("From Acct"));
    headerDiv.appendChild(wrapSpan("To Acct"));
    headerDiv.appendChild(wrapSpan("Amount"));
    headerDiv.appendChild(wrapSpan("Description"));
    headerDiv.appendChild(wrapSpan("Date"));
    returnDiv.appendChild(headerDiv);

    for (const transaction of transferOutTransactions) {
      let transactionDiv = document.createElement("div");
      transactionDiv.className = "transaction transferOutTransaction";
      transactionDiv.appendChild(wrapSpan(transaction.fromAccount));
      transactionDiv.appendChild(wrapSpan(transaction.toAccount));
      transactionDiv.appendChild(wrapSpan(transaction.amount));
      transactionDiv.appendChild(wrapSpan(transaction.description));
      transactionDiv.appendChild(wrapSpan(transaction.doneAt));
      
      returnDiv.appendChild(transactionDiv);
    }
    console.log("transferOut success");
    return returnDiv;
  }
  getRenderableWithdrawTransactions() {
    let returnDiv = document.createElement("div");
    let withdrawTransactions = this.getWithdrawTransactions();
    if (withdrawTransactions.length <= 0) {
      returnDiv.innerHTML = `No withdraw transactions.`;
      returnDiv.style.marginBottom = "0.5rem";
      return returnDiv;
    }
    
    
    let headerDiv = document.createElement("div");
    
    headerDiv.className = "transaction transactionHeader withdrawTransaction";
    headerDiv.appendChild(wrapSpan("From Acct"));
    headerDiv.appendChild(wrapSpan("To Acct"));
    headerDiv.appendChild(wrapSpan("Amount"));
    headerDiv.appendChild(wrapSpan("Description"));
    headerDiv.appendChild(wrapSpan("Date"));
    returnDiv.appendChild(headerDiv);

    for (const transaction of withdrawTransactions) {
      let transactionDiv = document.createElement("div");
      transactionDiv.className = "transaction withdrawTransaction";
      transactionDiv.appendChild(wrapSpan(transaction.fromAccount));
      transactionDiv.appendChild(wrapSpan(transaction.toAccount));
      transactionDiv.appendChild(wrapSpan(transaction.amount));
      transactionDiv.appendChild(wrapSpan(transaction.description));
      transactionDiv.appendChild(wrapSpan(transaction.doneAt));
      
      returnDiv.appendChild(transactionDiv);
    }
    console.log("withdraw success");
    return returnDiv;
  }
  getRenderableOtherTransactions() {
    let returnDiv = document.createElement("div");
    let otherTransactions = this.getOtherTransactions();
    if (otherTransactions.length <= 0) {
      returnDiv.innerHTML = `No other transactions.`;
      returnDiv.style.marginBottom = "0.5rem";
      return returnDiv;
    }
    
    
    let headerDiv = document.createElement("div");
    
    headerDiv.className = "transaction transactionHeader otherTransaction";
    headerDiv.appendChild(wrapSpan("From Acct"));
    headerDiv.appendChild(wrapSpan("To Acct"));
    headerDiv.appendChild(wrapSpan("Amount"));
    headerDiv.appendChild(wrapSpan("Description"));
    headerDiv.appendChild(wrapSpan("Date"));
    returnDiv.appendChild(headerDiv);

    for (const transaction of otherTransactions) {
      let transactionDiv = document.createElement("div");
      transactionDiv.className = "transaction otherTransaction";
      transactionDiv.appendChild(wrapSpan(transaction.fromAccount));
      transactionDiv.appendChild(wrapSpan(transaction.toAccount));
      transactionDiv.appendChild(wrapSpan(transaction.amount));
      transactionDiv.appendChild(wrapSpan(transaction.description));
      transactionDiv.appendChild(wrapSpan(transaction.doneAt));
      
      returnDiv.appendChild(transactionDiv);
    }
    console.log("other success");
    return returnDiv;
  }


}

class Item {
  constructor(name) {
    this.name = name;
    this.transactions = [];
    this.totalCost = 0;
  }

  add(transaction) {
    this.transactions.push(transaction);
    this.totalCost += transaction.amount;
  }
}

let transactions = []; // All Transaction objects go here
let initiatorsByID = {}; // To support quick lookups
let itemsByName = {};
let transactionsByType = {
  arsenal: [],
  check: [],
  deposit: [],
  invoice: [],
  payment: [],
  salary: [],
  transferIn: [],
  transferOut: [],
  withdraw: [],
  other: [],
};

function arsenalReset() {
  transactions = [];
  initiatorsByID = {};
  itemsByName = {};
  transactionsByType = {
    arsenal: [],
    check: [],
    deposit: [],
    invoice: [],
    payment: [],
    salary: [],
    transferIn: [],
    transferOut: [],
    withdraw: [],
    other: [],
  };
}

function arsenalProcessSelection() {
  const selectedItem = document.getElementById("arsenalItemSelector").value || "";
  const arsenalChartType = document.getElementById("arsenalChartType")?.value || "bar";
  window.arsenalFilteredData = window.extractedData
    .map((row) => uploadAnalyzeRow(row, selectedItem))
    .filter(Boolean);
  renderExtractedData(window.arsenalFilteredData);
  renderPurchaseChart(window.arsenalFilteredData, arsenalChartType);
}
