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

/**
 * Generates a public key using the Cybersource KeyGeneration API.
 * 
 * This function creates a request object with encryption type set to 'RsaOaep256'
 * and the target origin set to the environment variable 'CYBERSOURCE_IFRAME_TARGET_ORIGIN'.
 * It then calls the Cybersource API to generate the public key in 'JWT' format.
 * 
 * @returns {Promise<string>} A promise that resolves to the generated public key ID, or rejects with an error.
 */
function generateKey() {
  try {
    const keyResponseFormat = 'JWT'; // Define the format for the key response
    const client = new cybersource.KeyGenerationApi(configObject, cybersourceClient);
    const generatePublicKeyRequestObj = new cybersource.GeneratePublicKeyRequest();

    generatePublicKeyRequestObj.encryptionType = 'RsaOaep256'; // Set the encryption type to RSA-OAEP-256
    generatePublicKeyRequestObj.targetOrigin = process.env.CYBERSOURCE_IFRAME_TARGET_ORIGIN; // Set the target origin for the key

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