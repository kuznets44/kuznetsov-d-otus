import { City } from '../interfaces';

const searchQueries = (state = [], action) => {
  switch (action.type) {
    case 'ADD_QUERY':
      const cities: City[] = action.cities.map( item => {
        return {
          name: item.local_names.ru,
          code: item.name.toLowerCase(),
          lat: item.lat,
          lon: item.lon,
          country: item.country
        }
      })
      return [
        ...state,
        {
          query: action.query.toUpperCase(),
          cities: cities
        }
      ]
    default:
      return state
  }
}

export default searchQueries;