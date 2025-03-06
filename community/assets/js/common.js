export function showHelperText(helper, message) {
  helper.textContent = message;
  helper.style.display = "block";
}

export function hideHelperText(helper) {
  helper.textContent = "";
  helper.style.display = "none";
}
