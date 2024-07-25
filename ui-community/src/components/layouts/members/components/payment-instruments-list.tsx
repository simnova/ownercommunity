import { Badge, Button, message } from 'antd';
import { PaymentInstrument } from '../../../../generated';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const getCardType = (cardType: string) => {
  switch (cardType) {
    case '001':
      return 'visa';
    case '002':
      return 'master-card';
    case '003':
      return 'american-express';
    case '004':
      return 'discover';
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
  onSetDefaultPaymentMethod: (paymentInstrumentId: string) => Promise<void>;
  onDeletePaymentMethod: (paymentInstrumentId: string) => Promise<void>;
}

export const PaymentInstrumentList: React.FC<PaymentInstrumentListProps> = ({
  paymentInstruments,
  onSetDefaultPaymentMethod,
  onDeletePaymentMethod
}) => {
  return (
    <div className="flex flex-col space-y-4">
      {paymentInstruments.map((paymentInstrument) => (
        <>
          {paymentInstrument?.cardNumber && (
            <CreditCardDisplay
              key={paymentInstrument.paymentInstrumentId}
              paymentInstrument={paymentInstrument}
              onSetDefaultPaymentMethod={onSetDefaultPaymentMethod}
              onDeletePaymentMethod={onDeletePaymentMethod}
            />
          )}
        </>
      ))}
    </div>
  );
};

interface CreditCardDisplayProps {
  paymentInstrument: PaymentInstrument;
  onSetDefaultPaymentMethod: (paymentInstrumentId: string) => Promise<void>;
  onDeletePaymentMethod: (paymentInstrumentId: string) => Promise<void>;
}

export const CreditCardDisplay: React.FC<CreditCardDisplayProps> = ({
  paymentInstrument,
  onSetDefaultPaymentMethod,
  onDeletePaymentMethod
}) => {
  const handleSetDefaultPaymentMethod = async () => {
    await onSetDefaultPaymentMethod(paymentInstrument.paymentInstrumentId!);
  };

  const handleDeletePaymentMethod = async () => {
    await onDeletePaymentMethod(paymentInstrument.paymentInstrumentId!);
  };

  if (paymentInstrument?.cardNumber && paymentInstrument?.cardType) {
    return (
      <div className="flex items-center gap-4">
        {paymentInstrument?.cardType && (
          <div className="p-1 rounded-md border-[1px] border-solid border-neutral-200">
            <img
              src={`/public/images/card-images/${getCardType(paymentInstrument.cardType)}.svg`}
              alt={`${paymentInstrument.cardType} logo`}
              className="w-8 border border-black p-0 m-0"
            />
          </div>
        )}

        <span className="w-44">{maskAndFormatCardNumber(paymentInstrument.cardNumber)}</span>

        <div className={`flex items-center ${paymentInstrument?.isDefault ? 'visible' : 'invisible'}`}>
          <Badge className="bg-blue-500 text-white px-2 py-1 rounded-lg h-fit">Default</Badge>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2 ml-4">
          <Button className="w-8 h-8 p-0" onClick={handleSetDefaultPaymentMethod}>
            <EditOutlined />
          </Button>
          <Button className="w-8 h-8 p-0" onClick={handleDeletePaymentMethod} aria-label="delete-payment-method" danger>
            <DeleteOutlined />
          </Button>
        </div>
      </div>
    );
  }

  return null;
};
