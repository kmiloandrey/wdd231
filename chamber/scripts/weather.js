// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// Define the OpenWeatherMap API URL with query parameters
const lat = '44.05';
const lon = '-123.03';
const units = 'imperial'; // Use 'metric' if you prefer Celsius
const apiKey = '3c1f4ca0ce7f6c8c4ef28090b33c211d'; // API key

// Construct the URL for the OpenWeatherMap API request
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

async function apiFetch() {
    try {
        // Store the results of the URL fetch into a variable named "response"
        const response = await fetch(url);

        // If the response is OK, process the data
        if (response.ok) {
            // Store the result of response.json() conversion in a variable named "data"
            const data = await response.json();

            // Output the results to the console for testing
            console.log(data);

            // Call the display function here to update the user interface!
            displayResults(data);

        } else {
            // Else, throw an Error using the response.text()
            throw Error(await response.text());
        }
    } catch (error) {
        // In the catch block, log the error to the console
        console.error(error);
    }
}

// Call the function to test it
apiFetch();

function displayResults(data) {
    // Accesses main.temp from the API response and rounds it to a whole number
    currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;F`;

    // Combines the icon string from weather[0].icon with the base URL path
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    // Extracts the specific text description phrase
    const desc = data.weather[0].description;

    // Configures the image element attributes
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);

    // Sets the caption element text
    captionDesc.textContent = desc;
}