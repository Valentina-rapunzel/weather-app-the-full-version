// Get data from the API and display it on the page
function refreshWeather(response) {
  let temperature = response.data.temperature.current;
  let temperatureElement = document.querySelector("#app-temperature-value");
  temperatureElement.innerHTML = Math.round(temperature);
  let city = response.data.city;
  let country = response.data.country;
  let location = `${city}, ${country}`;
  let cityElement = document.querySelector("#app-city");
  cityElement.innerHTML = location;

  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${wind}km/h`;

  let description = response.data.condition.description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = description;
  // Inject an icon
  let iconElement = document.querySelector("#icon");
  let icon = `<img src="${response.data.condition.icon_url}" class="icon"/>`;
  iconElement.innerHTML = `${icon}`;

  getForecast(response.data.city);
}

// make an API call and change the interface
function searchCity(city) {
  let key = "b30a2d9fef22b5o0t83182be74814ec8";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=metric`;
  axios.get(url).then(refreshWeather);
}
// Get data from the input
function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

// to display todays date

function showDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = now.getDate();
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let year = now.getFullYear();

  return `${day}, ${date}. ${month}, ${year}`;
}

let today = new Date();
let dateElement = document.querySelector("#date");
dateElement.innerHTML = showDate(today);

// Event Listener that searches and shows city after submit
let searchForm = document.querySelector("#search-form");
console.log(searchForm);
searchForm.addEventListener("submit", showCity, showDate, showCurrentTime);

// to display current time

function showCurrentTime(number) {
  let hours = number.getHours();
  let minutes = number.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let clock = `Time: ${hours}:${minutes},`;
  return `${clock}`;
}

let currentTime = new Date();
let timeElement = document.querySelector("#time");
timeElement.innerHTML = showCurrentTime(currentTime);

// to show a default city
searchCity("Reethi Rah");

// weather forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "b30a2d9fef22b5o0t83182be74814ec8";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index > 0) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
    <div class="weather-forecast-date"> ${formatDay(day.time)}</div>
    <div class="weather-forecast-icon"><img src="${
      day.condition.icon_url
    }" class="weather-forecast-icon"/></div>
    <div class="weather-forecast-temperatures">
      <span class="weather-forecast-temperature-max"> <strong> ${Math.round(
        day.temperature.maximum
      )}°</strong></span>
      <span class="weather-forecast-temperature-min">${Math.round(
        day.temperature.minimum
      )}°</span>
    </div>
  </div>
      `;
    }
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

getForecast("Paris");
