// OpenWeatherMap API Configuration
const apiKey = "d07981466ee03629ca93efe9891f3378"; 
const lat = "41.0896"; // Syracuse, Utah Latitude
const lon = "-112.0647"; // Syracuse, Utah Longitude
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

// Function to fetch current weather
async function getWeather() {
    try {
        const response = await fetch(currentWeatherUrl);
        if (!response.ok) throw new Error("Error fetching weather data");

        const data = await response.json();

        // Extracting current weather information
        const temperature = Math.round(data.main.temp); // rounded
        const weatherDescription = data.weather[0].description;
        const weatherIcon = data.weather[0].icon;

        // Updating the HTML
        document.getElementById("current-weather").innerHTML = `
            <p><strong>Now</strong></p>
            <p>${temperature}°F - ${weatherDescription}</p>
            <img src="https://openweathermap.org/img/wn/${weatherIcon}@4x.png" alt="Weather icon">
        `;
    } catch (error) {
        console.error("Error retrieving current weather data:", error);
    }
}

// Function to fetch 3-day weather forecast
async function getForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) throw new Error("Error fetching weather forecast");

        const data = await response.json();
        const forecastContainer = document.getElementById("weather-forecast");


        // variable Map to store 3 upcoming days
        const forecastDays = new Map();
        
        for (let i = 0; i < data.list.length; i++) {
            const dayData = data.list[i];
            const date = new Date(dayData.dt * 1000).toLocaleDateString("en-US", { weekday: "long" });

            if (!forecastDays.has(date)) {
                forecastDays.set(date, {
                    temp: Math.round(dayData.main.temp), // Now displayed without decimals
                    icon: dayData.weather[0].icon,
                    description: dayData.weather[0].description
                });
            }

            if (forecastDays.size === 3) break; // Stops once we have 3 distinct days
        }

        // Adding the 3 selected days to the HTML
        forecastDays.forEach((value, key) => {
            forecastContainer.innerHTML += `
                <div class="forecast-item">
                    <p><strong>${key}</strong></p>
                    <img src="https://openweathermap.org/img/wn/${value.icon}@2x.png" alt="Weather icon">
                    <p>${value.temp}°F - ${value.description}</p>
                </div>
            `;
        });

    } catch (error) {
        console.error("Error retrieving weather forecast:", error);
    }
}

// Run functions when the page loads
document.addEventListener("DOMContentLoaded", () => {
    getWeather();
    getForecast();
});
