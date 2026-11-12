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

// Define the OpenWeatherMap API URL with query parameters
const lat = '44.05';
const lon = '-123.03';
const units = 'imperial'; // Use 'metric' if you prefer Celsius
const apiKey = '3c1f4ca0ce7f6c8c4ef28090b33c211d'; // API key

// Construct the URL for the OpenWeatherMap API request
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

// 1. Fetch and Display Weather Data
async function fetchWeatherData() {
    try {
        // Current Weather Fetch
        const weatherResponse = await fetch(currentWeatherUrl);
        if (weatherResponse.ok) {
            const weatherData = await weatherResponse.json();
            displayCurrentWeather(weatherData);
        } else {
            throw Error("Current weather payload unavailable.");
        }

        // Forecast Weather Fetch
        const forecastResponse = await fetch(forecastWeatherUrl);
        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);
        } else {
            throw Error("Forecast collection payload unavailable.");
        }
    } catch (error) {
        console.error("Weather Engine Error: ", error);
    }
}

function displayCurrentWeather(data) {
    currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;F`;

    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const desc = data.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    weatherIcon.classList.remove('hidden-icon');
    
    captionDesc.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
}

function displayForecast(data) {
    forecastContainer.innerHTML = "";

    // Filter to pull forecast items for the 3-day projection spread
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    dailyForecasts.forEach(day => {
        const dateObj = new Date(day.dt * 1000);
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
        const forecastHTML = `
            <div class="forecast-day">
                <span class="day-label">${dayName}</span>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="${day.weather[0].description}">
                <span class="day-temp">${Math.round(day.main.temp)}&deg;F</span>
            </div>
        `;
        forecastContainer.innerHTML += forecastHTML;
    });
}

// 2. Fetch and Randomly Display Qualified Chamber Spotlights
const membersUrl = "data/members.json";

async function loadSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) throw Error("Failed to load business member dataset.");

        const members = await response.json();

        // Filter out basic level 1 entries; keep Level 2 (Silver) and Level 3 (Gold)
        const qualifiedMembers = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);

        // Shuffle the filtered array using an inline random sort equation algorithm
        const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());

        // Select 2 items from the shuffled list
        const selectedSpotlights = shuffled.slice(0, 2);

        displaySpotlights(selectedSpotlights);
    } catch (error) {
        console.error("Spotlight System Error: ", error);
        document.getElementById("spotlight-container").innerHTML = "<p>Featured directory highlights currently unavailable.</p>";
    }
}

function displaySpotlights(selectedItems) {
    const container = document.getElementById("spotlight-container");
    container.innerHTML = "";

    selectedItems.forEach(item => {
        const tierName = item.membershipLevel === 3 ? "Gold Member" : "Silver Member";
        const tierClass = item.membershipLevel === 3 ? "gold-badge" : "silver-badge";

        const cardHTML = `
            <div class="spotlight-item">
                <div class="spotlight-header">
                    <img src="images/${item.image}" alt="${item.name} Logo" class="spotlight-logo" onerror="this.src='images/springfield.webp'">
                    <div>
                        <h3>${item.name}</h3>
                        <span class="membership-badge ${tierClass}">${tierName}</span>
                    </div>
                </div>
                <div class="spotlight-details">
                    <p>${item.address}</p>
                    <p>${item.phoneNumber}</p>
                    <a href="${item.websiteUrl}" target="_blank" rel="noopener" class="spotlight-link">Visit Corporate Site →</a>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}

// Toggle mobile menu visibility safely
if (menuButton && mainNav) {
    menuButton.addEventListener("click", () => {
        mainNav.classList.toggle("open");
    });
}

// Initialize dynamic engines on execution
fetchWeatherData();
loadSpotlights();