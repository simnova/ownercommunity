import cybersource from 'cybersource-rest-client';
import { randomUUID } from 'crypto';

interface AddCustomerPaymentInstrumentResponse {
  _links: {
    self: {
      href: string,
      method: string
    },
    capture: {
      href: string,
      method: string
    }
  },
  id: string,
  submitTimeUtc: string, // '2024-07-10T14:18:29Z'
  status: string, // 'AUTHORIZED
  reconciliationId: string,
  clientReferenceInformation: { code: string },
  processorInformation: {
    approvalCode: string,
    responseCode: string, // '100' = 'Successful transaction'
    avs: {
      code: string,
      codeRaw: string
    },
    cardVerification: {
      resultCode: string
    },
    paymentAccountReferenceNumber: string
  },
  paymentAccountInformation: {
    card: { type: string } // type: 001 = 'Visa', 002 = 'Master Card', 003 = 'American Express'
  },
  paymentInformation: {
    card: { type: string },
    tokenizedCard: { type: string },
    accountFeatures: { balanceAmount: string },
    customer: { id: string }
  },
  orderInformation: {
    amountDetails: {
      authorizedAmount: string,
      currency: string
    }
  },
  pointOfSaleInformation: { terminalId: string },
  tokenInformation: {
    instrumentidentifierNew: boolean,
    paymentInstrument: { id: string },
    instrumentIdentifier: {
      id: string,
      state: string // 'ACTIVE'
    }
  }
}

interface DataResponse {
  
}

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
 * Adds a payment instrument for a customer using the Cybersource Payments API.
 * 
 * This function constructs various information objects required by the Cybersource API,
 * such as client reference information, order information, processing information, token information,
 * and payment information. It then creates a payment request object and calls the Cybersource API
 * to add the payment instrument.
 * 
 * @param {any} body - The request body containing customer details, payment token, and customer ID.
 * @returns {Promise<AddCustomerPaymentInstrumentResponse>} A promise that resolves to the response of the payment instrument addition, or rejects with an error.
 */
async function addCustomerPaymentInstrument(body: any) {
  try {
    const client = new cybersource.PaymentsApi(configObject, cybersourceClient);

    //====== ClientReferenceInformation ====== Used for reconciliation purposes (search)
    let clientReferenceInformation = new cybersource.Ptsv2paymentsClientReferenceInformation();
    clientReferenceInformation.code = randomUUID();
    clientReferenceInformation.applicationName = 'owner-community';
    //====== ClientReferenceInformation ======

    //====== OrderInformation ======
    let orderInformationAmountDetails = new cybersource.Ptsv2paymentsOrderInformationAmountDetails();
    orderInformationAmountDetails.totalAmount = '0'; // Zero amount for instrument identifier authorization
    orderInformationAmountDetails.currency = 'USD';

    let orderInformationBillTo = new cybersource.Ptsv2paymentsOrderInformationBillTo();
    orderInformationBillTo.firstName = body.firstName;
    orderInformationBillTo.lastName = body.lastName;
    orderInformationBillTo.address1 = body.address;
    orderInformationBillTo.locality = body.city;
    orderInformationBillTo.administrativeArea = body.state;
    orderInformationBillTo.postalCode = body.postalCode;
    orderInformationBillTo.country = body.country;
    orderInformationBillTo.email = body.email;

    let orderInformation = new cybersource.Ptsv2paymentsOrderInformation();
    orderInformation.amountDetails = orderInformationAmountDetails;
    orderInformation.billTo = orderInformationBillTo;
    //====== OrderInformation ======

    //====== ProcessingInformation ======
    let processingInformation = new cybersource.Ptsv2paymentsProcessingInformation();
    processingInformation.actionList = ['TOKEN_CREATE']; // Action to create a token
    processingInformation.actionTokenTypes = ['paymentInstrument']; // Token type for the action
    //====== ProcessingInformation ======

    //====== TokenInformation ======
    let tokenInformationObj = new cybersource.Ptsv2paymentsTokenInformation();
    tokenInformationObj.transientTokenJwt = body.paymentToken;
    //====== TokenInformation ======

    //====== PaymentInformation ======
    let paymentInformation = new cybersource.Ptsv2paymentsPaymentInformation();
		let paymentInformationCustomer = new cybersource.Ptsv2paymentsPaymentInformationCustomer();
    paymentInformationCustomer.id = body.customerId;
    paymentInformation.customer = paymentInformationCustomer;
    //====== PaymentInformation ======

    // create a new CreatePaymentRequest object
    let createPaymentRequestObj = new cybersource.CreatePaymentRequest();
    createPaymentRequestObj.clientReferenceInformation = clientReferenceInformation;
    createPaymentRequestObj.orderInformation = orderInformation;
    createPaymentRequestObj.processingInformation = processingInformation;
    createPaymentRequestObj.tokenInformation = tokenInformationObj;
    createPaymentRequestObj.paymentInformation = paymentInformation;

    return new Promise((resolve, reject) => {
      client.createPayment(createPaymentRequestObj, (error, data, response) => {
        if (!error) {
          resolve(data as AddCustomerPaymentInstrumentResponse);
        } else {
          reject(new Error(error.message || 'Unknown error occurred'));
        }
      });
    });
  } catch (error) {
    return {
      status: 500,
      body: `Error adding payment instrument: ${error.message}`
    }
  }
}

export default addCustomerPaymentInstrument;