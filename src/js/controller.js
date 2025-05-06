const ITEM_TYPES = [
  'Medical Kit',
  'Bandage',
  'Airbag Set',
  'Binder',
  'Blood Kit',
  'Car Battery',
  'Cash Envelope',
  'Catalytic Converter',
  'Checkbook',
  'Cleaning Kit',
  'Duffel Bag',
  'EMS Cap',
  'Evidence Box',
  'Fingerprint Kit',
  'Fire Extinguisher',
  'Flare',
  'Flashlight',
  'Knife',
  'Gas Can',
  'GPS Watch',
  'Gov Repair Kit',
  'Gov Tyre Mobility Kit',
  'Generic Drug A',
  'Generic Drug B',
  'Generic Drug C',
  'Generic Drug D',
  'MDT',
  'Motorcycle Battery',
  'Pack of Cigarettes',
  'Pack of Cigars',
  'Paper',
  'Prepaid Fuel Card',
  'Radio',
  'Radio Earpiece',
  'Repair',
  'SAMS Belt',
  'SAMS Boots',
  'SAMS Holster',
  'SAMS Pants',
  'SAMS Scrub Pants',
  'SAMS Scrub Top',
  'SAMS Skirt',
  'Sample Kit',
  'Saliva Swab',
  'Seatbelt Set',
  'Stethoscope',
  'TecMed Vest',
  'TacMed T-Shirt',
  'TacMed First Responder Jacket',
  'TacMed Pants',
  'TacMed Cargo Pants',
  'TacMed Balaclava',
  'TacMed Gaiter',
  'TecMed Headset',
  'Tactical Flashlight',
  'Traffic Cone',
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
