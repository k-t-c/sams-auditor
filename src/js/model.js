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
    const regex = /(\d+)x(.+?)\s+by\s+(.+?)\((\d+)\)/;
    const match = row.description.match(regex);
    if (match && match.length > 4) {
      // console.log("arsenal purchase match >", match);
      this.quantity = parseInt(match[1] || 0);
      this.itemName = match[2] || "";
      this.initiatorName = match[3] && match[3].trim() || "";
      this.initiatorID = parseInt(match[4] || 0);
      // console.log("final arsenal obj >", this);
    }
  }
}
class SalaryTransaction extends Transaction {
  constructor(row) {
    super(row);
   const regex = /for (.+?)\((\d+)\)/;
   const match = row.description.match(regex);
    if (match && match.length > 2) {
      // console.log("salary match >", match);
      this.initiatorName = match[1] || "";
      this.initiatorID = parseInt(match[2] || 0);
      // console.log("final salary obj >", this);
    } 
  }
}
class InvoiceTransaction extends Transaction {
  constructor(row) {
    super(row);
    const regex = /charging (.+?)\. (None|Silver|Gold|Platinum) Insurance\. Reference number (\d+)/;
    const match = row.description.match(regex);
    if (match) {
      // console.log("invoice match >", match);
      this.insuranceLevel = match[2] || "";
      this.invoiceNumber = parseInt(match[3] || 0);
      // console.log("final invoice obj >", this);
    }
  }
}

class CheckTransaction extends Transaction {
  constructor(row) {
    super(row);
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

let transactions = [];  // All Transaction objects go here
let initiatorsByID = {};  // To support quick lookups
let itemsByName = {};
let transactionsByType = {
  arsenal: [],
  check:[],
  deposit: [],
  invoice: [],
  payment: [],
  salary: [],
  transferIn: [],
  transferOut: [],
  withdraw: [],
  other: []
};

function parseRow(row) {
  let transaction;
  let item;
  let initiator;
  let initiatorName;
  let initiatorID;

  switch (row.action) {
    case "deposit":
      transaction = new Transaction(row);
      transactionsByType.deposit.push(transaction);
      break;
      case "payment": 
        if (row.doneBy === "Arsenal Purchase") {
          transaction = new ArsenalTransaction(row);
          transactionsByType.arsenal.push(transaction);
          break;
        }
        if (row.doneBy === "State Clerk" && row.description.includes("Salary")) {
          transaction = new SalaryTransaction(row);
          transactionsByType.salary.push(transaction);
          break;
        }
        if(row.description.includes("Check payment by")) {
          transaction = new CheckTransaction(row);
          transactionsByType.check.push(transaction);
          break;
        }
      
        transaction = new Transaction(row);
        transactionsByType.payment.push(transaction);
        break;
    case "transferin":
      if(row.description.includes("Payment to the San Andreas Medical Services charging")) {
        transaction = new InvoiceTransaction(row);
        transactionsByType.invoice.push(transaction);
        break;
      }
      transaction = new Transaction(row);
      transactionsByType.transferIn.push(transaction);
      break;
    case "transferout":
      transaction = new Transaction(row);
      transactionsByType.transferOut.push(transaction);
    case "withdraw":
      transaction = new Transaction(row);
      transactionsByType.withdraw.push(transaction);
      break;
    default:
      transaction = new Transaction(row);
      transactionsByType.other.push(transaction);
      break;
  }
  
  transactions.push(transaction);

  // handle person
  
  initiatorName = transaction.initiatorName;
  initiatorID = transaction.initiatorID;
  if (!initiatorsByID[initiatorID]) {
    initiator = new Initiator(initiatorName, initiatorID);
    initiator.addTransaction(transaction);
    initiatorsByID[initiatorID] = initiator;
  }
  else {
    initiator = initiatorsByID[initiatorID];
    initiator.addTransaction(transaction);
  }

  // handle item
  if (row.doneBy === "Arsenal Purchase") {
    let itemName = transaction.itemName;
    if(!itemsByName[itemName]) {
      item = new Item(itemName);
      item.add(transaction);
      itemsByName[itemName] = item;
    }
    else {
      item = itemsByName[itemName];
      item.add(transaction);
    }
  }

}

function analyzeRow(row, selectedItem) {
  parseRow(row);
  const description = row.description || '';
  const doneAt = row.doneAt || '';

  const regex = new RegExp(`(\\d+)x\\s*${selectedItem}\\s+by\\s+(.+?)\\((\\d+)\\)`, 'i');
  const match = description.match(regex);
  if (match) {
    return {
      quantity: parseInt(match[1], 10),
      item: selectedItem,
      buyerName: match[2].trim(),
      date: doneAt
    };
  }

  return null;
}