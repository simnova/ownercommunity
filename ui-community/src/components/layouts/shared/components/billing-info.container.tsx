import { useEffect, useState } from 'react';
import { BillingInfo } from './billing-info';
import axios from 'axios';

export interface BillingInfoContainerProps {
  data: any;
}

interface TokenOptions {
  expirationMonth: string;
  expirationYear: string;
}

type Callback = (err: any, token: string) => void;

const configObject = {
  authenticationType: 'http_signature',
  runEnvironment: 'apitest.cybersource.com',
  merchantID: 'ecfmg_faimer',
  merchantKeyId: '15db87b6-5531-4771-9c19-cc34a2d435b9',
  merchantsecretKey: 'iMt2CuZsRPcuURcM1L2VieNFmnqscxVR4/BPFFitn10=',
  logConfiguration: {
    enableLog: false,
  }
};

export const BillingInfoContainer: React.FC<BillingInfoContainerProps> = (props) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [cardNumberValidationHelpText, setCardNumberValidationHelpText] = useState<string>("");
  const [securityCodeValidationHelpText, setSecurityCodeValidationHelpText] = useState<string>("");
  const [isCardContainerLoaded, setIsCardContainerLoaded] = useState(false);
  const [flexMicroform, setFlexMicroform] = useState<any>(null);

  useEffect(() => {
    if (isCardContainerLoaded) {
      const microformScript = document.createElement("script");

      microformScript.src = "https://flex.cybersource.com/cybersource/assets/microform/0.11/flex-microform.min.js";

      microformScript.onload = async () => {
        await axios.get(`http://localhost:7071/api/cybersource/generate-key`)
          .then((response) => {
            createFlexObj(response.data.keyId, async function (data: any, field: string) {
              switch (field) {
                case "number":
                  if (data.valid === true) {
                    setCardNumberValidationHelpText("");
                  }
                  break;
                case "securityCode":
                  if (data.valid === true) {
                    setSecurityCodeValidationHelpText("");
                  }
                  break;
              }
            });

            // Get Microform iFrames
            const frames = document.getElementsByTagName('iframe');

            // Set CSS on Microform iFrames
            for (const element of frames) {
              element.style.height = '30px';
              element.style.border = '1px solid #d5d0da';
              element.style.paddingLeft = '10px';
            }
          })
          .catch((error) => {
            console.log('MICROFORM ERROR', error);
          });
      }
      document.body.appendChild(microformScript);
    }
  }, [isCardContainerLoaded]);

  const onCardNumberContainerLoaded = () => {
    setIsCardContainerLoaded(true);
  }

  const createFlexObj = (keyId: string, clearValidationText: (data: any, field: string) => void): void => {
    try {
      const flex = new (window as { [key: string]: any })['Flex'](keyId);

      // Setup styles for flex iframe
      const myStyles = {
        'input': {
          'font-size': '14px',
          'font-family': 'helvetica, tahoma, calibri, sans-serif',
          'color': '#555',
          'line-height': '30px',
        },
        ':focus': { 'color': 'black' },
        ':disabled': { 'cursor': 'not-allowed' },
        'valid': { 'color': '#3c763d' },
        'invalid': { 'color': '#a94442' },
        '::placeholder': { 'color': '#A4A4A4' },
      };
      const microform = flex.microform({ styles: myStyles });
      setFlexMicroform(microform);

      // Create fields
      const number = microform.createField('number', { placeholder: 'Enter card number' });
      const securityCode = microform.createField('securityCode', { maxLength: 4, placeholder: '•••' });

      // Add event listeners
      number.on('change', function (data: any) {
        clearValidationText(data, 'number');
      });
      securityCode.on('change', function (data: any) {
        clearValidationText(data, 'securityCode');
      });

      // Check if the containers exist in the DOM
      // const cardNumberContainer = document.getElementById('card-number-container');
      // const securityCodeContainer = document.getElementById('securityCode-container');

      // console.log('Card Number Container:', cardNumberContainer);
      // console.log('Security Code Container:', securityCodeContainer);

      // Load fields
      number.load('#card-number-container');
      securityCode.load('#securityCode-container');
    } catch (error) {
      console.log('MICROFORM ERROR', error);
    }
  }

  const createToken = (expirationMonth: string, expirationYear: string, callBack: Callback): void => {
    const options: TokenOptions = {
      expirationMonth: expirationMonth,
      expirationYear: expirationYear,
    };

    flexMicroform.createToken(options, function (error: any, token: any) {
      if (error) {
        console.log('CREATE TOKEN ERROR', error);
      } else {
        console.log('TOKEN CREATED');
      }
      callBack(error, token);
    });
  }

  return (
    <BillingInfo
      errorMessage={errorMessage}
      onSetErrorMessage={setErrorMessage}
      cardNumberValidationHelpText={cardNumberValidationHelpText} 
      setCardNumberValidationHelpText={setCardNumberValidationHelpText}
      securityCodeValidationHelpText={securityCodeValidationHelpText}
      setSecurityCodeValidationHelpText={setSecurityCodeValidationHelpText}
      onCardNumberContainerLoaded={onCardNumberContainerLoaded}
      createToken={createToken}
    />
  )
}