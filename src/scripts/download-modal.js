const downloadButtons = document.querySelectorAll(".download-btn");
const modal = document.getElementById("download-modal");
const confirmButton = document.getElementById("confirm-download");
const cancelButton = document.getElementById("cancel-download");
let currentDownloadLink = "";

downloadButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    currentDownloadLink = button.getAttribute("data-download-link");
    modal.classList.add("active");
    confirmButton.focus(); // Accessibility: Focus on confirm button
  });
});

confirmButton.addEventListener("click", () => {
  window.location.href = currentDownloadLink;
  modal.classList.remove("active");
});

cancelButton.addEventListener("click", () => {
  modal.classList.remove("active");
});

// Accessibility: Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    modal.classList.remove("active");
  }
});

// Accessibility: Trap focus within modal
modal.addEventListener("keydown", (e) => {
  const focusableElements = modal.querySelectorAll("button");
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (e.key === "Tab") {
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
});
