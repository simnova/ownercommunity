import { Badge, Divider } from 'antd';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { PaymentInstrument } from '../../../../generated';

const getCardType = (cardNumber: string) => {
  const firstDigit = cardNumber.charAt(0);
  const firstTwoDigits = cardNumber.slice(0, 2);
  const firstFourDigits = cardNumber.slice(0, 4);

  if (firstDigit === '4') {
    return 'visa';
  } else if (firstTwoDigits >= '51' && firstTwoDigits <= '55') {
    return 'master-card';
  } else if (
    firstFourDigits === '6011' ||
    firstTwoDigits === '65' ||
    (firstTwoDigits >= '64' && firstTwoDigits <= '65')
  ) {
    return 'discover';
  } else if (firstTwoDigits === '34' || firstTwoDigits === '37') {
    return 'american-express';
  } else {
    return undefined;
  }
};

const maskAndFormatCardNumber = (cardNumber: string) => {
  // Mask all digits except the last four
  const maskedCardNumber = cardNumber.slice(0, -4).replace(/\d/g, 'X') + cardNumber.slice(-4);

  // Add hyphens for readability
  const formattedCardNumber = maskedCardNumber.replace(/(.{4})/g, '$1-').slice(0, -1);

  return formattedCardNumber;
};

interface PaymentInstrumentListProps {
  paymentInstruments: PaymentInstrument[];
}

const PaymentInstrumentList: React.FC<PaymentInstrumentListProps> = ({ paymentInstruments }) => {
  return (
    <div className="flex flex-col gap-4">
      {paymentInstruments.map((paymentInstrument, index) => (
        <>
          {paymentInstrument?.cardNumber && (
            <CreditCardDisplay
              key={paymentInstrument.paymentInstrumentId}
              cardNumber={paymentInstrument.cardNumber}
              defaultCard={paymentInstrument?.isDefault}
            />
          )}
          {index !== paymentInstruments.length - 1 && <Divider />}
        </>
      ))}
    </div>
  );
};

export const CreditCardDisplay: React.FC<{ cardNumber: string; defaultCard?: boolean | null }> = ({
  cardNumber,
  defaultCard
}) => {
  const cardType = getCardType(cardNumber);
  return (
    <div className="flex gap-4 items-center">
      <div className="flex gap-6">
        {cardType !== undefined && (
          <div className="p-1 rounded-md border-[1px] border-solid border-neutral-200">
            <img
              src={`/public/images/card-images/${cardType}.svg`}
              alt={`${cardType} logo`}
              className="w-8 border border-black p-0 m-0"
            />
          </div>
        )}
        <span>{maskAndFormatCardNumber(cardNumber)}</span>
        {/* <Cards number={cardNumber} name={''} cvc={''} expiry={''} /> */}
      </div>
      {/* {defaultCard && <Badge className="bg-blue-500 text-white px-2 py-1 rounded-lg">Default</Badge>} */}
    </div>
  );
};

export default PaymentInstrumentList;
