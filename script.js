const card = document.querySelector(".card");
const SearchBtn = document.querySelector(".search-box button");
const weather = document.querySelector(".weather");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const searchInput = document.querySelector(".search-box input");

// const weatherImg = document.querySelector(".weather img");
const temperature = document.querySelector(".weather .temperature");
const description = document.querySelector(".weather .description");
const humidity = document.querySelector(".weather-details .humidity span");
const windSpeed = document.querySelector(".weather-details .wind-speed span");
const weatherIcon = document.querySelector("canvas.icon");

//so that we can search using the enter key too
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    SearchBtn.click();
  }
});

SearchBtn.addEventListener("click", () => {
  const apiKey = "772f1eb34c5f4de6fe15a27fd25f286f";
  const place = searchInput.value;
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}&units=metric`;

  if (place === "") {
    alert("Please enter your location");
    return;
  }

  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        handleNotFoundError();
      } else {
        updateWeather(data);
      }
    })

    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
});

function handleNotFoundError() {
  card.style.height = "400px";
  hideWeatherElements();
  error404.style.display = "block";
  error404.classList.add("fade-in");
}

function updateWeather(data) {
  error404.style.display = "none";
  error404.classList.remove("fade-in");
  assignWeatherImg(data);
  showWeather();
}

function showWeather() {
  weather.style.display = "";
  weatherDetails.style.display = "";
  weather.classList.add("fade-in");
  weatherDetails.classList.add("fade-in");
  card.style.height = "550px";
}

function hideWeatherElements() {
  weather.style.display = "none";
  weatherDetails.style.display = "none";
}

function assignWeatherImg(data) {
  // const imageMapping = {
  //   Clear: "images/clear.png",
  //   Rain: "images/rain.png",
  //   Snow: "images/snow.png",
  //   Clouds: "images/clouds.png",
  //   Haze: "images/mist.png",
  // };
  const imageMapping = {
    Clear: "CLEAR_DAY",
    Rain: "RAIN",
    Snow: "SNOW",
    Clouds: "CLOUDY",
    Haze: "FOG",
  };

  const main = data.weather[0].main;
  assignWeatherDetails(data);
  setWeatherIcon(imageMapping[main] || "", weatherIcon);
}

function setWeatherIcon(icon, iconID) {
  const skycons = new Skycons({ color: "#F88379" });
  skycons.play();
  skycons.set(iconID, icon);
}

function assignWeatherDetails(data) {
  temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
  description.textContent = data.weather[0].description;
  humidity.textContent = `${data.main.humidity}%`;
  windSpeed.textContent = `${parseInt(data.wind.speed)}km/h`;
}
