import cybersource from 'cybersource-rest-client';

const configObject = {
  authenticationType: 'http_signature',
  runEnvironment: 'apitest.cybersource.com',
  merchantID: 'ecfmg_faimer',
  merchantKeyId: '15db87b6-5531-4771-9c19-cc34a2d435b9',
  merchantsecretKey: 'iMt2CuZsRPcuURcM1L2VieNFmnqscxVR4/BPFFitn10=',
  logConfiguration: {
    enableLog: false,
  }
};

const cybersourceClient = new cybersource.ApiClient();

function generateKey() {
  try {
    const keyResponseFormat = 'JWT';
    const client = new cybersource.KeyGenerationApi(configObject, cybersourceClient);
    const generatePublicKeyRequestObj = new cybersource.GeneratePublicKeyRequest();

    generatePublicKeyRequestObj.encryptionType = 'RsaOaep256';
    generatePublicKeyRequestObj.targetOrigin = process.env.CYBERSOURCE_IFRAME_TARGET_ORIGIN;

    return new Promise((resolve, reject) => {
      client.generatePublicKey(keyResponseFormat, generatePublicKeyRequestObj, (error, data, response) => {
        if (!error) {
          resolve(data.keyId);
        } else {
          reject(new Error(error.message || 'Unknown error occurred'));
        }
      });
    })
  } catch (error) {
    return {
      status: 500,
      body: `Error processing Cybersource: ${error.message}`
    }
  }
}

export default generateKey;