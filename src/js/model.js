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
    const regex = /(\d+)x(\w+)\s+by\s+(.+?)\((\d+)\)/;
    const match = row.description.match(regex);
    if (match && match.length > 4) {
      // console.log("arsenal purchase match >", match);
      this.quantity = parseInt(match[1] || 0);
      this.item = match[2] || "";
      this.initiatorName = match[3] && match[3].trim() || "";
      this.initiatorID = parseInt(match[4] || 0);
      console.log("final arsenal obj >", this);
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
      console.log("final salary obj >", this);
    } 
  }
}
class InvoiceTransaction extends Transaction {
  constructor(row) {
    super(row);
    const regex = /charging (.+?)\. (None|Silver|Gold|Platinum) Insurance\. Reference number (\d+)/;
    const match = row.description.match(regex);
    if (match) {
      console.log("invoice match >", match);
      this.insuranceLevel = match[2] || "";
      this.invoiceNumber = parseInt(match[3] || 0);
      console.log("final invoice obj >", this);
    }
  }
}

/**
 * @param item instance of item
 * @param buyer instance of buyer
 * @param raw original row
 */
class Purchase {
  constructor({ quantity, item, buyer, date, raw }) {
    this.quantity = quantity;
    this.item = item;
    this.buyer = buyer;
    this.date = new Date(date);
    this.raw = raw;
  }
}

class Buyer {
  constructor(name) {
    this.name = name;
    this.purchases = [];
  }

  add(purchase) {
    this.purchases.push(purchase);
  }

  totalQuantity() {
    return this.purchases.reduce((sum, p) => sum + p.quantity, 0);
  }
}

class Item {
  constructor(name) {
    this.name = name;
    this.purchases = [];
  }

  add(purchase) {
    this.purchases.push(purchase);
  }

  totalQuantity() {
    return this.purchases.reduce((sum, p) => sum + p.quantity, 0);
  }
}

let transactions = [];  // All Transaction objects go here
let initiatorsByID = new Map();  // To support quick lookups
let itemsByName = new Map();
let transactionsByType = {
  arsenal: [],
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
  switch (row.action) {
    case "deposit":
      transaction = new Transaction(row);
      transactionsByType.deposit.push(transaction);
      break;
      case "payment": 
        if (row.doneBy === "Arsenal Purchase") {
          transaction = new ArsenalTransaction(row);
          transactionsByType.arsenal.push(transaction);
      
         /*  const item = transaction.item;
          const buyerID = transaction.initiatorID;
      
          if (!itemsByName[item]) {
            itemsByName[item] = {
              totalBought: 0,
              totalCost: 0,
              buyers: new Map()
            };
          }
      
          itemsByName[item].totalBought += transaction.quantity;
          itemsByName[item].totalCost += transaction.amount;
      
          const buyersMap = itemsByName[item].buyers;
          if (!buyersMap.has(buyerID)) {
            buyersMap.set(buyerID, {
              totalBought: 0,
              timestamps: [],
              dates: []
            });
          }
      
          const buyerData = buyersMap.get(buyerID);
          buyerData.totalBought += transaction.quantity;
          buyerData.timestamps.push(transaction.timestamp);
          buyerData.dates.push(transaction.dateObj); */
      
          break;
        }
      
        if (row.doneBy === "State Clerk" && row.description.includes("Salary")) {
          transaction = new SalaryTransaction(row);
          transactionsByType.salary.push(transaction);
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

  if (initiatorsByID[transaction.initiatorID]) {
    initiatorsByID[transaction.initiatorID].transactions.push(transaction);
  }
  else {
    initiatorsByID[transaction.initiatorID] = {
      transactions: [transaction]
    };
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