function uploadProcessCSV(file) {
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      
      // validate that it's a SAMS csv file
      const requiredCols = [
        "iban",
        "action",
        "doneBy",
        "fromAccount",
        "toAccount",
        "amount",
        "description",
        "doneAt",
      ];
      const actualCols = results.meta.fields || [];
      const missing = requiredCols.filter((col) => !actualCols.includes(col));
      if (missing.length > 0) {
        alert("Missing required column(s): " + missing.join(", "));
        return;
      }

      // extract rows and alert if there'snone
      const data = results.data;
      if (!Array.isArray(data) || data.length === 0) {
        alert("CSV contains no data rows.");
        return;
      }

      // for reporting the time range
      const firstDoneAt = data[0].doneAt;
      const lastDoneAt = data[data.length - 1].doneAt;
      
      window.firstDoneAt = firstDoneAt;
      window.lastDoneAt = lastDoneAt;

      window.extractedData = data;
      localStorage.setItem("extractedData", JSON.stringify(data));

      uploadCheckDataReady(results);
    },
    error: function (error) {
      console.error("PapaParse error >", error);
      alert("An error occurred while parsing the CSV file.");
    },
  });
}

function uploadParseRow(row) {
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
      if (row.description.includes("Check payment by")) {
        transaction = new CheckTransaction(row);
        transactionsByType.check.push(transaction);
        break;
      }

      transaction = new Transaction(row);
      transactionsByType.payment.push(transaction);
      break;
    case "transferin":
      if (row.description.includes("Payment to the San Andreas Medical Services charging")) {
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
  } else {
    initiator = initiatorsByID[initiatorID];
    initiator.addTransaction(transaction);
  }

  // handle item

  if (row.doneBy === "Arsenal Purchase") {
    let itemName = transaction.itemName;
    if (!itemsByName[itemName]) {
      item = new Item(itemName);
      item.add(transaction);
      itemsByName[itemName] = item;
    } else {
      item = itemsByName[itemName];
      item.add(transaction);
    }
  }
}

function uploadProcessExtractedData() {
  // populate the initiator.transaction arrays and all their variants here.
  for (const row of window.extractedData) {
    uploadParseRow(row);
  }
}

function uploadAnalyzeRow(row, selectedItem) {
  const description = row.description || "";
  const doneAt = row.doneAt || "";

  const regex = new RegExp(`(\\d+)x\\s*${selectedItem}\\s+by\\s+(.+?)\\((\\d+)\\)`, "i");
  const match = description.match(regex);
  if (match) {
    return {
      quantity: parseInt(match[1], 10),
      item: selectedItem,
      buyerName: match[2].trim(),
      date: doneAt,
    };
  }

  return null;
}


