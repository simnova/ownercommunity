import getNextSegment from './functions/shared/get-next-segment';
import generateKey from './functions/generate-key';
import createPaymentInstrument from './functions/create-payment-instrument';
import getPaymentInstrument from './functions/get-payment-instrument';
import processPaymentWithPaymentInstrument from './functions/process-payment-with-payment-instrument';

export async function cyberSourceFunctionHandler(request, context, body) {
  const segment = getNextSegment(request.params);
  let keyId;
  let createPaymentInstrumentResponse;
  let processPaymentWithPaymentInstrumentResponse;

  switch (segment) {
    case 'health':
      return { status: 200, body: 'Cybersource is healthy' };
    case 'generate-key':
      console.log('Generating key')
      keyId = await generateKey();
      return { status: 200, body: JSON.stringify({ keyId }) };
    case 'create-payment-instrument':
      console.log('Create payment instrument')
      createPaymentInstrumentResponse = await createPaymentInstrument(body);
      return { status: 200, body: JSON.stringify(createPaymentInstrumentResponse) };
    case 'get-payment-instrument':
      console.log('Get payment instrument')
      return { status: 200, body: 'Get instrument identifier' };
    case 'process-payment-with-payment-instrument':
      console.log('Process payment')
      processPaymentWithPaymentInstrumentResponse = await processPaymentWithPaymentInstrument(body);
      return { status: 200, body: JSON.stringify(processPaymentWithPaymentInstrumentResponse) };
    default:
      return { status: 404, body: 'Not Found' };
  }
}