function refreshweather(response) {
  let temperatureElement = document.querySelector('#temperature');
  let city = document.querySelector('#city');
  let descriptionElement = document.querySelector('#description');
  let humidityElement = document.querySelector('#humidity');
  let windspeedElement = document.querySelector('#wind-speed');
  let TimeElement = document.querySelector('#time');
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector('#icon');

  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;

  city.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windspeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  TimeElement.innerHTML = formatDate(date);
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);
}

function formatDate(date) {
  let minute = date.getMinutes();
  let hour = date.getHours();
  let days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  let day = days[date.getDay()];

  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day} ${hour} : ${minute} `;
}

function searchCity(city) {
  let apikey = 'bfb8dee3b64aeba3tfoa0a66bc4f26df';
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=metric`;
  axios.get(apiURL).then(refreshweather);
}

function handlesearchsubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector('#search-form-input');

  searchCity(searchInput.value);
}

let searchform = document.querySelector('#search-form');
searchform.addEventListener('submit', handlesearchsubmit);
