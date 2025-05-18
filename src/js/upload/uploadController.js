function uploadProcessCSV(file, selectedItem) {
    let arsenalChartType = document.getElementById("arsenalChartType").value || "bar";
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        window.extractedData = results.data;
        localStorage.setItem('extractedData', JSON.stringify(extractedData));

        uploadCheckDataReady(results);
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
      const selectedItem = document.getElementById('itemSelector').value || "";
      const arsenalChartType = document.getElementById("arsenalChartType")?.value || "bar";
      arsenalProcessSelection(selectedItem, arsenalChartType);
    };
    document.getElementById("arsenalChartType").addEventListener ("change", function(e) {
      const selectedItem = document.getElementById('itemSelector').value || "";
      const arsenalChartType = document.getElementById("arsenalChartType")?.value || "bar";
      arsenalProcessSelection(selectedItem, arsenalChartType);
      
    });
  });