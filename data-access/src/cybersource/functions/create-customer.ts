import cybersource from 'cybersource-rest-client';

interface CreateCustomerResponse {
  _links: {
    self: {
      href: string;
      method: string;
    },
    capture: {
      href: string;
      method: string;
    }
  },
  id: string,
  submitTimeUtc: string, // '2024-07-08T20:56:04Z'
  status: string, // 'AUTHORIZED'
  reconciliationId: string,
  clientReferenceInformation: { code: string },
  processorInformation: {
    approvalCode: string,
    transactionId: string,
    networkTransactionId: string,
    responseCode: string,
    avs: { code: string, codeRaw: string }
  },
  paymentAccountInformation: { card: { type: string } }, // type: '001', '002', etc.
  paymentInformation: {
    card: { type: string },
    tokenizedCard: { type: string }
  },
  orderInformation: {
    amountDetails: { authorizedAmount: string, currency: string }
  },
  pointOfSaleInformation: { terminalId: string },
  tokenInformation: {
    instrumentidentifierNew: boolean,
    customer: { id: string },
    paymentInstrument: { id: string },
    instrumentIdentifier: { id: string, state: string } // state: 'ACTIVE'
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

async function createCustomer(body: any) {
  try {
    const client = new cybersource.PaymentsApi(configObject, cybersourceClient);

    //====== ClientReferenceInformation ====== Used for reconciliation purposes (search)
    let clientReferenceInformation = new cybersource.Ptsv2paymentsClientReferenceInformation();
    clientReferenceInformation.code = '1234567892';
    clientReferenceInformation.applicationName = 'owner-community';
    //====== ClientReferenceInformation ======
    //====== OrderInformation ======
    let orderInformationAmountDetails = new cybersource.Ptsv2paymentsOrderInformationAmountDetails();
    orderInformationAmountDetails.totalAmount = '0'; // Zero amount for instrument identifier
    orderInformationAmountDetails.currency = 'USD';

    let orderInformationBillTo = new cybersource.Ptsv2paymentsOrderInformationBillTo();
    orderInformationBillTo.firstName = 'Ike';
    orderInformationBillTo.lastName = 'Wilson';
    orderInformationBillTo.address1 = '123 Main St.';
    orderInformationBillTo.locality = 'Foster City';
    orderInformationBillTo.administrativeArea = 'CA';
    orderInformationBillTo.postalCode = '94404';
    orderInformationBillTo.country = 'US';
    orderInformationBillTo.email = 'iwilson@ecfmg.org';

    let orderInformation = new cybersource.Ptsv2paymentsOrderInformation();
    orderInformation.amountDetails = orderInformationAmountDetails;
    orderInformation.billTo = orderInformationBillTo;
    //====== OrderInformation ======
    //====== ProcessingInformation ======
    let processingInformation = new cybersource.Ptsv2paymentsProcessingInformation();
    processingInformation.actionList = ['TOKEN_CREATE'];
    processingInformation.actionTokenTypes = ['customer', 'paymentInstrument'];
    //====== ProcessingInformation ======
    //====== TokenInformation ======
    let tokenInformationObj = new cybersource.Ptsv2paymentsTokenInformation();
    tokenInformationObj.transientTokenJwt = body.paymentToken;
    //====== TokenInformation ======

    // create a new CreatePaymentRequest object
    let createPaymentRequestObj = new cybersource.CreatePaymentRequest();
    createPaymentRequestObj.clientReferenceInformation = clientReferenceInformation;
    createPaymentRequestObj.orderInformation = orderInformation;
    createPaymentRequestObj.processingInformation = processingInformation;
    createPaymentRequestObj.tokenInformation = tokenInformationObj;

    return new Promise((resolve, reject) => {
      client.createPayment(createPaymentRequestObj, (error, data, response) => {
        if (!error) {
          resolve(data as CreateCustomerResponse);
        } else {
          reject(new Error(error.message || 'Unknown error occurred'));
        }
      });
    });
  } catch (error) {
    return {
      status: 500,
      body: `Error creating instrument identifier: ${error.message}`
    }
  }
}

export default createCustomer;