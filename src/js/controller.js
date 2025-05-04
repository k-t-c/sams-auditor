document.getElementById('csvUpload').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      const parsedData = results.data;
      const extractedData = parsedData.map(row => analyzeRow(row)).filter(Boolean);

      localStorage.setItem('extractedData', JSON.stringify(extractedData));

      renderExtractedData(extractedData);
      renderPurchaseChart(extractedData);
    }
  });
});
