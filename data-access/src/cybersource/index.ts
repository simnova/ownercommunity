import getNextSegment from './functions/shared/get-next-segment';
import generateKey from './functions/generate-key';
import createCustomer from './functions/create-customer';
import getCustomerPaymentInstruments from './functions/get-customer-payment-instruments';
import addCustomerPaymentInstrument from './functions/add-customer-payment-instrument';
import processPaymentWithPaymentInstrument from './functions/process-payment-with-payment-instrument';
import updateCustomerDefaultPaymentInstrument from './functions/update-customer-default-payment-instrument';

export async function cyberSourceFunctionHandler(request, context, body) {
  const segment = getNextSegment(request.params);
  let keyId;
  let data;

  switch (segment) {
    case 'health':
      return { status: 200, body: 'Cybersource is healthy' };
    case 'generate-key':
      console.log('Generating key')
      keyId = await generateKey();
      return { status: 200, body: JSON.stringify({ keyId }) };
    case 'create-customer':
      console.log('Create customer')
      data = await createCustomer(body);
      return { status: 200, body: JSON.stringify(data) };
    case 'get-customer-payment-instruments':
      console.log('Get customer payment instruments')
      data = await getCustomerPaymentInstruments(body);
      return { status: 200, body: JSON.stringify(data) };
    case 'add-customer-payment-instrument':
      console.log('Add customer payment instrument')
      data = await addCustomerPaymentInstrument(body);
      return { status: 200, body: JSON.stringify(data) };
    case 'process-payment-with-payment-instrument':
      console.log('Process payment')
      data = await processPaymentWithPaymentInstrument(body);
      return { status: 200, body: JSON.stringify(data) };
    case 'update-customer-default-payment-instrument':
      console.log('Update customer default payment instrument')
      data = await updateCustomerDefaultPaymentInstrument(body);
      return { status: 200, body: JSON.stringify(data) };
    default:
      return { status: 404, body: 'Not Found' };
  }
}