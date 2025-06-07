const APP_VERSION = "1.0";

function isInt(value) {
  const x = parseFloat(value);
  return !isNaN(value) && Number.isSafeInteger(x);
}

function showMessage(msg = "") {
  if (msg && typeof msg === "string") {
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
  } else {
    handleError();
  }
}

function handleError (error = null, msg = "An error has occurred. See console for details.") {
  console.error(error);
  showMessage(msg);
}

// tabs stuff
function enableTabs () {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.classList.remove("disabled");
    button.addEventListener("click", () => {
      const target = button.dataset.tab;

      tabButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      tabContents.forEach((content) => {
        content.classList.toggle("active", content.id === target);
      });
    });
  });
}

itemsCheckForNewItemDefinitions();