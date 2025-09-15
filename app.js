const apiKey = "a844bb6b3295ed1c400a0b11a8fbce16";
const apiURl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let cityName = document.querySelector(".city");
let temperature = document.querySelector(".temp");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");

let searchBox = document.querySelector(".search input");
let searchBtn = document.querySelector(".search button");

let weatherIcon = document.querySelector(".weather-icon");
let weatherDisplay = document.querySelector(".weather");
let loader = document.getElementById("loader");

function showLoader() {
    loader.classList.remove("hide");
}
function hideLoader() {
    loader.classList.add("hide");
}

function animateWeather() {
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = 0;
        el.style.animation = "none";
        // Force reflow
        void el.offsetWidth;
        el.style.animation = "";
        el.classList.remove('fade-in');
        void el.offsetWidth;
        el.classList.add('fade-in');
    });
}

async function checkWeather(city) {
    showLoader();
    try {
        const response = await fetch(apiURl + city + `&appid=${apiKey}`);
        if(response.status === 404){
            alert("Invalid city name. Please try again.");
            weatherDisplay.style.display = "none";
        }
        else{
            var data = await response.json();

            cityName.innerHTML = data.name;
            temperature.innerHTML = Math.round(data.main.temp) + "°c";
            humidity.innerHTML = data.main.humidity + "%";
            wind.innerHTML = Math.round(data.wind.speed) + " km/h";

            if(data.weather[0].main === "Clouds"){
                weatherIcon.src = "images/clouds.png";
            }
            else if(data.weather[0].main === "Clear"){
                weatherIcon.src = "images/clear.png";
            }
            else if(data.weather[0].main === "Drizzle"){
                weatherIcon.src = "images/drizzle.png";
            }
            else if(data.weather[0].main === "Rain"){
                weatherIcon.src = "images/rain.png";
            }
            else if(data.weather[0].main === "Snow"){
                weatherIcon.src = "images/snow.png";
            }
            else if(data.weather[0].main === "Mist"){
                weatherIcon.src = "images/mist.png";
            }

            weatherDisplay.style.display = "block";
            animateWeather();
        }
    } catch (e) {
        alert("Network error. Please try again.");
        weatherDisplay.style.display = "none";
    }
    hideLoader();
}

searchBtn.addEventListener ("click", () => {
    if (searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    }
});

searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    }
});

// Hide loader on initial load
window.addEventListener("DOMContentLoaded", hideLoader);

