function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Satday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#searched-weather").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let metric = "metric";
  let apiKey = `3318919d4a7d1eadf877215ef4b16af7`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${metric}`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function findPosition(position) {
  let apiKey = `3318919d4a7d1eadf877215ef4b16af7`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findPosition);
}

function getParisWeather(event) {
  event.preventDefault();
  searchCity("Paris");
}

function getMoscowWeather(event) {
  event.preventDefault();
  searchCity("Moscow");
}

function getLisbonWeather(event) {
  event.preventDefault();
  searchCity("Lisbon");
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 67;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);

searchCity("New York");

let parisButton = document.querySelector("#paris-button");
parisButton.addEventListener("click", getParisWeather);

let moscowButton = document.querySelector("#moscow-button");
moscowButton.addEventListener("click", getMoscowWeather);

let lisbonButton = document.querySelector("#lisbon-button");
lisbonButton.addEventListener("click", getLisbonWeather);
