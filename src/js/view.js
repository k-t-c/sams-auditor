let chartInstance = null;

function renderExtractedData(data) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';

  if (data.length === 0) {
    outputDiv.textContent = 'No matching purchases found.';
    return;
  }

  const table = document.createElement('table');
  const headerRow = document.createElement('tr');

  ['Buyer', 'Item', 'Quantity', 'Date'].forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  table.appendChild(headerRow);

  data.forEach(entry => {
    const tr = document.createElement('tr');
    [entry.buyerName, entry.item, entry.quantity, entry.date].forEach(text => {
      const td = document.createElement('td');
      td.textContent = text;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  outputDiv.appendChild(table);
}

function renderPurchaseChart(data) {
  const purchasesByPerson = {};

  data.forEach(({ buyerName, date, quantity }) => {
    if (!purchasesByPerson[buyerName]) purchasesByPerson[buyerName] = {};
    if (!purchasesByPerson[buyerName][date]) purchasesByPerson[buyerName][date] = 0;
    purchasesByPerson[buyerName][date] += quantity;
  });

  const allDatesSet = new Set();
  Object.values(purchasesByPerson).forEach(dates => {
    Object.keys(dates).forEach(d => allDatesSet.add(d));
  });

  const sortedDates = Array.from(allDatesSet).sort();

  const datasets = Object.entries(purchasesByPerson).map(([buyer, dateMap]) => {
    let total = 0;
    const dataPoints = sortedDates.map(date => {
      total += (dateMap[date] || 0);
      return total;
    });

    return {
      label: buyer,
      data: dataPoints,
      fill: false,
      borderWidth: 2
    };
  });

  const ctx = document.getElementById('purchaseChart').getContext('2d');

  // Clear previous chart if exists
  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: sortedDates,
      datasets: datasets
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Cumulative Purchases Over Time'
        }
      }
    }
  });
}
