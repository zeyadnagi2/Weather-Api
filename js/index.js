// SELECT ELEMENTS
let searchInput = document.querySelector(".search-input");
let searchBtn = document.querySelector(".search-btn");

// FIRST CARD (TODAY)
let todayCard = document.querySelectorAll(".weather-card")[0];
let cityName = todayCard.querySelector(".city-name");
let todayName = todayCard.querySelector(".today-name");
let todayDate = todayCard.querySelector(".today-date");
let temperature = todayCard.querySelector(".temperature");
let temperatureIcon = todayCard.querySelector(".temperature-icon");
let tempDescription = todayCard.querySelector(".temp-description");
let humidity = todayCard.querySelector(".humidity");
let air = todayCard.querySelector(".air");
let navegation = todayCard.querySelector(".navegation");

// NEXT DAY CARDS (2nd and 3rd)
let nextCards = Array.from(document.querySelectorAll(".weather-card")).slice(1, 3);

// FETCH WEATHER
async function getWeather(city = "Cairo") {
  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=06b124f6d0ab4672ab4103556250407&q=${city}&days=3`
    );
    let data = await response.json();
    displayToday(data);
    displayNextDays(data);
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}

// INITIAL CALL
getWeather();

// DISPLAY TODAY
function displayToday(data) {
  let date = new Date();

  cityName.innerHTML = data.location.name;
  todayName.innerHTML = date.toLocaleDateString("en-US", { weekday: "long" });
  todayDate.innerHTML = `${date.getDate()} ${date.toLocaleDateString("en-US", {
    month: "long",
  })}`;
  temperature.innerHTML = `${data.current.temp_c}ºC`;
  temperatureIcon.setAttribute("src", data.current.condition.icon);
  tempDescription.innerHTML = data.current.condition.text;
  humidity.innerHTML = `<i class="fas fa-umbrella"></i> ${data.current.humidity}%`;
  air.innerHTML = `<i class="fas fa-wind"></i> ${data.current.wind_kph}km/h`;
  navegation.innerHTML = `<i class="fas fa-location-arrow"></i> ${data.current.wind_dir}`;
}

// DISPLAY NEXT 2 DAYS
function displayNextDays(data) {
  let forecastDays = data.forecast.forecastday;

  for (let i = 1; i <= 2; i++) {
    let card = nextCards[i - 1];
    let dayData = forecastDays[i];
    let dateObj = new Date(dayData.date);

    card.querySelector(".day-name").innerHTML = dateObj.toLocaleDateString("en-US", { weekday: "long" });
    card.querySelector(".day-date").innerHTML = `${dateObj.getDate()} ${dateObj.toLocaleDateString("en-US", { month: "long" })}`;
    card.querySelector(".day-temp").innerHTML = `${dayData.day.maxtemp_c}ºC`;
    card.querySelector(".day-icon").setAttribute("src", dayData.day.condition.icon);
    card.querySelector(".description").innerHTML = dayData.day.condition.text;
    card.querySelector(".min-temp").innerHTML = `${dayData.day.mintemp_c}º`;
  }
}

// SEARCH BUTTON CLICK
searchBtn.addEventListener("click", () => {
  let city = searchInput.value.trim();
  if (city !== "") {
    getWeather(city);
  }
});

// ENTER KEY SUPPORT
searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});
