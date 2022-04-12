import React from "react";
import { debounce } from "lodash";
import { getCurrentWeather } from "../api";
import { LOAD_STATUSES } from "../constants";
import { Loader } from "./common";
import "./styles.css";

export class App extends React.Component {
  state = {
    city: "",
    data: {},
    loadStatus: LOAD_STATUSES.UNKNOWN,
  };

  fetchWeather = (params) => {
    this.setState({ loadStatus: LOAD_STATUSES.LOADING });

    getCurrentWeather(params)
      .then(({ main }) => {
        this.setState({ loadStatus: LOAD_STATUSES.LOADED, data: main });
      })
      .catch(() => {
        this.setState({ loadStatus: LOAD_STATUSES.ERROR, data: {} });
      });
  };

  fetchWeatherDebounce = debounce(this.fetchWeather, 1000);

  componentDidUpdate(_, prevState) {
    if (prevState.city !== this.state.city) {
      this.fetchWeatherDebounce({ city: this.state.city });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <input
          value={this.state.city}
          onChange={(event) => this.setState({ city: event.target.value })}
          placeholder="City ..."
        />
        {this.state.loadStatus === LOAD_STATUSES.LOADING && <Loader />}
        {this.state.loadStatus === LOAD_STATUSES.ERROR && (
          <span>Повторите запрос позже</span>
        )}
        {this.state.loadStatus === LOAD_STATUSES.LOADED && (
          <div className="tableContainer">
            <h1>Weather-app</h1>
            <table>
              <thead>
                <th>Temperature</th>
                <th>Min temperature</th>
                <th>Max temperature</th>
                <th>Humidity</th>
              </thead>
              <tbody>
                <td>{this.state.data.temp}</td>
                <td>{this.state.data.temp_max}</td>
                <td>{this.state.data.temp_min}</td>
                <td>{this.state.data.humidity}</td>
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}
