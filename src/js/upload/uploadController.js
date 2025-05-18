function uploadProcessCSV(file, selectedItem) {
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
  
    const selectedItem = document.getElementById('arsenalItemSelector').value;
    uploadProcessCSV(file, selectedItem);
  
    // reattach onchange listener to dropdown in case user wants to refilter
    document.getElementById('arsenalItemSelector').onchange = () => { 
      arsenalProcessSelection();
    };
    document.getElementById("arsenalChartType").addEventListener ("change", function(e) {
      arsenalProcessSelection();
    });
  });