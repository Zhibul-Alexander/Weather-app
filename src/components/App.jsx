import React from "react";
import { debounce } from "lodash";
import { LOAD_STATUSES } from "../constants";
import { Loader } from "./common";
import "./styles.css";
import { connect } from "react-redux";
import { WeatherSelectors } from "./store";
import { WeatherAC } from "./store";

export class NewApp extends React.Component {
  state = {
    city: "Minsk",
  };

  fetchWeatherDebounce = debounce(this.props.getWeather, 1000);

  componentDidMount() {
    this.props.getWeather(this.state.city);
    this.fetchWeatherDebounce({ city: this.state.city });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.city !== this.state.city) {
      this.fetchWeatherDebounce({ city: this.state.city });
    }
  }

  render() {
    const { data, isLoaded, isLoading, isError } = this.props;
    
    return (
      <div className="wrapper">
        <h1>Weather-app</h1>
        <input
          value={this.state.city}
          onChange={(event) => this.setState({ city: event.target.value })}
          placeholder="City ..."
        />
        {isLoading && <Loader />}
        <br />
        {isError && <span>Повторите запрос позже</span>}
        {isLoaded && (
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
                <td>{data.temp}</td>
                <td>{data.temp_max}</td>
                <td>{data.temp_min}</td>
                <td>{data.humidity}</td>
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProprs = (state) => {
  return {
    data: WeatherSelectors.getWeather(state),
    isLoading: WeatherSelectors.isLoading(state),
    isLoaded: WeatherSelectors.isLoaded(state),
    isError: WeatherSelectors.isError(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWeather: (city) => dispatch(WeatherAC.fetchWeather(city))
  };
};

export const App = connect(mapStateToProprs, mapDispatchToProps)(NewApp);
