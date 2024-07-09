import getNextSegment from './functions/shared/get-next-segment';
import generateKey from './functions/generate-key';
import createCustomer from './functions/create-customer';
import getCustomerPaymentInstruments from './functions/get-customer-payment-instruments';
import processPaymentWithPaymentInstrument from './functions/process-payment-with-payment-instrument';

export async function cyberSourceFunctionHandler(request, context, body) {
  const segment = getNextSegment(request.params);
  let keyId;
  let createCustomerResponse;
  let getCustomerPaymentInstrumentsResponse;
  let processPaymentWithPaymentInstrumentResponse;

  switch (segment) {
    case 'health':
      return { status: 200, body: 'Cybersource is healthy' };
    case 'generate-key':
      console.log('Generating key')
      keyId = await generateKey();
      return { status: 200, body: JSON.stringify({ keyId }) };
    case 'create-customer':
      console.log('Create customer')
      createCustomerResponse = await createCustomer(body);
      return { status: 200, body: JSON.stringify(createCustomerResponse) };
    case 'get-customer-payment-instruments':
      console.log('Get customer payment instruments')
      getCustomerPaymentInstrumentsResponse = await getCustomerPaymentInstruments(body);
      return { status: 200, body: JSON.stringify(getCustomerPaymentInstrumentsResponse) };
    case 'process-payment-with-payment-instrument':
      console.log('Process payment')
      processPaymentWithPaymentInstrumentResponse = await processPaymentWithPaymentInstrument(body);
      return { status: 200, body: JSON.stringify(processPaymentWithPaymentInstrumentResponse) };
    default:
      return { status: 404, body: 'Not Found' };
  }
}