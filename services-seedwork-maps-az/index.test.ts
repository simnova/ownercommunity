import { AzMaps } from './index';

// Common setup for all tests
let maps;

beforeEach(() => {
  maps = new AzMaps();
});

test.skip('sas token', async () => {
  const sasToken = await maps.generateSharedKey();
  expect(sasToken).toBe('');
});

test.skip('sas token', async () => {
  const sasToken = await maps.generateSharedKey();
  expect(sasToken.length).toBe(544);
});
