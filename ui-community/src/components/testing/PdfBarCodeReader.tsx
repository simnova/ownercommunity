import { generateBarCode } from './PdfBarCodeGenerator';
import TestBarCode from './test-images/C128.png';
import Quagga from '@ericblade/quagga2';

export const readBarCode = async (path: string) => {
  // const dataString = "https://staticstorageuniquename.blob.core.windows.net/public/testqrcode.pdf?sp=r&st=2024-07-19T18:54:13Z&se=2024-08-01T02:54:13Z&spr=https&sv=2022-11-02&sr=b&sig=ujk4k3t25eW91rssxevn3gl2Pv72l2Oja2U17P4h8Mo%3D"
  // const imageUrlToBase64 = async (url: string) => {
  //   const data = await fetch(url);
  //   const blob = await data.blob();
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(blob);
  //     reader.onloadend = () => {
  //       const base64data = reader.result;
  //       console.log("here data", base64data)
  //       resolve(base64data);
  //     };
  //     reader.onerror = reject;
  //   });
  // };

  // const decodedUrl = await imageUrlToBase64(dataString);
  
  // const barCode = generateBarCode('12342425');
  // const blob = await (await fetch(barCode)).blob(); 
  // const blobUrl = URL.createObjectURL(blob);
  // const a = document.createElement('a');
  // a.href = blobUrl;
  // a.download = 'examplebarcode.png';
  // document.body.appendChild(a);
  // a.click();
  // document.body.removeChild(a);

  Quagga.decodeSingle(
    {
      decoder: {
        readers: ['code_128_reader']
      },
      locate: false,
      src: TestBarCode
    },
    function (result: any) {
      if (result.codeResult) {
        console.log('result', result.codeResult.code);
      } else {
        console.log('not detected');
      }
    }
  );
};
