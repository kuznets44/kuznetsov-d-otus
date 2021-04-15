export interface City {
  name: string,
  code: string,
  lat: number,
  lon: number,
  country: string
}

export interface Forecast {
  dt: number,
  temp: any,
  pressure: number,
  humidity: number,
  clouds: number,
  wind: {
    speed: number,
    deg: number
  },
  rain: number,
  weather: {
    main: string,
    description: string,
    icon: string
  }
}

export interface CityForecast {
  code: string,
  queryTime: number,
  forecast: {
    current?: Forecast,
    hourly?: Forecast[],
    daily?: Forecast[]  
  }
}

export interface SearchQuery {
  query: string,
  cities: []
};

export interface RootState {
  searchQueries: SearchQuery[],
  forecasts: CityForecast[],
  cities: City[]
};