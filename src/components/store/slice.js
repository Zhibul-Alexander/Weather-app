import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LOAD_STATUSES } from "../../constants/loadStatuses";
import { getCurrentWeather } from "../../api";

export const fetchWeather = createAsyncThunk(
  "weather/getWeather",
  async (city) => {
    const weather = await getCurrentWeather(city);
    return weather.main;
  }
);

export const { actions, reducer } = createSlice({
  name: "weather",
  initialState: {
    data: {},
    loadStatus: LOAD_STATUSES.UNKNOWN,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.pending, (state) => {
      state.loadStatus = LOAD_STATUSES.LOADING;
    });
    builder.addCase(fetchWeather.rejected, (state) => {
      state.loadStatus = LOAD_STATUSES.ERROR;
    });
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loadStatus = LOAD_STATUSES.LOADED;
    });
  },
});
