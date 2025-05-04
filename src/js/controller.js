const ITEM_TYPES = [
  'Medical Kit',
  'Bandage',
  'Blood Kit',
  'Fire Extinguisher',
  'Generic Drug A',
  'Generic Drug B',
  'Generic Drug C',
  'Generic Drug D',
  'Cleaning Kit',
  'Repair',
  'Saliva Swab',
  'Wheelchair',
];

function populateItemDropdown() {
  const select = document.createElement('select');
  select.id = 'itemSelector';

  ITEM_TYPES.forEach(item => {
    const option = document.createElement('option');
    option.value = item;
    option.textContent = item;
    select.appendChild(option);
  });

  document.body.insertBefore(select, document.getElementById('csvUpload').nextSibling);
}

function processCSV(file, selectedItem) {
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      const parsedData = results.data;
      const extractedData = parsedData.map(row => analyzeRow(row, selectedItem)).filter(Boolean);

      localStorage.setItem('extractedData', JSON.stringify(extractedData));

      renderExtractedData(extractedData);
      renderPurchaseChart(extractedData);
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
});

window.addEventListener('DOMContentLoaded', populateItemDropdown);
