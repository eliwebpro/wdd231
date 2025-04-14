document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
  
    const name = params.get("name") || "N/A";
    const subject = params.get("subject") || "N/A";
    const locationType = params.get("rating") === "1" ? "House" : "Condominium";
    const installationDate = params.get("installation-date") || "N/A";
    const additional = params.getAll("aditional").join(", ") || "None";
    const message = params.get("message") || "N/A";
    const timestamp = new Date().toLocaleString();
  
    document.getElementById("user-name").textContent = name;
    document.getElementById("name").textContent = name;
    document.getElementById("location-type").textContent = locationType;
    document.getElementById("installation-date").textContent = installationDate;
    document.getElementById("additional").textContent = additional;
    document.getElementById("subject").textContent = subject;
    document.getElementById("message").textContent = message;
    document.getElementById("timestamp").textContent = timestamp;
});  
