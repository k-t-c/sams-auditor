function populateItemDropdown() {
  const arsenalView = document.getElementById("arsenalView");
  if (!arsenalView) return;

  // Remove old selector if it exists
  const oldSelector = document.getElementById("itemSelector");
  if (oldSelector) {
      oldSelector.remove();
  }

  const selector = document.createElement("select");
  selector.id = "itemSelector";

  for (const item of ITEM_TYPES) {
      const option = document.createElement("option");
      option.value = item;
      option.textContent = item;
      selector.appendChild(option);
  }

  // Insert at the top of the arsenal view
  arsenalView.insertBefore(selector, arsenalView.firstChild);
}


function processCSV(file, selectedItem) {
  let chartType = document.getElementById("chartType").value || "bar";
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      const parsedData = results.data;
      window.extractedData = parsedData.map(row => analyzeRow(row, selectedItem)).filter(Boolean);

      localStorage.setItem('extractedData', JSON.stringify(extractedData));

      renderExtractedData(window.extractedData);
      renderPurchaseChart(window.extractedData, chartType);
    }
  });
}

document.getElementById('csvUpload').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const selectedItem = document.getElementById('itemSelector').value;
  processCSV(file, selectedItem);

  // Reattach onchange listener to dropdown in case user wants to re-filter
  document.getElementById('itemSelector').onchange = () => {
    processCSV(file, document.getElementById('itemSelector').value);
  };
  document.getElementById("chartType").addEventListener ("change", function(e) {
    const chartType = document.getElementById("chartType")?.value || "bar";
    renderPurchaseChart(window.extractedData, chartType);
  });
});

window.addEventListener('DOMContentLoaded', populateItemDropdown);

document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach(button => {
      button.addEventListener("click", () => {
          const target = button.dataset.tab;

          tabButtons.forEach(btn => btn.classList.remove("active"));
          button.classList.add("active");

          tabContents.forEach(content => {
              content.classList.toggle("active", content.id === target);
          });
      });
  });
});