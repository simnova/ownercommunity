import { useQuery } from '@apollo/client';
import { SharedPaymentContainerPaymentKeyIdDocument } from '../../../../generated';
import { useEffect, useState } from 'react';
import { BillingInfo } from './billing-info';
import { Skeleton } from 'antd';

interface BillingInfoContainerProps {
  data: any;
}

interface TokenOptions {
  expirationMonth: string;
  expirationYear: string;
}
type Callback = (err: any, token: string) => void;

export const BillingInfoContainer: React.FC<BillingInfoContainerProps> = (props) => {
  // TODO: Add env var into vite env
  const ownerCommunityUrl = import.meta.env.VITE_SELF_HOSTED_CYBERSOURCE_URL ?? 'missing-owner-community-url';
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [cardNumberValidationHelpText, setCardNumberValidationHelpText] = useState<string>('');
  const [securityCodeValidationHelpText, setSecurityCodeValidationHelpText] = useState<string>('');
  const [isCardContainerLoaded, setIsCardContainerLoaded] = useState(false);
  const [flexMicroform, setFlexMicroform] = useState<any>(null);
  const [isMicroformScriptLoaded, setScriptLoaded] = useState(false);
  const {
    data: cybersource,
    loading: cybersourceLoading,
    error: cybersourceError
  } = useQuery(SharedPaymentContainerPaymentKeyIdDocument);

  const createToken = (expirationMonth: string, expirationYear: string, callBack: Callback): void => {
    const options: TokenOptions = {
      expirationMonth: expirationMonth,
      expirationYear: expirationYear
    };

    flexMicroform.createToken(options, function (error: any, token: any) {
      if (error) {
        console.log('CREATE TOKEN ERROR', error);
      } else {
        console.log('TOKEN CREATED');
      }
      callBack(error, token);
    });
  };

  const onCardNumberContainerLoaded = () => {
    setIsCardContainerLoaded(true);
  };

  const createFlexObj = (keyId: string, clearValidationText: (data: any, field: string) => void): void => {
    try {
      const flex = new (window as { [key: string]: any })['Flex'](keyId);

      // Setup styles for flex iframe
      const myStyles = {
        input: {
          'font-size': '14px',
          'font-family': 'helvetica, tahoma, calibri, sans-serif',
          color: '#555',
          'line-height': '30px'
        },
        ':focus': { color: 'black' },
        ':disabled': { cursor: 'not-allowed' },
        valid: { color: '#3c763d' },
        invalid: { color: '#a94442' },
        '::placeholder': { color: '#A4A4A4' }
      };
      const microform = flex.microform({ styles: myStyles });
      setFlexMicroform(microform);

      // Create fields
      const number = microform.createField('number', { placeholder: 'Enter card number' });
      const securityCode = microform.createField('securityCode', {
        maxLength: 4,
        placeholder: '••••',
        type: 'password'
      });

      // Add event listeners
      number.on('change', function (data: any) {
        clearValidationText(data, 'number');
      });
      securityCode.on('change', function (data: any) {
        clearValidationText(data, 'securityCode');
      });

      // Load fields
      number.load('#card-number-container');
      securityCode.load('#securityCode-container');
    } catch (error) {
      console.log('MICROFORM ERROR', error);
    }
  };

  // useEffect to load the microform script
  useEffect(() => {
    if (cybersource) {
      console.log(`${window.location.origin.toString()}/scripts/microform-css.js`);
      let microformScript: HTMLScriptElement = document.createElement('script');
      let cssScript: HTMLScriptElement = document.createElement('script');
      cssScript.src = `${window.location.origin.toString()}/scripts/microform-css.js`;
      microformScript.src = 'https://flex.cybersource.com/cybersource/assets/microform/0.11/flex-microform.min.js';
      microformScript.async = true;
      document.body.appendChild(microformScript);
      document.body.appendChild(cssScript);
      microformScript.onload = () => {
        console.log('script loaded');
        createFlexObj(cybersource?.paymentKeyId || '', async function (data: any, field: string) {
          switch (field) {
            case 'number':
              if (data.valid === true) {
                setCardNumberValidationHelpText('');
              }
              break;
            case 'securityCode':
              if (data.valid === true) {
                setSecurityCodeValidationHelpText('');
              }
              break;
          }
        });
      };

      cssScript.defer = true;
      cssScript.onload = () => {
        console.log('css loaded');
        setScriptLoaded(true);
      };

      return () => {
        console.log('scripts removed');
        document.body.removeChild(microformScript);
        document.body.removeChild(cssScript);
      };
    }
  }, [cybersource]);

  if (!isMicroformScriptLoaded && !isCardContainerLoaded && !cybersource) {
    return <Skeleton active />;
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
  );
};
