import { Maps } from './index';

test.skip('sas toke', async () => {
    const maps = new Maps();
    const sasToken = await maps.generateSharedKey();
    expect(sasToken).toBe("");
});
