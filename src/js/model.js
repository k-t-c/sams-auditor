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


function analyzeRow(row, selectedItem) {
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