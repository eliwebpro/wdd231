// Weather API Config
const apiKey = "48f8472cc4e8fc9654e4c091ac2ea830"; // API Key do OpenWeatherMap
const lat = "41.0896"; // Latitude de Syracuse, Utah
const lon = "-112.0647"; // Longitude de Syracuse, Utah
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

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


// Chama as funções ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    getWeather();
});
