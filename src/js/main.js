const APP_VERSION = 0;
// upload component stuff
document.getElementById("csvUpload").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;
  const noticeDiv = document.getElementById("uploadViewNotice");
  if (noticeDiv) {
    noticeDiv.innerHTML = "<p>Processing...</p>";
  }

  uploadProcessCSV(file);

  // reattach onchange listener to dropdown in case user wants to refilter
  document.getElementById("arsenalItemSelector").onchange = () => {
    arsenalProcessSelection();
  };
  document.getElementById("arsenalChartType").addEventListener("change", function (e) {
    arsenalProcessSelection();
  });
});

// arsenal component stuff
window.addEventListener("DOMContentLoaded", arsenalPopulateItemDropdown);

// tabs stuff
document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;

      tabButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      tabContents.forEach((content) => {
        content.classList.toggle("active", content.id === target);
      });
    });
  });
});
