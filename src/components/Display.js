import React from "react";

export default function Display({ info }) {
  console.log(info);
  return (
    <div className="weather-display">
      <div className="weatherText">{info.WeatherText}</div>
      <div className="temperature">
        {info.Temperature.Imperial.Value} degrees
      </div>
    </div>
  );
}
