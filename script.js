let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temparature = document.querySelector(".weather_temperature");
let w_mintem = document.querySelector(".weather_min");
let w_maxtem = document.querySelector(".weather_max");
let feel_like = document.querySelector(".weather_feelslike");
let humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let pressure = document.querySelector(".weather_pressure");
let citySearch = document.querySelector(".weather_search");

// to get the country name

const getCountryName = code => {
  return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

const getDateTime = dt => {
  const curDate = new Date(dt * 1000); // Convert seconds to milliseconds
  // console.log(curDate);
  // // const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(curDate);
  // // console.log(formatter);
  // return formatter.format(curDate);
};

city = "kolkata";

// serch functionality

citySearch.addEventListener("submit", e => {
  e.preventDefault();

  let cityName = document.querySelector(".city_name");
  console.log(cityName.value);
  city = cityName.value;
  getWeatherData();
  cityName.value = "";
});
const getWeatherData = async () => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=99ed18ed6e3db4fd04d69cd5b5b261b9`;
  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();

    console.log(data);

    const { main, name, weather, wind, sys, dt } = data;

    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;

    dateTime.innerHTML = getDateTime(dt);

    w_temparature.innerHTML = `${main.temp}&#176`;
    w_maxtem.innerHTML = `Max : ${main.temp_max.toFixed()}&#176`;
    w_mintem.innerHTML = `Min : ${main.temp_min.toFixed()}&#176`;
    feel_like.innerHTML = `${main.feels_like.toFixed()}&#176`;
    humidity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    pressure.innerHTML = `${main.pressure} hpa`;
    w_forecast.innerHTML = `${weather[0].main}`;
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;
  } catch (error) {
    console.log(error);
  }
};

document.body.addEventListener("load", getWeatherData());
