import { Cybersource } from './index';

let cybersource;

beforeEach(() => {
  cybersource = new Cybersource();
});

test('cybersource generate key', async () => {
  const generatedKey = await cybersource.generateKey();
  console.log(generatedKey);
  expect(generatedKey).toBeDefined();
});
