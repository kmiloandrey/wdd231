// last modified time for footer
document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = `Last Modified: ${document.lastModified}`;

// select HTML elements in the document
const menuButton = document.querySelector('#menuButton');
const mainNav = document.querySelector('#mainNav');
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const forecastContainer = document.querySelector('#forecast-days');

// Springfield, OR coordinates and API setup
const lat = '44.05';
const lon = '-123.03';
const units = 'imperial'; 
const apiKey = '3c1f4ca0ce7f6c8c4ef28090b33c211d';
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

// 1. Get today's weather
async function getTodayWeather() {
    try {
        const response = await fetch(currentWeatherUrl);
        if (!response.ok) {
            throw new Error("Could not load weather data.");
        }
        const data = await response.json();
        showWeather(data);
    } catch (error) {
        console.error("Weather error:", error);
        captionDesc.textContent = "Weather unavailable right now.";
    }
}

function showWeather(data) {
    currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;F`;

    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const description = data.weather[0].description;

    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', description);
    weatherIcon.classList.remove('hidden-icon');

    // Capitalize the first letter
    captionDesc.textContent = description.charAt(0).toUpperCase() + description.slice(1);
}

// Mobile menu toggle
if (menuButton && mainNav) {
    menuButton.addEventListener("click", () => {
        mainNav.classList.toggle("open");
    });
}


getTodayWeather();
