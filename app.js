const vendorSelect = document.getElementById("vendor-select");
const startButton = document.getElementById("start-assessment");

startButton.addEventListener("click", function () {
  const selectedVendor = vendorSelect.value;

  if (!selectedVendor) {
    alert("Please select a vendor before starting the assessment.");
    return;
  }

  window.location.href = "assessment.html?vendor=" + selectedVendor;
});
