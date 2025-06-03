function uploadCheckDataReady(results) {
  if (window.extractedData && window.extractedData.length === results.data.length) {
    uploadDataReady();
  }
  else {
    setTimeout(uploadCheckDataReady, 100, results);
  }
}

function uploadDataReady() {
  const noticeDiv = document.getElementById("uploadViewNotice");
  if (noticeDiv) {
    noticeDiv.innerHTML = `
      <p>Data Uploaded! Select a tab to continue.</p>
      <p>Arsenal: Detailed arsenal purchases by item</p>
      <p>Report:  View a report of detected arsenal purchase violations</p>
      <p>Item Limits: Set custom limits on item purchases</p>
    `
  }
  limitsDataReady();
  uploadProcessExtractedData();
  arsenalProcessSelection();
  reportViolations();
}
