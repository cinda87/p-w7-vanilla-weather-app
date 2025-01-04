//update current temperature
function refreshWeather(response) {
  const degreeLabel = document.querySelector("#degree");
  const needle = document.querySelector("#compass-needle");
  let cityElement = document.querySelector("#city");
  let date = new Date(response.data.time * 1000);
  let degree = response.data.wind.degree;
  let descriptionElement = document.querySelector("#description");
  let feelsLikeElement = document.querySelector("#feels-like");
  let humidityElement = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");
  let pressureElement = document.querySelector("#pressure");
  let temperature = response.data.temperature.current;
  let temperatureElement = document.querySelector("#temperature");
  let timeElement = document.querySelector("#time");
  let windSpeedElement = document.querySelector("#wind-speed");

  cityElement.innerHTML = response.data.city;
  degreeLabel.textContent = `${degree}`;
  descriptionElement.innerHTML = response.data.condition.description;
  feelsLikeElement.innerHTML = response.data.temperature.feels_like;
  humidityElement.innerHTML = response.data.temperature.humidity;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  needle.style.transform = `translate(-50%, -100%) rotate(${degree}deg)`;
  pressureElement.innerHTML = response.data.temperature.pressure;
  temperatureElement.innerHTML = Math.round(temperature);
  timeElement.innerHTML = formatDate(date);
  windSpeedElement.innerHTML = response.data.wind.speed;

  const cardinalDirection = document.querySelector("#degree").innerHTML;
  const windDirection = document.querySelector("#cardinal-direction");
  windDirection.innerHTML = degreesToCardinal(cardinalDirection);
}

//Date/Time
function formatDate(dateTime) {
  let date = dateTime.getDate();
  let hours = dateTime.getHours();
  let minutes = dateTime.getMinutes();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[dateTime.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Septemper",
    "October",
    "November",
    "December",
  ];

  let month = months[dateTime.getMonth()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${month} ${date}, at ${hours}:${minutes}`;
}

//api
function searchCity(city, units) {
  let apiKey = "a050491735e3o6daf6dd43f3ab206bct";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(refreshWeather);
}

//Search changes location title
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value, unitSystem);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// Units Toggle
function changeUnits(event) {
  let tempUnit = document.querySelector("#unit-type");
  let windUnit = document.querySelector("#wind-unit");
  let feelsUnit = document.querySelector("#feels-unit-type");
  let city = document.querySelector("#city").innerHTML;

  if (event.target.checked) {
    unitSystem = "imperial";
    tempUnit.innerHTML = "°F";
    feelsUnit.innerHTML = "°F";
    windUnit.innerHTML = "mph";
  } else {
    unitSystem = "metric";
    tempUnit.innerHTML = "°C";
    feelsUnit.innerHTML = "°C";
    windUnit.innerHTML = "km/h";
  }

  searchCity(city, unitSystem);
}
let unitToggle = document.querySelector("#myCheckbox");
unitToggle.addEventListener("click", (event) => changeUnits(event));

//Degrees to Cardindal
function degreesToCardinal(degrees) {
  console.log(degrees);
  const sectors = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];

  const index = Math.round(degrees / 22.5) % 16;
  return sectors[index];
}

let unitSystem = "metric";
searchCity("Oslo", unitSystem);
