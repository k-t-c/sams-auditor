function reportExportViolationsReport() {
  const grouped = reportCheckPurchaseViolationsGroupedByInitiator(
    Object.values(initiatorsByID),
    window.itemDefinitions
  );
  if (!Object.keys(grouped).length) {
    alert("No violations to export.");
    return;
  }

  const txt = reportBuildViolationsText(grouped);
  const blob = new Blob([txt], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `violations-report-${window.firstDoneAt}-${window.lastDoneAt}.txt`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}

// logging out a list of item definitions and limits in plain english
/* for (const item of Object.keys(window.itemDefinitions)) {
    if (window.itemDefinitions.hasOwnProperty(item)) {
        const an = window.itemDefinitions[item].acceptableNumbers;
        let interval = an.timeInterval && an.timeInterval || 0
        let description = "";
        if (rateTable[interval]) {
            description = rateTable[interval];
        }
        else {
            description = `${interval / 1000} seconds`;
        }
        console.log(`${item} has limit:\n  ${an.perSingleTransaction} in a single transaction\n  or ${an.perTimeInterval} per ${description}`);
    }
} */