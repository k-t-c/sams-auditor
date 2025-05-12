let chartInstance = null;

function renderExtractedData(data) {
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "";

  if (data.length === 0) {
    outputDiv.textContent = "No matching purchases found.";
    return;
  }

  const table = document.createElement("table");
  const headerRow = document.createElement("tr");

  ["Buyer", "Item", "Quantity", "Date"].forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  table.appendChild(headerRow);

  data.forEach((entry) => {
    const tr = document.createElement("tr");
    [entry.buyerName, entry.item, entry.quantity, entry.date].forEach((text) => {
      const td = document.createElement("td");
      td.textContent = text;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  outputDiv.appendChild(table);
}

function renderPurchaseChart(data, chartType = "line") {
  const ctx = document.getElementById("purchaseChart").getContext("2d");
  if (chartInstance) {
    chartInstance.destroy();
  }

  if (chartType === "bar") {
    // 📊 Accumulate total purchases per buyer
    const totalsByBuyer = {};

    data.forEach(({ buyerName, quantity }) => {
      if (!totalsByBuyer[buyerName]) totalsByBuyer[buyerName] = 0;
      totalsByBuyer[buyerName] += quantity;
    });

    const labels = Object.keys(totalsByBuyer);
    const quantities = Object.values(totalsByBuyer);

    chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Total Quantity Purchased",
            data: quantities,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Total Purchases by Initiator",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Quantity Purchased",
            },
          },
          x: {
            title: {
              display: true,
              text: "Initiator",
            },
          },
        },
      },
    });
  } else {
    // 📈 Fallback to cumulative line chart
    const purchasesByPerson = {};

    data.forEach(({ buyerName, date, quantity }) => {
      if (!purchasesByPerson[buyerName]) purchasesByPerson[buyerName] = {};
      if (!purchasesByPerson[buyerName][date]) purchasesByPerson[buyerName][date] = 0;
      purchasesByPerson[buyerName][date] += quantity;
    });

    const allDatesSet = new Set();
    Object.values(purchasesByPerson).forEach((dates) => {
      Object.keys(dates).forEach((d) => allDatesSet.add(d));
    });

    const sortedDates = Array.from(allDatesSet).sort();

    const datasets = Object.entries(purchasesByPerson).map(([buyer, dateMap]) => {
      let total = 0;
      const dataPoints = sortedDates.map((date) => {
        total += dateMap[date] || 0;
        return total;
      });

      return {
        label: buyer,
        data: dataPoints,
        fill: false,
        borderWidth: 2,
      };
    });

    chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: sortedDates,
        datasets: datasets,
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Cumulative Purchases Over Time",
          },
        },
      },
    });
  }
}
