import cybersource from 'cybersource-rest-client';

interface GetCustomerPaymentInstrumentsResponse {
  _links: {
    self: {
      href: string
    },
    first: {
      href: string
    },
    last: {
      href: string
    }
  },
  offset: number,
  limit: number,
  count: number,
  total: number,
  _embedded: { 
    paymentInstruments: {
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
      buyerInformation: { currency: string },
      card: {
        expirationMonth: string,
        expirationYear: string,
        type: string
      },
      default: boolean,
      id: string,
      instrumentIdentifier: { id: string },
      metadata: { creator: string },
      processingInformation: { billPaymentProgramEnabled: boolean },
      state: string,  // ACTIVE
      _embedded: {
        instrumentIdentifier: {
          _links: {
            self: {
              href: string
            },
            paymentInstruments: {
              href: string
            }
          },
          id: string,
          object: string, // 'instrumentIdentifier'
          state: string, // 'ACTIVE'
          card: {
            number: string, // '411111XXXXXX1111'
          },
          processingInformation: {
            authorizationOptions: {
              initiator: {
                merchantInitiatedTransaction: {
                  previousTransactionId: string
                }
              }
            }
          },
          metadata: {
            creator: string // 'ecfmg_faimer'
          }
        }
      }
    }[]
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

async function getCustomerPaymentInstruments(body: any) {
  try {
    const client = new cybersource.CustomerPaymentInstrumentApi(configObject, cybersourceClient);

    var options = [];
		options['limit'] = 50; // number | This is the number of payment instruments returned in the response. (optional) (default to 20)

    return new Promise((resolve, reject) => {
      client.getCustomerPaymentInstrumentsList(body.customerId, options, (error: any, data: any, response: any) => {
        if (!error) {
          resolve(data as GetCustomerPaymentInstrumentsResponse);
        } else {
          reject(new Error(error.message || 'Unknown error occurred'));
        }
      });
    });
  } catch (error) {
    return {
      status: 500,
      body: `Error retrieving payment instrument: ${error.message}`
    }
  }
}

export default getCustomerPaymentInstruments;