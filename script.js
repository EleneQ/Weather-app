const card = document.querySelector(".card");
const SearchBtn = document.querySelector(".search-box button");
const weather = document.querySelector(".weather");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const searchInput = document.querySelector(".search-box input");

const weatherImg = document.querySelector(".weather img");
const temperature = document.querySelector(".weather .temperature");
const description = document.querySelector(".weather .description");
const humidity = document.querySelector(".weather-details .humidity span");
const windSpeed = document.querySelector(".weather-details .wind-speed span");

SearchBtn.addEventListener("click", () => {
  const apiKey = "772f1eb34c5f4de6fe15a27fd25f286f";
  const place = searchInput.value;
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}&units=metric`;

  if (place === "") {
    alert("Please enter your location");
    return;
  }

  fetch(api)
    //.then() just says "after it's done fetching, so after the data arrives from the server to me, only then do the stuff inside this"
    .then((response) => {
      return response.json(); //converting the api data to json, so that we can easily use it in our js
    })
    //so that the code inside this only executes after the data was made into a json
    .then((data) => {
      if (data.cod === "404") {
        handleNotFoundError();
        return;
      }

      error404.classList.remove("display-block");
      error404.classList.remove("fade-in");

      assignWeatherImg(data);
      showWeather();
    });
});

function showWeather() {
  weather.classList.remove("display-none");
  weatherDetails.classList.remove("display-none");
  weather.classList.add("fade-in");
  weatherDetails.classList.add("fade-in");
  card.style.height = "600px";
}

function assignWeatherImg(data) {
  switch (data.weather[0].main) {
    case "Clear":
      weatherImg.src = "images/clear.png";
      break;

    case "Rain":
      weatherImg.src = "images/rain.png";
      break;

    case "Snow":
      weatherImg.src = "images/snow.png";
      break;

    case "Clouds":
      weatherImg.src = "images/clouds.png";
      break;

    case "Haze":
      weatherImg.src = "images/mist.png";
      break;

    default:
      weatherImg.src = "";
      break;
  }

  assignWeather();

  function assignWeather() {
    temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
    description.textContent = `${data.weather[0].description}`;
    humidity.textContent = `${data.main.humidity}`;
    windSpeed.innerHTML = `${parseInt(data.wind.speed)}km/h`;
  }
}

function handleNotFoundError() {
  card.style.height = "400px";
  weather.classList.add("display-none");
  weatherDetails.classList.add("display-none");
  error404.classList.add("display-block");
  error404.classList.add("fade-in");
}
