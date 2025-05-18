function uploadProcessCSV(file) {
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

  function uploadDataReady() {
  const noticeDiv = document.getElementById("uploadViewNotice");
  if (noticeDiv) {
    noticeDiv.innerHTML = `
      <p>Data Uploaded! Select a tab to continue.</p>
      <p>Report:  View a report of detected arsenal purchase violations</p>
      <p>Arsenal: Detailed arsenal purchases by item</p>
    `
  }
  arsenalProcessSelection();
  reportViolations();
}
  
  document.getElementById('csvUpload').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;
    const noticeDiv = document.getElementById("uploadViewNotice");
    if (noticeDiv) {
      noticeDiv.innerHTML = "<p>Processing...</p>"
    }
    
    uploadProcessCSV(file);
  
    // reattach onchange listener to dropdown in case user wants to refilter
    document.getElementById('arsenalItemSelector').onchange = () => { 
      arsenalProcessSelection();
    };
    document.getElementById("arsenalChartType").addEventListener ("change", function(e) {
      arsenalProcessSelection();
    });
  });