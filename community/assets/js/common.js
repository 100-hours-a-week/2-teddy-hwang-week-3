export function showHelperText(helper, message) {
  helper.textContent = message;
  helper.style.display = "block";
}

export function hideHelperText(helper) {
  helper.textContent = "";
  helper.style.display = "none";
}

export function formatNumber(num) {
  if (num >= 100000) return (num / 1000).toFixed(0) + "k";
  if (num >= 10000) return (num / 1000).toFixed(0) + "k";
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num;
}
