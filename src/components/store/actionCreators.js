import { WeatherActions } from "./constants";
import { getCurrentWeather } from "../../api";

export const fetchStart = () => ({
  type: WeatherActions.fetchStart,
});

export const fetchError = () => ({
  type: WeatherActions.fetchError,
});

export const fetchSuccess = (weather) => ({
  type: WeatherActions.fetchSuccess,
  payload: weather,
});

export const fetchWeather = (city) => {
  return async (dispatch) => {
    try {
      dispatch(fetchStart());
      const weather = await getCurrentWeather(city);
      dispatch(fetchSuccess(weather.main));
    } catch {
      dispatch(fetchError());
    }
  };
};
