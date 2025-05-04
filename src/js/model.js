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
