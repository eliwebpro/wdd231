document.addEventListener("DOMContentLoaded", () => {
    // Get URL parameters
    const params = new URLSearchParams(window.location.search);
    
    // Retrieve form values
    const firstName = params.get("name") || "N/A";
    const lastName = params.get("lname") || "N/A";
    const email = params.get("email") || "N/A";
    const phone = params.get("phone") || "N/A";
    const business = params.get("business") || "N/A";
    const timestamp = params.get("timestamp") || "N/A";

    // Display in HTML
    document.getElementById("user-name").textContent = firstName;
    document.getElementById("first-name").textContent = firstName;
    document.getElementById("last-name").textContent = lastName;
    document.getElementById("email").textContent = email;
    document.getElementById("phone").textContent = phone;
    document.getElementById("business-name").textContent = business;
    document.getElementById("timestamp").textContent = new Date(timestamp).toLocaleString();
});
