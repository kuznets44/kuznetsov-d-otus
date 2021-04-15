import searchQueries from './searchQueries';

const mockQuery = {
  query: 'БРЯНСК',
  cities: []
};

test('searchQueries should handle initial state', () => {
  expect(
    searchQueries(undefined, {})
  ).toEqual([])
});


it('should handle ADD_QUERY', () => {
  expect(
    searchQueries([], {
      type: 'ADD_QUERY',
      query: 'Брянск',
      cities: []
    })
  ).toEqual([mockQuery]);
});
