import React from "react";

export default function Display({ info, weatherIcon }) {
  return (
    <div className="weather-display">
      <div className="icon">
        <img src={weatherIcon} />
      </div>
      <div className="temperature">
        {info.Temperature.Imperial.Value}&deg; F
      </div>
      <div className="weatherText">{info.WeatherText}</div>
      <div className="wind">
        Wind: {info.Wind.Direction.English} {info.Wind.Speed.Imperial.Value}
        {info.Wind.Speed.Imperial.Unit}
      </div>
    </div>
  );
}
