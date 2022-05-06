import React from "react";
import { Loader } from "./common";
import "./styles.css";
import { useWeather } from "./useWeather";

export function App() {
  const weatherController = useWeather()

    return (
    <div className="wrapper">
      <h1>Weather-app</h1>
      <input
        value={weatherController.city}
        onChange={weatherController.onChangeCity}
        placeholder="City ..."
      />
      {weatherController.isLoading && <Loader />}
      <br />
      {weatherController.isError && <span>Повторите запрос позже</span>}
      {weatherController.isLoaded && (
        <div className="tableContainer">
          <h2>Forecast:</h2>
          <table>
            <thead>
              <th>Temperature</th>
              <th>Min temperature</th>
              <th>Max temperature</th>
              <th>Humidity</th>
            </thead>
            <tbody>
              <td>{weatherController.data.temp}</td>
              <td>{weatherController.data.temp_max}</td>
              <td>{weatherController.data.temp_min}</td>
              <td>{weatherController.data.humidity}</td>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

