import { combineReducers } from 'redux';
import searchQueries from './searchQueries';
import forecasts from './forecasts';
import cities from './cities';

export default combineReducers({
  searchQueries,
  forecasts,
  cities
})