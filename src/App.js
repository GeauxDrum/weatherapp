import React, { useState, useEffect } from "react";
import LocationForm from "./components/LocationForm";
import Display from "./components/Display";
import DaySunny from "./img/wi-day-sunny.svg";
import DayCloudy from "./img/wi-day-cloudy.svg";
import Fog from "./img/wi-fog.svg";
import Rain from "./img/wi-rain.svg";
import NightClear from "./img/wi-night-clear.svg";
import NightCloudy from "./img/wi-night-alt-cloudy.svg";
import NightRain from "./img/wi-night-alt-rain.svg";
const config = require("./config");

export default function App() {
  const [info, setInfo] = useState();
  const [city, setCity] = useState("");
  const [inputBackground, setInputBackground] = useState("white");
  const [inputTextColor, setInputTextColor] = useState("white");
  const [weatherIcon, setWeatherIcon] = useState("");

  const setDark = async (time) => {
    if (!time) {
      document.body.style.backgroundColor = "#262626";
      document.body.style.color = "teal";
      setInputBackground("#262626");
      setInputTextColor("teal");
    } else {
      document.body.style.backgroundColor = "lightblue";
      document.body.style.color = "black";
      setInputBackground("white");
      setInputTextColor("black");
    }
  };

  const immageMapper = (num) => {
    if (num > 0 && num <= 4) {
      setWeatherIcon(DaySunny);
    } else if (num >= 5 && num <= 10) {
      setWeatherIcon(DayCloudy);
    } else if (num === 11) {
      setWeatherIcon(Fog);
    } else if (num >= 12 && num <= 18) {
      setWeatherIcon(Rain);
    } else if (num >= 33 && num <= 36) {
      setWeatherIcon(NightClear);
    } else if (num >= 37 && num <= 38) {
      setWeatherIcon(NightCloudy);
    } else if (num >= 39 && num <= 42) {
      setWeatherIcon(NightRain);
    }
  };

  const updateLocation = async (location) => {
    console.log("Fetching: ", location);
    const results = await fetch(
      `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${config.APIKEY}&q=${location}&details=true`
    );
    const data = await results.json();
    return data[0].Key;
  };

  const getWeather = async (cityID) => {
    const results = await fetch(
      `http://dataservice.accuweather.com/currentconditions/v1/${cityID}/?apikey=${config.APIKEY}&details=true`
    );
    const data = await results.json();
    return data;
  };

  const getDeetz = async (city) => {
    const cityID = await updateLocation(city);
    const weather = await getWeather(cityID);
    setCity(city);
    setInfo(weather[0]);
    setDark(weather[0].IsDayTime);
    immageMapper(weather[0].WeatherIcon);
    console.log(weather[0]);
  };

  return info ? (
    <div className="wrapper">
      <div className="app">
        <div className="title">Weather App</div>
        <LocationForm
          getDeetz={getDeetz}
          inputBackground={inputBackground}
          inputTextColor={inputTextColor}
        />
        <div className="displayHeader">Displaying weather for {city}</div>
        <Display info={info} weatherIcon={weatherIcon} />
      </div>
    </div>
  ) : (
    <div className="wrapper">
      <div className="app">
        <div className="title">Weather App</div>
        <LocationForm getDeetz={getDeetz} />
      </div>
    </div>
  );
}
