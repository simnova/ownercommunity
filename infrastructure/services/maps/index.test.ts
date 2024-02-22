import { Maps } from './index';

// Common setup for all tests
let maps;

beforeEach(() => {
  maps = new Maps();
});

test.skip('sas token', async () => {
  const sasToken = await maps.generateSharedKey();
  expect(sasToken).toBe('');
});

test('sas token', async () => {
  const sasToken = await maps.generateSharedKey();
  expect(sasToken.length).toBe(544);
});
