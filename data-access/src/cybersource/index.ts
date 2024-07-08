import getNextSegment from './functions/shared/get-next-segment';
import generateKey from './functions/generate-key';

export async function cyberSourceFunctionHandler(request, context, body) {
  const segment = getNextSegment(request.params);
  let keyId;

  switch (segment) {
    case 'health':
      return { status: 200, body: 'Cybersource is healthy' };
    case 'generate-key':
      console.log('Generating key')
      keyId = await generateKey();
      console.log('Generated key:', keyId);
      return { status: 200, body: JSON.stringify({ keyId }) };
    default:
      return { status: 404, body: 'Not Found' };
  }
}