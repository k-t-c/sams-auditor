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
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
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
