// last modified time for footer
document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = `Last Modified: ${document.lastModified}`;

// Mobile menu toggle
const menuButton = document.querySelector('#menuButton');
const mainNav = document.querySelector('#mainNav');

if (menuButton && mainNav) {
    menuButton.addEventListener("click", () => {
        mainNav.classList.toggle("open");
    });
}

// select HTML elements in the document for weather
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const futureContainer = document.querySelector('#future-days');

// Springfield Oregon coordinates and API setup
const lat = '44.05';
const lon = '-123.03';
const units = 'imperial';
const apiKey = '3c1f4ca0ce7f6c8c4ef28090b33c211d';
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
const futureWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

// Get today's weather
async function getTodayWeather() {
    try {
        const response = await fetch(currentWeatherUrl);
        if (response.ok) {
            const data = await response.json();
            showWeather(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error("Weather error:", error);
    }
}

function showWeather(data) {
    currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;F`;

    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const description = data.weather[0].description;

    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', description);
    weatherIcon.classList.remove('hidden-icon');
}

// Get 3 days weather
async function getFutureWeather() {
    try {
        const response = await fetch(futureWeatherUrl);
        if (response.ok) {
            const data = await response.json();
            showFutureWeather(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error("Weather error:", error);
    }
}

function showFutureWeather(data) {
    futureContainer.innerHTML = data.list
        .filter(item => item.dt_txt.includes("15:00:00"))
        .slice(0, 3)
        .map(item => {
            const dayName = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
            return `<p>${dayName}: ${Math.round(item.main.temp)}&deg;F</p>`;
        })
        .join("");
}

// select HTML elements in the document for Spotlight
const jsonPath = "data/members.json";
const spotlightInformation = document.querySelector('#spotlight');

async function getMemberSpotlights() {
    try {
        const response = await fetch(jsonPath);
        if (response.ok) {
            const data = await response.json();
            showSpotlights(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error("Spotlight error:", error);
    }
}

function showSpotlights(members) {
    const filteredMembers = members.filter(
        (member) => member.membershipLevel === 2 || member.membershipLevel === 3
    );

    const randomMembers = filteredMembers.sort(() => 0.5 - Math.random());
    const selectedMembers = randomMembers.slice(0, 2);

    spotlightInformation.innerHTML = '';

    selectedMembers.forEach(member => {
        const card = document.createElement('section');
        const name = document.createElement('h3');
        const logo = document.createElement('img');
        const phone = document.createElement('p');
        const address = document.createElement('p');
        const website = document.createElement('p');
        const level = document.createElement('p');


        card.classList.add('spot');

        name.textContent = member.name;
        logo.src = `images/${member.image}`;
        logo.alt = `${member.name} logo`;
        logo.loading = 'lazy';

        phone.innerHTML = `<strong>Phone:</strong> ${member.phoneNumber}`;
        address.innerHTML = `<strong>Address:</strong> ${member.address}`;
        website.innerHTML = `<strong>Website:</strong> <a href="${member.websiteUrl}" target="_blank">${member.websiteUrl}</a>`;

        if (member.membershipLevel == 2) {
            level.textContent = "Silver Member";
        } else if (member.membershipLevel == 3) {
            level.textContent = "Gold Member";
        }

        card.appendChild(name);
        card.appendChild(level);
        card.appendChild(logo);
        card.appendChild(phone);
        card.appendChild(address);
        card.appendChild(website);

        spotlightInformation.appendChild(card);
    });
}


getTodayWeather();
getFutureWeather();
getMemberSpotlights();

