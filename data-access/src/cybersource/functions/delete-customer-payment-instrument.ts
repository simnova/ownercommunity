import cybersource from 'cybersource-rest-client';

interface DeleteCustomerPaymentInstrumentResponse {

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

async function deleteCustomerPaymentInstrument(body: any) {
  try {
    const client = new cybersource.CustomerPaymentInstrumentApi(configObject, cybersourceClient);

    return new Promise((resolve, reject) => {
      client.deleteCustomerPaymentInstrument(body.customerId, body.paymentInstrumentId, [], (error, data, response) => {
        if (!error) {
          console.log('DATA', data); // No data is returned (null)
          resolve(data);
        } else {
          console.log('ERROR', error);
          reject(new Error(error.message || 'Unknown error occurred'));
        }
      });
    });
  } catch (error) {
    return {
      status: 500,
      body: `Error deleting payment instrument: ${error.message}`
    }
  }
}

export default deleteCustomerPaymentInstrument;