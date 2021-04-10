import { CityStorage } from './CityStorage';
import { City } from '../interfaces';
import dotenv from 'dotenv';

dotenv.config();

let storage: CityStorage;

const cityMock: City = {
  name: 'Test',
  code: 'test',
  lat: 50.123,
  lon: 37.5,
  country: 'RU'
};

beforeEach(() => {
  storage = new CityStorage();
});

test('should create CityStorage object', () => {
  expect(storage).toBeTruthy();
});

test('should have storage key as it is specified in the .env', () => {
  expect(storage.STORAGE_KEY).toEqual(process.env.STORAGE_KEY);
});

test('#getList should return an array of City object', () => {
  expect(storage.getList()).toBeInstanceOf(Array);
});

test('#clear should make objects list clean', () => {
  storage.clear();
  expect(storage.getList().length).toBe(0);
});

test('#addCity should increase an amount of elements', () => {
  let amountBefore = storage.getList().length;
  storage.addCity(cityMock);
  let amountAfter = storage.getList().length;
  expect(amountAfter - amountBefore).toBe(1);
  storage.clear();
});

test('#removeCity should decrease an amount of elements', () => {
  storage.addCity(cityMock);
  let amountBefore = storage.getList().length;
  storage.removeCity(cityMock);
  let amountAfter = storage.getList().length;
  expect(amountAfter - amountBefore).toBe(-1);
  storage.clear();
});
