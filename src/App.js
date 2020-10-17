import React, { useState, useEffect } from "react";
import LocationForm from "./components/LocationForm";
import Display from "./components/Display";
const config = require("./config");

export default function App() {
  const [info, setInfo] = useState();
  const [city, setCity] = useState("");

  const updateLocation = async (location) => {
    console.log("Fetching: ", location);
    const results = await fetch(
      `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${config.APIKEY}&q=${location}&details=true`
    );
    const data = await results.json();
    setCity(location);
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
    setInfo(weather[0]);
  };

  return info ? (
    <div className="wrapper">
      <div className="title">Weather App</div>
      <LocationForm getDeetz={getDeetz} />
      <div className="displayHeader">Displaying weather for {city}</div>
      <Display info={info} />
    </div>
  ) : (
    <div className="wrapper">
      <div className="title">Weather App</div>
      <LocationForm getDeetz={getDeetz} />
    </div>
  );
}
