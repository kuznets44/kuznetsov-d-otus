import axios, {AxiosResponse} from 'axios';
import { City } from '../interfaces/';

export  class WeatherService {

  API_URL_CITIES: string = 'http://api.openweathermap.org/geo/1.0/direct';
  API_URL_FORECAST: string = 'https://api.openweathermap.org/data/2.5/onecall?';
  API_KEY: string = process.env.API_KEY;

  constructor() {}

  public search(query: string): Promise<AxiosResponse> {
    let url = this.API_URL_CITIES + '?limit=10&q=' + query + '&appid=' + this.API_KEY;
    return axios.get(url);
  }

  public getForecast(city: City): Promise<AxiosResponse> {
    let url = this.API_URL_FORECAST + `lang=ru&lat=${city.lat}&lon=${city.lon}&exclude=minutely` + '&appid=' + this.API_KEY;
    console.log('getting_forecast',url);
    return axios.get(url);
  }

}