document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

const url = "../data/members.json";
const businessContainer = document.getElementById("businessContainer");
let businesses = [];

// ✅ Função para buscar os dados dos membros e exibir os cartões
async function getBusinesses() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        businesses = data.members;
        displayBusinesses("grid"); // Default para exibição em grade
    } catch (error) {
        console.error("Error loading business data:", error);
    }
}

// ✅ Exibir os membros em Grid ou Lista
function displayBusinesses(view) {
    businessContainer.innerHTML = "";
    businessContainer.className = view;

            businesses.forEach(business => {
                const card = document.createElement("div");
                card.classList.add("business-card", view);

                const img = document.createElement("img");
                img.src = `../images/${business.image}`;
                img.alt = `${business.name} logo`;
                img.loading = "lazy";

                if (view === "grid") {
                    const img = document.createElement("img");
                    img.src = `../images/${business.image}`;
                    img.alt = `${business.name} logo`;
                    card.appendChild(img);
                }

                const name = document.createElement("h3");
                name.textContent = business.name;

                const address = document.createElement("p");
                address.textContent = business.address;

                const phone = document.createElement("p");
                phone.textContent = business.phone;

                const website = document.createElement("a");
                website.href = business.website;
                website.target = "_blank";
                website.textContent = business.website;

                card.appendChild(name);
                card.appendChild(address);
                card.appendChild(phone);
                card.appendChild(website);

                businessContainer.appendChild(card);
            });

    // ✅ Atualiza o botão ativo
    document.getElementById("gridView").classList.toggle("active", view === "grid");
    document.getElementById("listView").classList.toggle("active", view === "list");
}

// ✅ Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("gridView").addEventListener("click", () => displayBusinesses("grid"));
    document.getElementById("listView").addEventListener("click", () => displayBusinesses("list"));

    getBusinesses();
});

// ✅ Função do Menu Hamburguer
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("show");
    menuBtn.classList.toggle("open");
});
