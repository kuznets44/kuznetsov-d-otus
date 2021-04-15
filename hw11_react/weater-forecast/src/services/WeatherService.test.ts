import {WeatherService} from './WeaterService';
import dotenv from 'dotenv';
import { City } from '../interfaces';
import axios from 'axios';

dotenv.config();

let mockCity: City = {
  name: 'Москва',
  code: 'moscow',
  lat: 55.7522,
  lon: 37.6156
};

let service: WeatherService;

beforeEach(() => {
  service = new WeatherService();
});

test('should create WeatherService object', () => {
  expect(service).toBeTruthy();
});

test('should contain API KEY as specified in the .env', () => {
  let apiKey = service.API_KEY;
  expect(apiKey).toEqual(process.env.API_KEY);
});

