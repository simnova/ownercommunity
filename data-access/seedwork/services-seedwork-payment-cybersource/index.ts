import cybersource from 'cybersource-rest-client';
import { setLogLevel } from '@azure/logger';
import { PaymentTransactionResponse, CustomerProfile, CybersourceBase, CustomerPaymentInstrumentsResponse, CustomerPaymentResponse, CustomerPaymentInstrumentResponse } from '../services-seedwork-payment-cybersource-interfaces';
import { randomUUID } from 'crypto';

export class Cybersource implements CybersourceBase {
  private readonly _authenticationType: string;

  private readonly _applicationNameKey: string = 'CYBERSOURCE_APP_NAME';
  private readonly _applicationName: string;

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

  /**
   * Constructor for the Cybersource class
   *  - Initializes the Cybersource API client
   * - Sets the configuration object for the Cybersource API
   * - Sets the log level for the Cybersource API
   * */
  constructor() {
    try {
      setLogLevel('info');

      this._authenticationType = 'http_signature';
      this._applicationName = this.tryGetEnvVar(this._applicationNameKey);
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
   *   - The key is used to encrypt the payment data
   *   - The key is generated using the Cybersource API
   * @returns {Promise<string>} - The key ID for the generated key
   * @throws {Error} - If there is an error in the generation of the key
   * full details: https://developer.cybersource.com/api-reference-assets/index.html#key-generation
   **/
  async generatePublicKey(): Promise<string> {
    try {
      const keyResponseFormat = 'JWT'; // Define the format for the key response

      const instance = new cybersource.KeyGenerationApi(this._configObject, this._cybersourceClient);
      const publicKeyGenerationRequest = new cybersource.GeneratePublicKeyRequest();

      publicKeyGenerationRequest.encryptionType = 'RsaOaep256'; // Set the encryption type to RSA-OAEP-256
      publicKeyGenerationRequest.targetOrigin = this._targetOrigin; // Set the target origin for the key

      return new Promise((resolve, reject) => {
        instance.generatePublicKey(keyResponseFormat, publicKeyGenerationRequest, function (error, data, response) {
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
          console.error('Error in generatePublicKey: ', error);
          return error;
        });
    } catch (error) {
      console.error('Error in initialization of Cybersource: ', error);
      return error;
    }
  }

  /**
   * Create a customer profile in the Cybersource API
   * @param customerProfile The customer profile to create
   * @param paymentToken The payment token to associate with the customer profile
   * @returns {Promise<PaymentTransactionResponse>} The response from the Cybersource API
   * @throws {Error} If there is an error in creating the customer profile
   * full details: https://developer.cybersource.com/api-reference-assets/index.html#payment
   */
  async createCustomerProfile(customerProfile: CustomerProfile, paymentToken: string): Promise<PaymentTransactionResponse> {
    try {
      const instance = new cybersource.PaymentsApi(this._configObject, this._cybersourceClient);
      
      // create a new ClientReferenceInformation object used for reconciliation purposes (search)
      let clientReferenceInformation = new cybersource.Ptsv2paymentsClientReferenceInformation();
      clientReferenceInformation.code = randomUUID();
      clientReferenceInformation.applicationName = this._applicationName;

      // create a new OrderInformationAmountDetails object
      let orderInformationAmountDetails = new cybersource.Ptsv2paymentsOrderInformationAmountDetails();
      orderInformationAmountDetails.totalAmount = '0'; // Zero amount for instrument identifier
      orderInformationAmountDetails.currency = 'USD';

      let orderInformationBillTo = new cybersource.Ptsv2paymentsOrderInformationBillTo();
      orderInformationBillTo.firstName = customerProfile.firstName;
      orderInformationBillTo.lastName = customerProfile.lastName;
      orderInformationBillTo.address1 = customerProfile.addressLine1;
      orderInformationBillTo.address2 = customerProfile.addressLine2;
      orderInformationBillTo.locality = customerProfile.city;
      orderInformationBillTo.administrativeArea = customerProfile.state;
      orderInformationBillTo.postalCode = customerProfile.postalCode;
      orderInformationBillTo.country = customerProfile.country;
      orderInformationBillTo.email = customerProfile.email;

      let orderInformation = new cybersource.Ptsv2paymentsOrderInformation();
      orderInformation.amountDetails = orderInformationAmountDetails;
      orderInformation.billTo = orderInformationBillTo;

      // create a new ProcessingInformation object
      let processingInformation = new cybersource.Ptsv2paymentsProcessingInformation();
      processingInformation.actionList = ['TOKEN_CREATE']; // Actions to create tokens
      processingInformation.actionTokenTypes = ['customer', 'paymentInstrument']; // Token types for the actions
      
      // create a new TokenInformation object
      let tokenInformationObj = new cybersource.Ptsv2paymentsTokenInformation();
      tokenInformationObj.transientTokenJwt = paymentToken;

      // create a new CreatePaymentRequest object
      let createPaymentRequest = new cybersource.CreatePaymentRequest();
      createPaymentRequest.clientReferenceInformation = clientReferenceInformation;
      createPaymentRequest.orderInformation = orderInformation;
      createPaymentRequest.processingInformation = processingInformation;
      createPaymentRequest.tokenInformation = tokenInformationObj;

      return new Promise((resolve, reject) => {
        instance.createPayment(createPaymentRequest, (error, data, response) => {
          if (!error) {
            resolve(data as PaymentTransactionResponse);
          } else {
            reject(new Error(error.message || 'Unknown error occurred'));
          }
        });
      });
    } catch (error) {
      console.error('Error in createCustomerProfile: ', error);
      return error;
    }
  }
  async getCustomerProfile(customerId: string): Promise<CustomerPaymentResponse> {
    try {
      let options = [];
      const instance = new cybersource.CustomerApi(this._configObject, this._cybersourceClient);
      return new Promise((resolve, reject) => {
        instance.getCustomer(customerId, options, function (error, data, response) {
          if (!error) {
            console.log('Data: ', JSON.stringify(data));
            resolve(data as CustomerPaymentResponse);
          } else {
            reject(new Error(error));
          }
        });
      })
        .then((customerProfile: string) => {
          return customerProfile;
        })
        .catch((error) => {
          console.error('Error in getCustomerProfile: ', error);
          return error;
        });
    }
    catch (error) {
      console.error('Error in getCustomerProfile: ', error);
      return error;
    }
  }
  async addCustomerPaymentInstrument(customerProfile: CustomerProfile, paymentToken: string): Promise<PaymentTransactionResponse> {
    try {
    const instance = new cybersource.PaymentsApi(this._configObject, this._cybersourceClient);

    // create a new PaymentReferenceInformation object used for reconciliation purposes (search)
    let paymentReferenceInformation = new cybersource.Ptsv2paymentsClientReferenceInformation();
    paymentReferenceInformation.code = randomUUID();
    paymentReferenceInformation.applicationName = this._applicationName;

    // create a new OrderInformation object
    let orderInformationAmountDetails = new cybersource.Ptsv2paymentsOrderInformationAmountDetails();
    orderInformationAmountDetails.totalAmount = '0'; // Zero amount for instrument identifier
    orderInformationAmountDetails.currency = 'USD';

    let orderInformationBillTo = new cybersource.Ptsv2paymentsOrderInformationBillTo();
    orderInformationBillTo.firstName = customerProfile.firstName;
    orderInformationBillTo.lastName = customerProfile.lastName;
    orderInformationBillTo.address1 = customerProfile.addressLine1;
    orderInformationBillTo.address2 = customerProfile.addressLine2;
    orderInformationBillTo.locality = customerProfile.city;
    orderInformationBillTo.administrativeArea = customerProfile.state;
    orderInformationBillTo.postalCode = customerProfile.postalCode;
    orderInformationBillTo.country = customerProfile.country;
    orderInformationBillTo.email = customerProfile.email;

    let orderInformation = new cybersource.Ptsv2paymentsOrderInformation();
    orderInformation.amountDetails = orderInformationAmountDetails;
    orderInformation.billTo = orderInformationBillTo;

    // create a new ProcessingInformation object
    let processingInformation = new cybersource.Ptsv2paymentsProcessingInformation();
    processingInformation.actionList = ['TOKEN_CREATE']; // Actions to create tokens
    processingInformation.actionTokenTypes = ['paymentInstrument']; // Token types for the actions

    // create a new TokenInformation object
    let tokenInformation = new cybersource.Ptsv2paymentsTokenInformation();
    tokenInformation.transientTokenJwt = paymentToken;

    // create a new PaymentInformation object
    let paymentInformation = new cybersource.Ptsv2paymentsPaymentInformation();
    let paymentInformationCustomer = new cybersource.Ptsv2paymentsPaymentInformationCustomer();
    paymentInformationCustomer.id = customerProfile.customerId;
    paymentInformation.customer = paymentInformationCustomer;

    // create a new CreatePaymentRequest object
    let createPaymentRequest = new cybersource.CreatePaymentRequest();
    createPaymentRequest.clientReferenceInformation = paymentReferenceInformation;
    createPaymentRequest.orderInformation = orderInformation;
    createPaymentRequest.processingInformation = processingInformation;
    createPaymentRequest.tokenInformation = tokenInformation;
    createPaymentRequest.paymentInformation = paymentInformation;

    return new Promise((resolve, reject) => {
      instance.createPayment(createPaymentRequest, (error, data, response) => {
        if (!error) {
          resolve(data as PaymentTransactionResponse);
        } else {
          reject(new Error(error.message || 'Unknown error occurred'));
        }
      });
    });
  } catch (error) {
    console.error('Error adding payment instrument: ', error);
    return error;
  }
  }
  async getCustomerPaymentInstrument(customerId: string, paymentInstrumentId: string): Promise<CustomerPaymentInstrumentResponse> {
    try {
      let options = [];
      const instance = new cybersource.CustomerPaymentInstrumentApi(this._configObject, this._cybersourceClient);
      return new Promise((resolve, reject) => {
        instance.getCustomerPaymentInstrument(customerId ,paymentInstrumentId, options, function (error, data, response) {
          if (!error) {
            console.log('Data: ', JSON.stringify(data));
            resolve(data as CustomerPaymentInstrumentResponse);
          } else {
            reject(new Error(error));
          }
        });
      })
        .then((customerPaymentInstrument: string) => {
          return customerPaymentInstrument;
        })
        .catch((error) => {
          console.error('Error in getCustomerPaymentInstrument: ', error);
          return error;
        });
    } catch (error) {
    console.error('Error in getCustomerPaymentInstrument: ', error);
    return error;
    }
  }
  async getCustomerPaymentInstruments(customerId: string): Promise<CustomerPaymentInstrumentsResponse> {
    try {
      let options = [];
      options['limit'] = 50; // Set the limit on the number of payment instruments returned in the response (optional, defaults to 20)
      const instance = new cybersource.CustomerPaymentInstrumentApi(this._configObject, this._cybersourceClient);
      return new Promise((resolve, reject) => {
        instance.getCustomerPaymentInstrumentsList(customerId, options, function (error, data, response) {
          if (!error) {
            console.log('Data: ', JSON.stringify(data));
            resolve(data as CustomerPaymentInstrumentsResponse);
          } else {
            reject(new Error(error.message || 'Unknown error occurred'));
          }
        });
      })
    }
    catch (error) {
      console.error('Error in getCustomerPaymentInstruments: ', error);
      return error;
    }
  }
  async deleteCustomerPaymentInstrument(customerId: string, paymentInstrumentId: string): Promise<boolean> {
    try {
      let options = [];
      const instance = new cybersource.CustomerPaymentInstrumentApi(this._configObject, this._cybersourceClient);
      return new Promise((resolve, reject) => {
        instance.deleteCustomerPaymentInstrument(customerId, paymentInstrumentId, options, function (error, data, response) {
          if (!error) {
            resolve(true);
          } else {
            reject(new Error(error));
          }
        });
      })
        .then((response: string) => {
          return response;
        })
        .catch((error) => {
          console.error('Error in deleteCustomerPaymentInstrument: ', error);
          return error;
        });
    } catch (error) {
    console.error('Error in deleteCustomerPaymentInstrument: ', error);
    return error;
  }
  }
  async setDefaultCustomerPaymentInstrument(customerId: string, paymentInstrumentId: string): Promise<CustomerPaymentResponse> {
    try {
      let options = [];
      const instance = new cybersource.CustomerApi(this._configObject, this._cybersourceClient);

      // default payment instrument
      let defaultPaymentInstrument = new cybersource.Tmsv2customersDefaultPaymentInstrument();
      defaultPaymentInstrument.id = paymentInstrumentId;

      var customerUpdateRequest = new cybersource.PatchCustomerRequest();
      customerUpdateRequest.defaultPaymentInstrument = defaultPaymentInstrument;

      return new Promise((resolve, reject) => {
        instance.patchCustomer(customerId, customerUpdateRequest, options, function (error, data, response) {
          if (!error) {
            console.log('Data: ', JSON.stringify(data));
            resolve(data as CustomerPaymentResponse);
          } else {
            reject(new Error(error));
          }
        });
      })
    } catch (error) {
    console.error('Error in setDefaultCustomerPaymentInstrument: ', error);
    return error;
    }
  }
  async processPayment(paymentInstrumentId: string, amount: number): Promise<PaymentTransactionResponse> {
    try {
      const instance = new cybersource.PaymentsApi(this._configObject, this._cybersourceClient);

      // create a new ClientReferenceInformation object used for reconciliation purposes (search)
      let clientReferenceInformation = new cybersource.Ptsv2paymentsClientReferenceInformation();
      clientReferenceInformation.code = randomUUID();
      clientReferenceInformation.applicationName = this._applicationName;

      // create a new OrderInformationAmountDetails object
      let orderInformationAmountDetails = new cybersource.Ptsv2paymentsOrderInformationAmountDetails();
      orderInformationAmountDetails.totalAmount = amount.toString();
      orderInformationAmountDetails.currency = 'USD';

      let orderInformation = new cybersource.Ptsv2paymentsOrderInformation();
      orderInformation.amountDetails = orderInformationAmountDetails;

      // create a new ProcessingInformation object
      let processingInformation = new cybersource.Ptsv2paymentsProcessingInformation();
      //processingInformation.actionList = ['AUTHORIZE']; // Actions to authorize payment
      processingInformation.capture = true; // Capture the payment

      // create a new PaymentInformation object
      let paymentInformation = new cybersource.Ptsv2paymentsPaymentInformation();
      let paymentInfoInstrument = new cybersource.Ptsv2paymentsPaymentInformationPaymentInstrument();
      paymentInfoInstrument.id = paymentInstrumentId;
      paymentInformation.paymentInstrument = paymentInfoInstrument;

      // create a new CreatePaymentRequest object
      let createPaymentRequest = new cybersource.CreatePaymentRequest();
      createPaymentRequest.clientReferenceInformation = clientReferenceInformation;
      createPaymentRequest.orderInformation = orderInformation;
      createPaymentRequest.processingInformation = processingInformation;
      createPaymentRequest.paymentInformation = paymentInformation;

      return new Promise((resolve, reject) => {
        instance.createPayment(createPaymentRequest, (error, data, response) => {
          if (!error) {
            resolve(data as PaymentTransactionResponse);
          } else {
            reject(new Error(error.message || 'Unknown error occurred'));
          }
        });
      });    
  } catch (error) {
    console.error('Error processing payment: ', error);
    return error;
  }
  }
  async refundPayment(paymentInstrumentId: string, amount: number): Promise<PaymentTransactionResponse> {
    try {
      const instance = new cybersource.PaymentsApi(this._configObject, this._cybersourceClient);

      // create a new ClientReferenceInformation object used for reconciliation purposes (search)
      let clientReferenceInformation = new cybersource.Ptsv2paymentsClientReferenceInformation();
      clientReferenceInformation.code = randomUUID();
      clientReferenceInformation.applicationName = this._applicationName;

      // create a new OrderInformationAmountDetails object
      let orderInformationAmountDetails = new cybersource.Ptsv2paymentsOrderInformationAmountDetails();
      orderInformationAmountDetails.totalAmount = amount.toString();
      orderInformationAmountDetails.currency = 'USD';

      let orderInformation = new cybersource.Ptsv2paymentsOrderInformation();
      orderInformation.amountDetails = orderInformationAmountDetails;

      // create a new ProcessingInformation object
      let processingInformation = new cybersource.Ptsv2paymentsProcessingInformation();
      processingInformation.actionList = ['REFUND']; // Actions to refund payment

      // create a new PaymentInformation object
      let paymentInformation = new cybersource.Ptsv2paymentsPaymentInformation();
      let paymentInfoInstrument = new cybersource.Ptsv2paymentsPaymentInformationPaymentInstrument();
      paymentInfoInstrument.id = paymentInstrumentId;
      paymentInformation.paymentInstrument = paymentInfoInstrument;

      // create a new CreatePaymentRequest object
      let createPaymentRequest = new cybersource.CreatePaymentRequest();
      createPaymentRequest.clientReferenceInformation = clientReferenceInformation;
      createPaymentRequest.orderInformation = orderInformation;
      createPaymentRequest.processingInformation = processingInformation;
      createPaymentRequest.paymentInformation = paymentInformation;

      return new Promise((resolve, reject) => {
        instance.createPayment(createPaymentRequest, (error, data, response) => {
          if (!error) {
            resolve(data as PaymentTransactionResponse);
          } else {
            reject(new Error(error.message || 'Unknown error occurred'));
          }
        });
      });
    } catch (error) {
    console.error('Error refunding payment: ', error);
    return error;    
    }
  }
  async voidPayment(paymentInstrumentId: string, amount: number): Promise<PaymentTransactionResponse> {
    try {
      const instance = new cybersource.PaymentsApi(this._configObject, this._cybersourceClient);

      // create a new ClientReferenceInformation object used for reconciliation purposes (search)
      let clientReferenceInformation = new cybersource.Ptsv2paymentsClientReferenceInformation();
      clientReferenceInformation.code = randomUUID();
      clientReferenceInformation.applicationName = this._applicationName;

      // create a new OrderInformationAmountDetails object
      let orderInformationAmountDetails = new cybersource.Ptsv2paymentsOrderInformationAmountDetails();
      orderInformationAmountDetails.totalAmount = amount.toString();
      orderInformationAmountDetails.currency = 'USD';

      let orderInformation = new cybersource.Ptsv2paymentsOrderInformation();
      orderInformation.amountDetails = orderInformationAmountDetails;

      // create a new ProcessingInformation object
      let processingInformation = new cybersource.Ptsv2paymentsProcessingInformation();
      processingInformation.actionList = ['VOID']; // Actions to void payment

      // create a new PaymentInformation object
      let paymentInformation = new cybersource.Ptsv2paymentsPaymentInformation();
      let paymentInfoInstrument = new cybersource.Ptsv2paymentsPaymentInformationPaymentInstrument();
      paymentInfoInstrument.id = paymentInstrumentId;
      paymentInformation.paymentInstrument = paymentInfoInstrument;

      // create a new CreatePaymentRequest object
      let createPaymentRequest = new cybersource.CreatePaymentRequest();
      createPaymentRequest.clientReferenceInformation = clientReferenceInformation;
      createPaymentRequest.orderInformation = orderInformation;
      createPaymentRequest.processingInformation = processingInformation;
      createPaymentRequest.paymentInformation = paymentInformation;

      return new Promise((resolve, reject) => {
        instance.createPayment(createPaymentRequest, (error, data, response) => {
          if (!error) {
            resolve(data as PaymentTransactionResponse);
          } else {
            reject(new Error(error.message || 'Unknown error occurred'));
          }
        });
      });
    } catch (error) {
    console.error('Error voiding payment: ', error);
    return error;
    }
  }  
}
