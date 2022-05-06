import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { WeatherSelectors } from "./store";
import { WeatherAC } from "./store";
import { useSelector, useDispatch } from "react-redux";

export const useWeather = () => {
  const [city, setCity] = useState("Minsk");

  const onChangeCity = ({ target }) => {
    setCity(target.value);
  };

  const data = useSelector(WeatherSelectors.getWeather);
  const isLoading = useSelector(WeatherSelectors.isLoading);
  const isLoaded = useSelector(WeatherSelectors.isLoaded);
  const isError = useSelector(WeatherSelectors.isError);

  const dispatch = useDispatch();
  const getWeather = (city) => dispatch(WeatherAC.fetchWeather(city));

  const fetchWeatherDebounce = useCallback(debounce(getWeather, 3000), []);

  useEffect(() => {
    getWeather({ city });
  }, []);

  useEffect(() => {
    fetchWeatherDebounce({ city });
  }, [city]);

  return { city, data, isError, isLoaded, isLoading, onChangeCity };
};
