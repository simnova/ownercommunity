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
  merchantsecretKey: process.env.CYBERSOURCE_MERCHANT_SECRET_KEY,
  logConfiguration: {
    enableLog: false,
  }
};

const cybersourceClient = new cybersource.ApiClient();

/**
 * Deletes a customer's payment instrument using the Cybersource Customer Payment Instrument API.
 * 
 * This function calls the Cybersource API to delete a specified payment instrument for a given customer.
 * It constructs the API client and uses the customer ID and payment instrument ID from the request body
 * to perform the deletion.
 * 
 * @param {any} body - The request body containing customer ID and payment instrument ID.
 * @returns {Promise<any>} A promise that resolves to the response of the deletion, or rejects with an error.
 */
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