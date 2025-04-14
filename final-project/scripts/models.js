const container = document.getElementById("model-cards");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-details");
const closeBtn = document.querySelector(".close-button");

async function loadModels() {
  try {
    const response = await fetch("data/models.json");
    if (!response.ok) {
      throw new Error("Failed to load JSON");
    }

    const data = await response.json();

    data.models.forEach((model) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${model.model}</h3>
        <p><strong>Type:</strong> ${model.type}</p>
        <p><strong>Size:</strong> ${model.size}</p>
        <p><strong>Material:</strong> ${model.material}</p>
        <button class="learn-more">Learn More</button>
      `;

      const learnMoreBtn = card.querySelector(".learn-more");
      learnMoreBtn.addEventListener("click", () => {
        modalContent.innerHTML = `
          <h2>${model.model}</h2>
          <p><strong>Type:</strong> ${model.type}</p>
          <p><strong>Size:</strong> ${model.size}</p>
          <p><strong>Material:</strong> ${model.material}</p>
          <p><strong>Features:</strong></p>
          <ul>${model.features.map((f) => `<li>${f}</li>`).join("")}</ul>
        `;
        modal.classList.remove("hidden");
      });

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Error loading skylight models:", error);
    container.innerHTML = "<p>Failed to load skylight models.</p>";
  }
}


closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

loadModels();
