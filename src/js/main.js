const APP_VERSION = 0;

function showMessage(msg) {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");

  toast.innerText = msg;
  toast.style.background = "rgba(0, 0, 0, 0.8)";
  toast.style.color = "#fff";
  toast.style.padding = "0.5em 1em";
  toast.style.margin = "1em";
  toast.style.borderRadius = "4px";
  toast.style.fontSize = "0.9rem";
  toast.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
  toast.style.opacity = "1";
  toast.style.transition = "opacity 0.4s ease-out";

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => {
      container.removeChild(toast);
    }, 400);
  }, 2000);
}

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
