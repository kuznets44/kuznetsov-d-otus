import { FormatIndentDecrease } from "@material-ui/icons";
import ForecastHourly from "../components/ForecastHourly";
import { CityForecast, Forecast, RootState } from "../interfaces";

const forecasts = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FORECAST':
      let newState = [...state];
      let forecastIndex = newState.findIndex( (item: CityForecast) => item.code === action.code );
      
      if( forecastIndex === -1) {
        newState.push({
          code: action.code,
          queryTime: Date.now(),
          forecast: processForecastData(action.result)
        });
      } else {
        newState.splice(forecastIndex,1,processForecastData(action.result));
      }
      return newState;
    default:
      return state
  }
}

export default forecasts;

function processForecast( forecast: any): Forecast {
  return {
    dt: forecast.dt,
    temp: forecast.temp,
    humidity: forecast.humidity,
    clouds: forecast.clouds,
    wind: {
      speed: forecast.wind_speed,
      deg: forecast.wind_deg
    },
    pressure: forecast.pressure,
    rain: forecast.rain,
    weather: forecast.weather[0]
  };
}

function processForecastData(data: any): any {
  const result = {
    current: processForecast(data.current),
    hourly: data.hourly.map( item => processForecast(item)),
    daily: data.daily.map( item => processForecast(item)),
  };

  return result;
}
