import cybersource from 'cybersource-rest-client';
import { randomUUID } from 'crypto';

interface ProcessPaymentWithPaymentInstrumentResponse {
  _links: {
    self: {
      href: string;
      method: string;
    }
  },
  id: string,
  submitTimeUtc: string,
  status: string, // 'AUTHORIZED'
  reconciliationId: string,
  clientReferenceInformation: { code: string },
  processorInformation: {
    approvalCode: string,
    transactionId: string,
    networkTransactionId: string,
    responseCode: string, // '100' = 'Successful transaction'
    avs: { code: string, codeRaw: string }
  },
  paymentAccountInformation: { card: { type: string } }, // type: '001', '002', etc.
  paymentInformation: {
    card: { type: string },
    tokenizedCard: { type: string },
    paymentInstrument: { id: string },
    instrumentIdentifier: { id: string, state: string } // state: 'ACTIVE'
  },
  orderInformation: {
    amountDetails: {
      totalAmount: string,
      authorizedAmount: string,
      currency: string
    }
  },
  pointOfSaleInformation: { terminalId: string }
}

const configObject = {
  authenticationType: 'http_signature',
  runEnvironment: 'apitest.cybersource.com',
  merchantID: 'ecfmg_faimer',
  merchantKeyId: '2adee370-c670-4d76-a64a-ec2a5319d008',
  merchantsecretKey: process.env.CYBERSOURCE_MERCHANT_SECRET_KEY,
  logConfiguration: {
    enableLog: false,
  }
};

const cybersourceClient = new cybersource.ApiClient();

/**
 * Processes a payment using a specified payment instrument with the Cybersource Payments API.
 * 
 * This function constructs various information objects required by the Cybersource API,
 * such as client reference information, order information, processing information, and payment information.
 * It then creates a payment request object and calls the Cybersource API to process the payment.
 * 
 * @param {any} body - The request body containing payment instrument ID and other payment details.
 * @returns {Promise<ProcessPaymentWithPaymentInstrumentResponse>} A promise that resolves to the response of the payment processing, or rejects with an error.
 */
function processPaymentWithPaymentInstrument(body: any) {
  try {
    const client = new cybersource.PaymentsApi(configObject, cybersourceClient);

    //====== ClientReferenceInformation ====== Used for reconciliation purposes (search)
    let clientReferenceInformation = new cybersource.Ptsv2paymentsClientReferenceInformation();
    clientReferenceInformation.code = randomUUID();
    clientReferenceInformation.applicationName = 'owner-community';
    //====== ClientReferenceInformation ======

    //====== OrderInformation ======
    let orderInformationAmountDetails = new cybersource.Ptsv2paymentsOrderInformationAmountDetails();
    orderInformationAmountDetails.totalAmount = '900'; // Amount should come from service ticket fee 
    orderInformationAmountDetails.currency = 'USD';

    let orderInformation = new cybersource.Ptsv2paymentsOrderInformation();
    orderInformation.amountDetails = orderInformationAmountDetails;
    //====== OrderInformation ======

    //====== ProcessingInformation ======
    let processingInformation = new cybersource.Ptsv2paymentsProcessingInformation();
    processingInformation.capture = true; // Set to true so that the payment does not remain in the "PENDING" state
    //====== ProcessingInformation ======

    //====== PaymentInformation ======
    let paymentInformation = new cybersource.Ptsv2paymentsPaymentInformation();
    let paymentInformationPaymentInstrumentObj = new cybersource.Ptsv2paymentsPaymentInformationPaymentInstrument();
    paymentInformationPaymentInstrumentObj.id = body.paymentInstrumentId;
    paymentInformation.paymentInstrument = paymentInformationPaymentInstrumentObj;
    //====== PaymentInformation ======

    // create a new CreatePaymentRequest object
    let createPaymentRequestObj = new cybersource.CreatePaymentRequest();
    createPaymentRequestObj.clientReferenceInformation = clientReferenceInformation;
    createPaymentRequestObj.orderInformation = orderInformation;
    createPaymentRequestObj.processingInformation = processingInformation;
    createPaymentRequestObj.paymentInformation = paymentInformation;

    return new Promise((resolve, reject) => {
      client.createPayment(createPaymentRequestObj, (error, data, response) => {
        if (!error) {
          resolve(data as ProcessPaymentWithPaymentInstrumentResponse);
        } else {
          reject(new Error(error.message || 'Unknown error occurred'));
        }
      });
    })
  } catch (error) {
    return {
      status: 500,
      body: `Error creating instrument identifier: ${error.message}`
    }
  }
}

export default processPaymentWithPaymentInstrument;