import { Readable } from 'stream';

async function streamToString(stream: ReadableStream): Promise<string> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  
  return new Promise((resolve, reject) => {
    function read() {
      reader.read().then(({ done, value }) => {
        if (done) {
          resolve(new TextDecoder().decode(new Uint8Array(chunks.reduce((acc, val) => [...acc, ...val], []))));
          return
        }
        chunks.push(value);
        read();
      }).catch(err => reject(err))
    }
    read();
  });
}

export async function readBodyStream(request, context) {
  if (request.body instanceof ReadableStream) {
    try {
      const processedBody = await streamToString(request.body);
      return JSON.parse(processedBody);
    } catch (error) {
      context.log('Error reading stream:', error);
      throw new Error('Error reading request body');
    }
  }
  return null;
}