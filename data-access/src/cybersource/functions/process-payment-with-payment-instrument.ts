import cybersource from 'cybersource-rest-client';

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
  merchantsecretKey: 's3c1EtcQkSpCAMem1l7dTHJU2z1DJm6Ce97yxmVkc6U=',
  logConfiguration: {
    enableLog: false,
  }
};

const cybersourceClient = new cybersource.ApiClient();

function processPaymentWithPaymentInstrument(body: any) {
  try {
    const client = new cybersource.PaymentsApi(configObject, cybersourceClient);

    //====== ClientReferenceInformation ====== Used for reconciliation purposes (search)
    let clientReferenceInformation = new cybersource.Ptsv2paymentsClientReferenceInformation();
    clientReferenceInformation.code = '1234567891';
    clientReferenceInformation.applicationName = 'owner-community';
    //====== ClientReferenceInformation ======

    //====== OrderInformation ======
    let orderInformationAmountDetails = new cybersource.Ptsv2paymentsOrderInformationAmountDetails();
    orderInformationAmountDetails.totalAmount = '900';
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
          console.log('PAYMENT DATA', data);
          resolve(data as ProcessPaymentWithPaymentInstrumentResponse);
        } else {
          console.log('PAYMENT ERROR', error);
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