import forecasts from './forecasts';

const mockForecast = {
  bryansk: [],
  results: []
};

test('forecasts should handle initial state', () => {
  expect(
    forecasts(undefined, {})
  ).toEqual([])
});

