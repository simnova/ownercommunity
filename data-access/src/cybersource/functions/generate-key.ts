import cybersource from 'cybersource-rest-client';

const configObject = {
  authenticationType: 'http_signature',
  runEnvironment: 'apitest.cybersource.com',
  merchantID: 'ecfmg_faimer',
  merchantKeyId: '2adee370-c670-4d76-a64a-ec2a5319d008',
  merchantsecretKey: 's3c1EtcQkSpCAMem1l7dTHJU2z1DJm6Ce97yxmVkc6U=',
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