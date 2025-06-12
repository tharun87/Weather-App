const locationInput = document.querySelector("#location");
const placeName = document.querySelector(".place-name");
const searchBtn = document.querySelector("#search-btn");
const weatherImg = document.querySelector("#weather-Img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");

// Map weather conditions to image file names
const weatherImages = {
    Clear: "clear sun.png",
    Clouds: "cloudy.png",
    Rain: "rain.png",
    Drizzle: "rain.png",
    Thunderstorm: "rain.png",
    Snow: "snow.png",
    Mist: "cloudy.png",
    Smoke: "cloudy.png",
    Haze: "cloudy.png",
    Dust: "cloudy.png",
    Fog: "cloudy.png",
    Sand: "cloudy.png",
    Ash: "cloudy.png",
    Squall: "cloudy.png",
    Tornado: "cloudy.png"
};

const checkWeather = async (city) => {
    const api_key = "1754d83d857551863f25146af8e59484";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        const response = await fetch(url);
        const weather_data = await response.json();

        if (weather_data.cod !== 200) {
            alert("City not found. Please enter a valid city.");
            return;
        }

        // Set weather info
        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;

        description.innerHTML = `${weather_data.weather[0].description}`;

        humidity.innerHTML = `${weather_data.main.humidity}%`;
        windSpeed.innerHTML = `${weather_data.wind.speed} Km/H`;

        // Set weather image
        const mainWeather = weather_data.weather[0].main;
        const imageFile = weatherImages[mainWeather] || "clear sun.png"; // default fallback
        weatherImg.src = `weather images/${imageFile}`;

    } catch (error) {
        console.error("Error fetching weather:", error);
        alert("Failed to fetch weather data.");
    }
};

// Button click
searchBtn.addEventListener("click", () => {
    placeName.innerText = `${locationInput.value}`;
    checkWeather(locationInput.value);
});

// Pressing Enter in input field
locationInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        placeName.innerText = `${locationInput.value}`;
        checkWeather(locationInput.value);
    }
});

// ✅ Default weather for Hyderabad on page load
window.addEventListener("DOMContentLoaded", () => {
    checkWeather("Hyderabad");
});
