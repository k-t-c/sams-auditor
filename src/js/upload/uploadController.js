function uploadCheckDataReady(results) {
  if (window.extractedData && window.extractedData.length === results.data.length) {
    uploadDataReady();
  }
  else {
    setTimeout(uploadCheckDataReady, 100, results);
  }
}

function uploadDataReady() {
  uploadNoticeMsg(
    `
      <p>Data Uploaded! Select a tab to continue.</p>
      <p>Arsenal Purchases: Detailed arsenal purchases by item</p>
      <p>Report:  View a report of detected arsenal purchase violations</p>
      <p>Item Limits: Set custom limits on item purchases</p>
      <p>People: View reports on individuals.</p>
    `
  );
  arsenalDataReady();
  limitsDataReady();
  
  uploadProcessExtractedData();
  itemsCheckForMissingItemDefinitions();
  arsenalProcessSelection();
  reportViolations();
  
  peopleDataReady();
  
  showMessage("CSV file processed");
  enableTabs();
}

document.getElementById("csvUpload").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;
  arsenalReset();
  uploadNoticeMsg("<p>Processing...</p>")

  uploadProcessCSV(file);
});