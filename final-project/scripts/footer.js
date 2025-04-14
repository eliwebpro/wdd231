// footer.js
export function updateFooter() {
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent += document.lastModified;
  });
}
