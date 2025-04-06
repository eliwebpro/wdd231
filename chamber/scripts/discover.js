// discover.js

document.addEventListener("DOMContentLoaded", () => {
    fetch("data/discover.json")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch JSON");
        return response.json();
      })
      .then((data) => {
        const container = document.createElement("section");
        container.className = "discover-grid";
  
        data.forEach((item) => {
          const card = document.createElement("div");
          card.className = "discover-card";
  
          const title = document.createElement("h2");
          title.textContent = item.title;
  
          const figure = document.createElement("figure");
          const img = document.createElement("img");
          img.src = item.image;
          img.alt = item.title;
          img.loading = "lazy";
          figure.appendChild(img);
  
          const address = document.createElement("address");
          address.textContent = item.address;
  
          const description = document.createElement("p");
          description.textContent = item.description;
  
          const button = document.createElement("a");
          button.textContent = "Learn More";
          button.href = item.url || "#"; 
          button.target = "_blank"; 
          button.rel = "noopener noreferrer";
          button.className = "learn-more-btn";
  
          card.append(title, figure, address, description, button);
          container.appendChild(card);
        });
  
        document.querySelector("main").appendChild(container);
      })
      .catch((error) => {
        console.error("Error loading discover content:", error);
      });
  });
  
  

const aside = document.getElementById("visitor-message");
const lastVisit = localStorage.getItem("lastVisit");
const currentTime = Date.now();

    if (!lastVisit) {
    aside.textContent = "Welcome! Let us know if you have any questions.";
    } else {
    const diffTime = currentTime - Number(lastVisit);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 1) {
        aside.textContent = "Back so soon! Awesome!";
    } else if (diffDays === 1) {
        aside.textContent = "You last visited 1 day ago.";
    } else {
        aside.textContent = `You last visited ${diffDays} days ago.`;
    }
    }

localStorage.setItem("lastVisit", currentTime);
