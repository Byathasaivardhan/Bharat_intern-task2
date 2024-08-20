const apiKey = '5955649f14ce650e75ede64564c1db69'; // Replace with your OpenWeatherMap API key
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // CORS proxy for testing

const cityInput = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather-btn');
const weatherInfoDiv = document.getElementById('weather-info');
const weatherStatusFooter = document.getElementById('weather-status');

getWeatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (city) {
        const weatherData = await fetchWeather(city);
        if (weatherData) {
            displayWeatherInfo(weatherData);
        } else {
            displayError('Error fetching weather data');
        }
    } else {
        displayError('Please enter a valid city name');
    }
});

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        return null;
    }
}

function displayWeatherInfo(weatherData) {
    const temperature = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    weatherInfoDiv.innerText = `Temperature: ${temperature}°C`;
    weatherStatusFooter.innerText = `Weather status: ${description}`;
}

function displayError(message) {
    weatherInfoDiv.innerText = message;
    weatherStatusFooter.innerText = '';
}