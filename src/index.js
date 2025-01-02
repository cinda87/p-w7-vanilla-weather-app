//update current temperature
function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");
  let pressureElement = document.querySelector("#pressure");
  let feelsLikeElement = document.querySelector("#feels-like");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);


  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windSpeedElement.innerHTML = response.data.wind.speed;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  pressureElement.innerHTML = response.data.temperature.pressure;
  feelsLikeElement.innerHTML = response.data.temperature.feels_like;
}

//Date/Time
function formatDate(dateTime){

let date = dateTime.getDate();
let hours = dateTime.getHours();
let minutes = dateTime.getMinutes();

let days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];
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
return  `${day}, ${month} ${date}, at ${hours}:${minutes}`; 
}

 

//api
function searchCity(city) {
  let apiKey = "a050491735e3o6daf6dd43f3ab206bct";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

//Search changes location title
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Oslo");

