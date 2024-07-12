import cybersource from 'cybersource-rest-client';
import { setLogLevel } from '@azure/logger';

export class Cybersource {
  private readonly _authenticationType: string;

  private readonly _merchantIdKey: string = 'CYBERSOURCE_MERCHANT_ID';
  private readonly _merchantId: string;

  private readonly _merchantKeyIdKey: string = 'CYBERSOURCE_MERCHANT_KEY_ID';
  private readonly _merchantKeyId: string;

  private readonly _merchantKeySecretKey: string = 'CYBERSOURCE_MERCHANT_KEY_SECRET';
  private readonly _merchantKeySecret: string;

  private readonly _runEnvironmentKey: string = 'CYBERSOURCE_RUN_ENVIRONMENT';
  private readonly _runEnvironment: string;

  private readonly _enableLogKey: string = 'CYBERSOURCE_ENABLE_LOG';
  private readonly _enableLog: boolean;

  private readonly _targetOriginKey: string = 'CYBERSOURCE_IFRAME_TARGET_ORIGIN';
  private readonly _targetOrigin: string;

  private _cybersourceClient: cybersource.ApiClient;
  private _configObject: cybersource.Configuration;

  private tryGetEnvVar(envVar: string): string {
    const value = process.env[envVar];
    if (value === undefined) {
      throw new Error(`Environment variable ${envVar} is not set`);
    }
    return value;
  }

  constructor() {
    try {
      setLogLevel('info');

      this._authenticationType = 'http_signature';
      this._merchantId = this.tryGetEnvVar(this._merchantIdKey);
      this._merchantKeyId = this.tryGetEnvVar(this._merchantKeyIdKey);
      this._merchantKeySecret = this.tryGetEnvVar(this._merchantKeySecretKey);
      this._runEnvironment = this.tryGetEnvVar(this._runEnvironmentKey);
      this._targetOrigin = this.tryGetEnvVar(this._targetOriginKey);
      this._enableLog = process.env[this._enableLogKey] === 'true';

      this._configObject = {
        authenticationType: this._authenticationType,
        runEnvironment: this._runEnvironment,
        merchantID: this._merchantId,
        merchantKeyId: this._merchantKeyId,
        merchantsecretKey: this._merchantKeySecret,
        logConfiguration: {
          enableLog: this._enableLog,
        },
      };

      this._cybersourceClient = new cybersource.ApiClient();
    } catch (error) {
      console.error('Error in Cybersource constructor: ', error);
    }
  }

  /**
   * Generate a public key for the Cybersource API
   *    - The key is used to encrypt the payment data
   *   - The key is generated using the Cybersource API
   * @returns {Promise<string>} - The key ID for the generated key
   * @throws {Error} - If there is an error in the generation of the key
   **/
  public async generateKey(): Promise<string> {
    try {
      const keyResponseFormat = 'JWT'; // Define the format for the key response

      const instance = new cybersource.KeyGenerationApi(this._configObject, this._cybersourceClient);
      const generatePublicKeyRequestObj = new cybersource.GeneratePublicKeyRequest();

      generatePublicKeyRequestObj.encryptionType = 'RsaOaep256'; // Set the encryption type to RSA-OAEP-256
      generatePublicKeyRequestObj.targetOrigin = this._targetOrigin; // Set the target origin for the key

      return new Promise((resolve, reject) => {
        instance.generatePublicKey(keyResponseFormat, generatePublicKeyRequestObj, function (error, data, response) {
          if (!error) {
            resolve(data.keyId);
          } else {
            reject(new Error(error));
          }
        });
      })
        .then((keyId: string) => {
          return keyId;
        })
        .catch((error) => {
          console.error('Error in generateKey: ', error);
          return error;
        });
    } catch (error) {
      console.error('Error in initialization of Cybersource: ', error);
      return error;
    }
  }
}
