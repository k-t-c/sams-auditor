function analyzeRow(row) {
  const description = row.description || '';
  const doneAt = row.doneAt || '';

  const medkitRegex = /(\d+)x\s*Medical Kit\s+by\s+(.+?)\((\d+)\)/i;
  const match = description.match(medkitRegex);

  if (match) {
    return {
      quantity: parseInt(match[1], 10),
      item: 'Medical Kit',
      buyerName: match[2].trim(),
      date: doneAt
    };
  }

  return null;
}
