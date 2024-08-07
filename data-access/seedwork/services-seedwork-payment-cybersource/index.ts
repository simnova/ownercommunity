import cybersource from 'cybersource-rest-client';
import { setLogLevel } from '@azure/logger';
import { randomUUID } from 'crypto';
import {
  PaymentTransactionResponse,
  CustomerProfile,
  CybersourceBase,
  CustomerPaymentInstrumentsResponse,
  CustomerPaymentResponse,
  CustomerPaymentInstrumentResponse,
  RefundPaymentResponse,
  PaymentTokenInfo,
  PaymentInstrumentInfo,
  TransactionSearchResponse,
} from '../services-seedwork-payment-cybersource-interfaces';

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
   * @returns {Promise<string>} The public key generated by the Cybersource API
   * @throws {Error} If an error occurs in generating the public key
   * full details: https://developer.cybersource.com/docs/barclays/en-us/digital-accept-flex/developer/all/rest/digital-accept-flex/microform-integ-v2/microform-integ-getting-started-v2.html
   * */
  async generatePublicKey(): Promise<string> {
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
          reject(new Error(error.message || 'Unknown error occurred in generating public key'));
        }
      });
    });
  }

  /**
   * Create a customer using the Cybersource API
   * - Creates customer profile and links the customer's payment information with customer profile
   * @param {CustomerProfile} customerProfile The customer profile to be used for the customer profile
   * @param {PaymentTokenInfo} paymentTokenInfo The payment token to be used for the customer profile
   * @returns {Promise<PaymentTransactionResponse>} The response from the Cybersource API
   * @throws {Error} If an error occurs in creating the customer profile
   * full details: https://developer.cybersource.com/api-reference-assets/index.html#payments
   * */
  async createCustomerProfile(customerProfile: CustomerProfile, paymentTokenInfo: PaymentTokenInfo): Promise<PaymentTransactionResponse> {
    const instance = new cybersource.PaymentsApi(this._configObject, this._cybersourceClient);

    // create a new ClientReferenceInformation object used for reconciliation purposes (search)
    const clientReferenceCode = randomUUID();
    let clientReferenceInformation = new cybersource.Ptsv2paymentsClientReferenceInformation();
    clientReferenceInformation.code = clientReferenceCode;
    clientReferenceInformation.applicationName = this._applicationName;

    // create a new OrderInformationAmountDetails object
    let orderInformationAmountDetails = new cybersource.Ptsv2paymentsOrderInformationAmountDetails();
    orderInformationAmountDetails.totalAmount = '0'; // Zero amount for instrument identifier
    orderInformationAmountDetails.currency = 'USD';

    let orderInformationBillTo = new cybersource.Ptsv2paymentsOrderInformationBillTo();
    orderInformationBillTo.firstName = customerProfile.billingFirstName;
    orderInformationBillTo.lastName = customerProfile.billingLastName;
    orderInformationBillTo.address1 = customerProfile.billingAddressLine1;
    orderInformationBillTo.address2 = customerProfile.billingAddressLine2;
    orderInformationBillTo.locality = customerProfile.billingCity;
    orderInformationBillTo.administrativeArea = customerProfile.billingState;
    orderInformationBillTo.postalCode = customerProfile.billingPostalCode;
    orderInformationBillTo.country = customerProfile.billingCountry;
    orderInformationBillTo.email = customerProfile.billingEmail;
    orderInformationBillTo.phoneNumber = customerProfile.billingPhone ?? '';

    let orderInformation = new cybersource.Ptsv2paymentsOrderInformation();
    orderInformation.amountDetails = orderInformationAmountDetails;
    orderInformation.billTo = orderInformationBillTo;

    // create a new ProcessingInformation object
    let processingInformation = new cybersource.Ptsv2paymentsProcessingInformation();
    processingInformation.actionList = ['TOKEN_CREATE']; // Actions to create tokens
    processingInformation.actionTokenTypes = ['customer', 'paymentInstrument']; // Token types for the actions

    // create a new TokenInformation object
    let tokenInformationObj = new cybersource.Ptsv2paymentsTokenInformation();

    // create a new PaymentInformation object
    tokenInformationObj.paymentInstrument = new cybersource.Ptsv2paymentsTokenInformationPaymentInstrument();

    // Ensure paymentTokenInfo and its properties are not null or undefined
    if (paymentTokenInfo?.paymentToken && typeof paymentTokenInfo?.isDefault !== 'undefined') {
      tokenInformationObj.transientTokenJwt = paymentTokenInfo.paymentToken;
      tokenInformationObj.paymentInstrument.default = paymentTokenInfo.isDefault; // Set the default payment instrument
    } else {
      // Handle the case where paymentTokenInfo or its properties are null or undefined
      console.error('Error: paymentTokenInfo or its required properties are null or undefined');
      throw new Error('paymentTokenInfo or its required properties are null or undefined');
    }

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
          reject(new Error(error.message || 'Unknown error occurred in creating customer profile'));
        }
      });
    });
  }

  /**
   * Get a customer profile from the Cybersource API
   * @param {string} customerId The customer ID to be used for the customer profile
   * @returns {Promise<CustomerPaymentResponse>} The response from the Cybersource API
   * @throws {Error} If an error occurs in getting the customer profile
   * full details: https://developer.cybersource.com/api-reference-assets/index.html#token-management_customer_retrieve-a-customer
   * */
  async getCustomerProfile(customerId: string): Promise<CustomerPaymentResponse> {
    let options = [];
    const instance = new cybersource.CustomerApi(this._configObject, this._cybersourceClient);
    return new Promise((resolve, reject) => {
      instance.getCustomer(customerId, options, function (error, data, response) {
        if (!error) {
          resolve(data as CustomerPaymentResponse);
        } else {
          reject(new Error(error.message || 'Unknown error occurred in getting customer profile'));
        }
      });
    });
  }

  /**
   * Add a customer payment instrument in the Cybersource API
   * @param {CustomerProfile} customerProfile The customer profile to be used for the payment instrument
   * @param {PaymentTokenInfo} paymentTokenInfo The payment token to be used for the payment instrument
   * @returns {Promise<PaymentTransactionResponse>} The response from the Cybersource API
   * @throws {Error} If an error occurs in adding the customer payment instrument
   * full details: https://developer.cybersource.com/api-reference-assets/index.html#token-management_customer-payment-instrument_create-a-customer-payment-instrument
   * */
  async addCustomerPaymentInstrument(customerProfile: CustomerProfile, paymentTokenInfo: PaymentTokenInfo): Promise<PaymentTransactionResponse> {
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
    orderInformationBillTo.firstName = customerProfile.billingFirstName;
    orderInformationBillTo.lastName = customerProfile.billingLastName;
    orderInformationBillTo.address1 = customerProfile.billingAddressLine1;
    orderInformationBillTo.address2 = customerProfile.billingAddressLine2;
    orderInformationBillTo.locality = customerProfile.billingCity;
    orderInformationBillTo.administrativeArea = customerProfile.billingState;
    orderInformationBillTo.postalCode = customerProfile.billingPostalCode;
    orderInformationBillTo.country = customerProfile.billingCountry;
    orderInformationBillTo.email = customerProfile.billingEmail;
    orderInformationBillTo.phoneNumber = customerProfile.billingPhone ?? '';

    let orderInformation = new cybersource.Ptsv2paymentsOrderInformation();
    orderInformation.amountDetails = orderInformationAmountDetails;
    orderInformation.billTo = orderInformationBillTo;

    // create a new ProcessingInformation object
    let processingInformation = new cybersource.Ptsv2paymentsProcessingInformation();
    processingInformation.actionList = ['TOKEN_CREATE']; // Actions to create tokens
    processingInformation.actionTokenTypes = ['paymentInstrument']; // Token types for the actions

    // create a new TokenInformation object
    let tokenInformation = new cybersource.Ptsv2paymentsTokenInformation();

    // create a new PaymentInformation object
    tokenInformation.paymentInstrument = new cybersource.Ptsv2paymentsTokenInformationPaymentInstrument();

    // Ensure paymentTokenInfo and its properties are not null or undefined
    if (paymentTokenInfo?.paymentToken && typeof paymentTokenInfo?.isDefault !== 'undefined') {
      tokenInformation.transientTokenJwt = paymentTokenInfo.paymentToken;
      tokenInformation.paymentInstrument.default = paymentTokenInfo.isDefault; // Set the default payment instrument
    } else {
      // Handle the case where paymentTokenInfo or its properties are null or undefined
      throw new Error('paymentTokenInfo or its required properties are null or undefined');
    }

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
          reject(new Error(error.message || 'Unknown error occurred in adding customer payment instrument'));
        }
      });
    });
  }

  /**
   * Get a customer payment instrument from the Cybersource API
   * @param {string} customerId The customer ID to be used for the payment instrument
   * @param {string} paymentInstrumentId The payment instrument ID to be used for the payment instrument
   * @returns {Promise<CustomerPaymentInstrumentResponse>} The response from the Cybersource API
   * @throws {Error} If an error occurs in getting the customer payment instrument
   * full details: https://developer.cybersource.com/api-reference-assets/index.html#token-management_customer-payment-instrument_retrieve-a-customer-payment-instrument
   * */
  async getCustomerPaymentInstrument(customerId: string, paymentInstrumentId: string): Promise<CustomerPaymentInstrumentResponse> {
    let options = [];
    const instance = new cybersource.CustomerPaymentInstrumentApi(this._configObject, this._cybersourceClient);
    return new Promise((resolve, reject) => {
      instance.getCustomerPaymentInstrument(customerId, paymentInstrumentId, options, function (error, data, response) {
        if (!error) {
          resolve(data as CustomerPaymentInstrumentResponse);
        } else {
          reject(new Error(error.message || 'Unknown error occurred in getting customer payment instrument'));
        }
      });
    });
  }

  /**
   * Get customer payment instruments from the Cybersource API
   * @param {string} customerId The customer ID to be used for the payment instruments
   * @param {number} offset The offset for the payment instruments returned in the response (optional, defaults to 0)
   * @param {number} limit The limit on the number of payment instruments returned in the response (optional, defaults to 20)
   * @returns {Promise<CustomerPaymentInstrumentsResponse>} The response from the Cybersource API
   * @throws {Error} If an error occurs in getting the customer payment instruments
   * full details: https://developer.cybersource.com/api-reference-assets/index.html#token-management_customer-payment-instrument_list-payment-instruments-for-a-customer
   * */
  async getCustomerPaymentInstruments(customerId: string, offset?: number, limit?: number): Promise<CustomerPaymentInstrumentsResponse> {
    let options: { [key: string]: any } = {};

    options['offset'] = offset; // offset for the payment instruments returned in the response (optional, defaults to 0)
    options['limit'] = limit; // limit on the number of payment instruments returned in the response (optional, defaults to 20)
    const instance = new cybersource.CustomerPaymentInstrumentApi(this._configObject, this._cybersourceClient);
    return new Promise((resolve, reject) => {
      instance.getCustomerPaymentInstrumentsList(customerId, options, function (error, data, response) {
        if (!error) {
          resolve(data as CustomerPaymentInstrumentsResponse);
        } else {
          reject(new Error(error.message || 'Unknown error occurred in getting customer payment instruments'));
        }
      });
    });
  }

  /**
   * Delete a customer payment instrument from the Cybersource API
   * @param {string} customerId The customer ID to be used for the payment instrument
   * @param {string} paymentInstrumentId The payment instrument ID to be used for the payment instrument
   * @returns {Promise<boolean>} The response from the Cybersource API
   * @throws {Error} If an error occurs in deleting the customer payment instrument
   * full details: https://developer.cybersource.com/api-reference-assets/index.html#token-management_customer-payment-instrument_delete-a-customer-payment-instrument
   * */
  async deleteCustomerPaymentInstrument(customerId: string, paymentInstrumentId: string): Promise<boolean> {
    let options: { [key: string]: any } = {};
    const instance = new cybersource.CustomerPaymentInstrumentApi(this._configObject, this._cybersourceClient);
    return new Promise((resolve, reject) => {
      instance.deleteCustomerPaymentInstrument(customerId, paymentInstrumentId, options, function (error, data, response) {
        if (!error) {
          resolve(true);
        } else {
          const errors = error?.response?.body?.errors.map((error) => error.message).join(', ');
          reject(new Error(errors || 'Unknown error occurred in deleting customer payment instrument'));
        }
      });
    });
  }

  /**
   * Set a default customer payment instrument in the Cybersource API
   * @param {string} customerId The customer ID to be used for the payment instrument
   * @param {string} paymentInstrumentId The payment instrument ID to be used for the payment instrument
   * @returns {Promise<CustomerPaymentResponse>} The response from the Cybersource API
   * @throws {Error} If an error occurs in setting the default customer payment instrument
   * full details: https://developer.cybersource.com/api-reference-assets/index.html#token-management_customer-payment-instrument_update-a-customer-payment-instrument
   * */
  async setDefaultCustomerPaymentInstrument(customerId: string, paymentInstrumentId: string): Promise<CustomerPaymentResponse> {
    let options: { [key: string]: any } = {};
    const instance = new cybersource.CustomerApi(this._configObject, this._cybersourceClient);

    // default payment instrument
    let defaultPaymentInstrument = new cybersource.Tmsv2customersDefaultPaymentInstrument();
    defaultPaymentInstrument.id = paymentInstrumentId;

    let customerUpdateRequest = new cybersource.PatchCustomerRequest();
    customerUpdateRequest.defaultPaymentInstrument = defaultPaymentInstrument;

    return new Promise((resolve, reject) => {
      instance.patchCustomer(customerId, customerUpdateRequest, options, function (error, data, response) {
        if (!error) {
          resolve(data as CustomerPaymentResponse);
        } else {
          reject(new Error(error.message || 'Unknown error occurred in setting default customer payment instrument'));
        }
      });
    });
  }

  /**
   * Update a customer payment instrument in the Cybersource API
   * @param {CustomerProfile} customerProfile The customer profile to be used for the payment instrument
   * @param {PaymentInstrumentInfo} paymentInstrumentInfo The payment instrument information to be used for the payment instrument
   * @returns {Promise<CustomerPaymentInstrumentResponse>} The response from the Cybersource API
   * @throws {Error} If an error occurs in updating the customer payment instrument
   * full details: https://developer.cybersource.com/api-reference-assets/index.html#token-management_customer-payment-instrument_update-a-customer-payment-instrument
   * */
  async updateCustomerPaymentInstrument(customerProfile: CustomerProfile, paymentInstrumentInfo: PaymentInstrumentInfo): Promise<CustomerPaymentInstrumentResponse> {
    let options: { [key: string]: any } = {};
    const instance = new cybersource.PaymentInstrumentApi(this._configObject, this._cybersourceClient);

    let patchCustomerPaymentInstrumentRequest = new cybersource.PatchPaymentInstrumentRequest();

    // create a card object
    const card = new cybersource.Tmsv2customersEmbeddedDefaultPaymentInstrumentCard();
    card.expirationMonth = paymentInstrumentInfo.cardExpirationMonth;
    card.expirationYear = paymentInstrumentInfo.cardExpirationYear;
    card.type = paymentInstrumentInfo.cardType;
    patchCustomerPaymentInstrumentRequest.card = card;

    // create a billTo object
    const billTo = new cybersource.Tmsv2customersEmbeddedDefaultPaymentInstrumentBillTo();
    billTo.firstName = customerProfile.billingFirstName;
    billTo.lastName = customerProfile.billingLastName;
    billTo.email = customerProfile.billingEmail;
    billTo.phoneNumber = customerProfile.billingPhone;
    billTo.address1 = customerProfile.billingAddressLine1;
    billTo.address2 = customerProfile.billingAddressLine2;
    billTo.locality = customerProfile.billingCity;
    billTo.administrativeArea = customerProfile.billingState;
    billTo.postalCode = customerProfile.billingPostalCode;
    billTo.country = customerProfile.billingCountry;
    patchCustomerPaymentInstrumentRequest.billTo = billTo;

    // create an instrumentIdentifier object
    const paymentInstrumentIdentifier = new cybersource.Tmsv2customersEmbeddedDefaultPaymentInstrumentInstrumentIdentifier();
    paymentInstrumentIdentifier.id = paymentInstrumentInfo.id;
    patchCustomerPaymentInstrumentRequest.instrumentIdentifier = paymentInstrumentIdentifier;

    return new Promise((resolve, reject) => {
      instance.patchPaymentInstrument(paymentInstrumentInfo.paymentInstrumentId, patchCustomerPaymentInstrumentRequest, options, function (error, data, response) {
        if (!error) {
          resolve(data as CustomerPaymentInstrumentResponse);
        } else {
          reject(new Error(error.message || 'Unknown error occurred in updating customer payment instrument'));
        }
      });
    });
  }

  /**
   * Process a payment in the Cybersource API
   * @param {string} clientReferenceCode The client reference code to be used for the payment
   * @param {string} paymentInstrumentId The payment instrument ID to be used for the payment
   * @param {number} amount The amount to be used for the payment
   * @returns {Promise<PaymentTransactionResponse>} The response from the Cybersource API
   * @throws {Error} If an error occurs in processing the payment
   * full details: https://developer.cybersource.com/api-reference-assets/index.html#payments_payments_process-a-payment
   * */
  async processPayment(clientReferenceCode: string, paymentInstrumentId: string, amount: number): Promise<PaymentTransactionResponse> {
    const instance = new cybersource.PaymentsApi(this._configObject, this._cybersourceClient);

    // create a new ClientReferenceInformation object used for reconciliation purposes (search)
    let clientReferenceInformation = new cybersource.Ptsv2paymentsClientReferenceInformation();
    clientReferenceInformation.code = clientReferenceCode;
    clientReferenceInformation.applicationName = this._applicationName;

    // create a new OrderInformationAmountDetails object
    let orderInformationAmountDetails = new cybersource.Ptsv2paymentsOrderInformationAmountDetails();
    orderInformationAmountDetails.totalAmount = amount.toString();
    orderInformationAmountDetails.currency = 'USD';

    let orderInformation = new cybersource.Ptsv2paymentsOrderInformation();
    orderInformation.amountDetails = orderInformationAmountDetails;

    // create a new ProcessingInformation object
    let processingInformation = new cybersource.Ptsv2paymentsProcessingInformation();
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
          reject(new Error(error.message || 'Unknown error occurred in processing payment'));
        }
      });
    });
  }

  /**
   * Refund a payment in the Cybersource API
   * @param {string} transactionId The transaction ID received from the original payment
   * @param {number} amount The amount to be used for the refund
   * @returns {Promise<RefundPaymentResponse>} The response from the Cybersource API
   * @throws {Error} If an error occurs in refunding the payment
   * full details: https://developer.cybersource.com/api-reference-assets/index.html#payments_refund_refund-a-capture
   * */
  async refundPayment(transactionId: string, amount: number): Promise<RefundPaymentResponse> {
    const instance = new cybersource.RefundApi(this._configObject, this._cybersourceClient);

    // create a new OrderInformationAmountDetails object
    let orderInformationAmountDetails = new cybersource.Ptsv2paymentsOrderInformationAmountDetails();
    orderInformationAmountDetails.totalAmount = amount.toString();
    orderInformationAmountDetails.currency = 'USD';

    let orderInformation = new cybersource.Ptsv2paymentsOrderInformation();
    orderInformation.amountDetails = orderInformationAmountDetails;

    // create a new ProcessingInformation object
    let processingInformation = new cybersource.Ptsv2paymentsProcessingInformation();
    processingInformation.capture = true; // Capture the payment

    // create a new RefundCaptureRequest object
    let refundCaptureRequest = new cybersource.RefundCaptureRequest();
    refundCaptureRequest.reason = 'Refund';
    refundCaptureRequest.orderInformation = orderInformation;
    refundCaptureRequest.processingInformation = processingInformation;

    return new Promise((resolve, reject) => {
      instance.refundCapture(refundCaptureRequest, transactionId, (error, data, response) => {
        if (!error) {
          resolve(data as RefundPaymentResponse);
        } else {
          reject(new Error(error.message || 'Unknown error occurred in refunding payment'));
        }
      });
    });
  }

  /**
   * Void a payment in the Cybersource API
   * @param {string} clientReferenceCode The client reference code used for the original payment
   * @param {string} transactionId The transaction ID received from the original payment
   * @returns {Promise<PaymentTransactionResponse>} The response from the Cybersource API
   * @throws {Error} If an error occurs in voiding the payment
   * full details: https://developer.cybersource.com/api-reference-assets/index.html#payments_void_void-a-capture
   * */
  async voidPayment(clientReferenceCode: string, transactionId: string): Promise<PaymentTransactionResponse> {
    const instance = new cybersource.VoidApi(this._configObject, this._cybersourceClient);

    // create a new ClientReferenceInformation object used for reconciliation purposes (search)
    let clientReferenceInformation = new cybersource.Ptsv2paymentsClientReferenceInformation();
    clientReferenceInformation.code = clientReferenceCode;
    clientReferenceInformation.applicationName = this._applicationName;

    // create a new VoidCaptureRequest object
    let voidCaptureRequest = new cybersource.VoidCaptureRequest();
    voidCaptureRequest.clientReferenceInformation = clientReferenceInformation;

    return new Promise((resolve, reject) => {
      instance.voidCapture(voidCaptureRequest, transactionId, (error, data, response) => {
        if (!error) {
          resolve(data as PaymentTransactionResponse);
        } else {
          reject(new Error(error.message || 'Unknown error occurred in voiding payment'));
        }
      });
    });
  }

  /**
   * Search for transactions in the Cybersource API
   * @param {string} clientReferenceCode The client reference code to be used for the search
   * @returns {Promise<TransactionSearchResponse>} The response from the Cybersource API
   * @throws {Error} If an error occurs in searching for transactions
   * full details: https://developer.cybersource.com/api-reference-assets/index.html#transaction-search_search-transactions_create-a-search-request
   * */
  async searchTransactions(clientReferenceCode: string): Promise<TransactionSearchResponse> {
    const instance = new cybersource.SearchTransactionsApi(this._configObject, this._cybersourceClient);

    let searchRequest = new cybersource.CreateSearchRequest();
    searchRequest.query = `clientReferenceInformation.code:${clientReferenceCode}`;
    searchRequest.offset = 0;
    searchRequest.limit = 2000;
    searchRequest.sort = 'id:asc,submitTimeUtc:desc';
    searchRequest.save = false;

    return new Promise((resolve, reject) => {
      instance.createSearch(searchRequest, (error, data, response) => {
        if (!error) {
          resolve(data as TransactionSearchResponse);
        } else {
          reject(new Error(error.message || 'Unknown error occurred in searching transactions'));
        }
      });
    });
  }
}
