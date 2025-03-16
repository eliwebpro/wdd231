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
