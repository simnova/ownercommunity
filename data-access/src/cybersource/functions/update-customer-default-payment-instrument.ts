import cybersource from 'cybersource-rest-client';

interface UpdateCustomerDefaultPaymentInstrumentResponse {
  _links: {
    self: {
      href: string
    },
    paymentInstruments: {
      href: string
    }
  },
  id: string, // Customer ID
  clientReferenceInformation: { code: string },
  defaultPaymentInstrument: { id: string },
  metadata: { creator: string },
  _embedded: {
    defaultPaymentInstrument: {
      _links: {
        self: {
          href: string
        },
        customer: {
          href: string
        }
      },
      id: string,
      default: boolean,
      state: string, // 'ACTIVE'
      card: {
        expirationMonth: string,
        expirationYear: string,
        type: string // '001' = 'Visa', '002' = 'Master Card', '003' = 'American Express'
      },
      buyerInformation: { currency: string },
      billTo: {
        firstName: string,
        lastName: string,
        address1: string,
        locality: string,
        administrativeArea: string,
        postalCode: string,
        country: string,
        email: string
      },
      processingInformation: {
        billPaymentProgramEnabled: boolean
      },
      instrumentIdentifier: { id: string },
      metadata: { creator: string },
      _embedded: {
        instrumentIdentifier: {
          _links: {
            self: {
              href: string
            },
            paymentInstruments: { href: string }
          },
          id: string,
          object: string, // 'instrumentIdentifier'
          state: string, // 'ACTIVE'
          card: { number: string }, // '222242XXXXXX1113'
          metadata: { creator: string }
        }
      }
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
  merchantsecretKey: process.env.CYBERSOURCE_MERCHANT_SECRET_KEY,
  logConfiguration: {
    enableLog: false,
  }
};

const cybersourceClient = new cybersource.ApiClient();

/**
 * Updates the default payment instrument for a customer using the Cybersource Customer API.
 * 
 * This function constructs the necessary information objects required by the Cybersource API,
 * specifically the default payment instrument and the patch customer request object.
 * It then calls the Cybersource API to update the customer's default payment instrument.
 * 
 * @param {any} body - The request body containing the customer ID and payment instrument ID.
 * @returns {Promise<UpdateCustomerDefaultPaymentInstrumentResponse>} A promise that resolves to the response of the update, or rejects with an error.
 */
async function updateCustomerDefaultPaymentInstrument(body: any) {
  try {
    const client = new cybersource.CustomerApi(configObject, cybersourceClient);

    //====== DefaultPaymentInstrument ======
    let defaultPaymentInstrument = new cybersource.Tmsv2customersDefaultPaymentInstrument();
		defaultPaymentInstrument.id = body.paymentInstrumentId;
    //====== DefaultPaymentInstrument ======

    var patchCustomerRequestObj = new cybersource.PatchCustomerRequest();
    patchCustomerRequestObj.defaultPaymentInstrument = defaultPaymentInstrument;

    return new Promise((resolve, reject) => {
      client.patchCustomer(body.customerId, patchCustomerRequestObj, [], (error, data, response) => {
        if (!error) {
          resolve(data as UpdateCustomerDefaultPaymentInstrumentResponse);
        } else {
          reject(new Error(error.message || 'Unknown error occurred'));
        }
      });
    });
  } catch (error) {
    return {
      status: 500,
      body: `Error updating customer default payment instrument: ${error.message}`
    }
  }
}

export default updateCustomerDefaultPaymentInstrument;