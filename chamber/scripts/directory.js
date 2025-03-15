document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

const url = "data/members.json"; // Ajustado para caminho correto
const businessContainer = document.getElementById("businessContainer");
let businesses = [];

async function getBusinesses() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        businesses = data.members;
        displayBusinesses("grid"); // Inicializa como grid
    } catch (error) {
        console.error("Error loading business data:", error);
    }
}

function displayBusinesses(view) {
    // Force grid view on small screens
    if (window.innerWidth <= 763) {
        view = "grid"; // Ignora a escolha do usuário para telas pequenas
    }

    businessContainer.innerHTML = "";
    businessContainer.className = view;

    businesses.forEach(business => {
        const card = document.createElement("div");
        card.classList.add("business-card", view);

        if (view === "grid") {
            const img = document.createElement("img");
            img.src = `images/${business.image}`;
            img.alt = `${business.name} logo`;
            img.loading = "lazy";
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

    document.getElementById("gridView").classList.toggle("active", view === "grid");
    document.getElementById("listView").classList.toggle("active", view === "list");
}

// Toggle button event listeners
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("gridView").addEventListener("click", () => displayBusinesses("grid"));
    document.getElementById("listView").addEventListener("click", () => displayBusinesses("list"));

    getBusinesses();
});

// Force grid view when resizing to small screens
window.addEventListener("resize", () => {
    if (window.innerWidth <= 763) {
        displayBusinesses("grid");
    }
});

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("show");
    menuBtn.classList.toggle("open");
});

// Weather API Config
const apiKey = "48f8472cc4e8fc9654e4c091ac2ea830"; // API Key do OpenWeatherMap
const lat = "41.0896"; // Latitude de Syracuse, Utah
const lon = "-112.0647"; // Longitude de Syracuse, Utah
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

// Função para pegar o clima atual
async function getWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) throw new Error("Error fetching weather data");

        const data = await response.json();

        // Pegando informações do clima atual
        const temperature = data.main.temp.toFixed(1); // Fahrenheit
        const weatherDescription = data.weather[0].description;
        const weatherIcon = data.weather[0].icon;

        // Atualizando no HTML
        document.getElementById("weather").innerHTML = `
            <p>${temperature}°F - ${weatherDescription}</p>
            <img src="https://openweathermap.org/img/wn/${weatherIcon}@4x.png" alt="Weather icon">
        `;
    } catch (error) {
        console.error("Error getting weather data:", error);
    }
}

// Função para pegar a previsão dos próximos 3 dias
async function getForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) throw new Error("Error fetching forecast data");

        const data = await response.json();
        const forecastList = data.list;

        // Filtra a previsão para pegar um horário fixo por dia (ex: meio-dia)
        const dailyForecasts = forecastList.filter(item => item.dt_txt.includes("12:00:00"));

        // Pegando apenas os próximos 3 dias
        const nextThreeDays = dailyForecasts.slice(0, 3);

        // Atualizando no HTML
        const forecastContainer = document.getElementById("forecast");
        forecastContainer.innerHTML = "<h3>Next 3 Days Forecast</h3>";

        nextThreeDays.forEach(day => {
            const date = new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
            const temp = day.main.temp.toFixed(1);
            const desc = day.weather[0].description;
            const icon = day.weather[0].icon;

            forecastContainer.innerHTML += `
                <div class="forecast-item">
                    <p><strong>${date}</strong></p>
                    <img src="https://openweathermap.org/img/wn/${icon}@4x.png" alt="Weather icon">
                    <p>${temp}°F - ${desc}</p>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error getting forecast data:", error);
    }
}

// Chama as funções ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    getWeather();
    getForecast();
});
