import { AzCognitiveSearch } from './index';

// Check if required environment variables are defined
beforeAll(() => {
  if (!process.env.SEARCH_API_KEY || !process.env.SEARCH_API_ENDPOINT) {
    throw new Error('SEARCH_API_KEY and SEARCH_API_ENDPOINT must be defined.');
  }
});

// Common setup for all tests
let cognitiveSearch;

beforeEach(() => {
  const searchKey = process.env.SEARCH_API_KEY;
  const endpoint = process.env.SEARCH_API_ENDPOINT;
  cognitiveSearch = new AzCognitiveSearch(searchKey, endpoint);
});

test.skip('Initialize cognitive search object', () => {
  expect(cognitiveSearch).toBeDefined();
});

test.skip('cognitive search undefined', async () => {
  const search = await cognitiveSearch.search('property-listings', 'beach', {
    queryType: 'full',
    searchMode: 'all',
    includeTotalCount: true,
    filter: `communityId eq '625641815f0e5d472135046c'`,
    facets: [
      'type,count:1000',
      'additionalAmenities/category',
      'additionalAmenities/amenities,count:1000',
      'amenities,count:1000',
      'listedForLease,count:1000',
      'listedForSale,count:1000',
      'listedForRent,count:1000',
      'bedrooms,count:1000',
      'bathrooms,count:1000',
      'updatedAt,count:1000',
      'createdAt,count:1000',
      'tags,count:1000',
    ],
    top: 10, // 10, 15, 20
    skip: 0, // 0, skip += top
  });
  expect(search).toBeUndefined();
});

test.skip('cognitive search success', async () => {
  const search = await cognitiveSearch.search('property-listings', 'beach', {
    queryType: 'full',
    searchMode: 'all',
    includeTotalCount: true,
    filter: `communityId eq '625641815f0e5d472135046c'`,
    facets: [
      'type,count:1000',
      'additionalAmenities/category',
      'additionalAmenities/amenities,count:1000',
      'amenities,count:1000',
      'listedForLease,count:1000',
      'listedForSale,count:1000',
      'listedForRent,count:1000',
      'bedrooms,count:1000',
      'bathrooms,count:1000',
      'updatedAt,count:1000',
      'createdAt,count:1000',
      'tags,count:1000',
    ],
    top: 10, // 10, 15, 20
    skip: 0, // 0, skip += top
  });
  // expect search json object to be defined and has a property count with value greater than 0
  expect(search).toBeDefined();
  expect(search.count).toBeGreaterThan(0);
});
