import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { WeatherSelectors } from "./store";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "./store/slice";

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
  const getWeather = (city) => dispatch(fetchWeather(city));

  const fetchWeatherDebounce = useCallback(debounce(getWeather, 3000), []);

  // const fetchWeatherDebounce = useCallback(
  //   debounce((city) => getWeather(city), 1000),
  //   []
  // );

  useEffect(() => {
    getWeather({ city });
  }, []);

  useEffect(() => {
    fetchWeatherDebounce({ city });
  }, [city]);

  return { city, data, isError, isLoaded, isLoading, onChangeCity };
};
