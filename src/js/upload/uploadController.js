function uploadProcessCSV(file, selectedItem) {
    let arsenalChartType = document.getElementById("arsenalChartType").value || "bar";
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const parsedData = results.data;
        window.extractedData = parsedData.map(row => uploadAnalyzeRow(row, selectedItem)).filter(Boolean);
  
        localStorage.setItem('extractedData', JSON.stringify(extractedData));
  
        renderExtractedData(window.extractedData);
        renderPurchaseChart(window.extractedData, arsenalChartType);
      }
    });
  }
  
  document.getElementById('csvUpload').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;
  
    const selectedItem = document.getElementById('itemSelector').value;
    uploadProcessCSV(file, selectedItem);
  
    // Reattach onchange listener to dropdown in case user wants to re-filter
    document.getElementById('itemSelector').onchange = () => {
      uploadProcessCSV(file, document.getElementById('itemSelector').value);
    };
    document.getElementById("arsenalChartType").addEventListener ("change", function(e) {
      const arsenalChartType = document.getElementById("arsenalChartType")?.value || "bar";
      renderPurchaseChart(window.extractedData, arsenalChartType);
    });
  });