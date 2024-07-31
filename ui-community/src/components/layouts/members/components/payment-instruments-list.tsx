import { Badge, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { PaymentInstrument } from '../../../../generated';
import { useState } from 'react';
import dayjs from 'dayjs';
import useEditPaymentMethodModal from '../../../../hooks/useEditPaymentMethodModal';

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

const maskAndFormatCardNumber = (cardNumber: string, cardType: string) => {
  // Check if the card is an Amex card (15 digits)
  const isAmex = cardType === '003';

  // Mask all digits except the last four
  const maskedCardNumber = cardNumber.slice(0, -4).replace(/\d/g, 'X') + cardNumber.slice(-4);

  // Add hyphens for readability
  let formattedCardNumber;
  if (isAmex) {
    // Format Amex card: XXXX XXXXXX XXXXX
    formattedCardNumber = maskedCardNumber.replace(/(.{4})(.{6})(.{5})/, '$1-$2-$3');
  } else {
    // Format regular cards: XXXX XXXX XXXX XXXX
    formattedCardNumber = maskedCardNumber.replace(/(.{4})/g, '$1-').slice(0, -1);
  }

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
        <CreditCardDisplay
          key={paymentInstrument.paymentInstrumentId}
          paymentInstrument={paymentInstrument}
          onSetDefaultPaymentMethod={onSetDefaultPaymentMethod}
          onDeletePaymentMethod={onDeletePaymentMethod}
        />
      ))}
    </div>
  );
};

interface CreditCardDisplayProps {
  paymentInstrument: PaymentInstrument;
  onSetDefaultPaymentMethod?: (paymentInstrumentId: string) => Promise<void>;
  onDeletePaymentMethod?: (paymentInstrumentId: string) => Promise<void>;
}

export const CreditCardDisplay: React.FC<CreditCardDisplayProps> = ({
  paymentInstrument,
  onSetDefaultPaymentMethod,
  onDeletePaymentMethod
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const useEditPaymentMethod = useEditPaymentMethodModal();

  const today = dayjs();
  const isExpired =
    Number(paymentInstrument?.expirationMonth!) < today.month() &&
    Number(paymentInstrument?.expirationYear!) < today.year();

  const handleSetDefaultPaymentMethod = async () => {
    if (onSetDefaultPaymentMethod) {
      await onSetDefaultPaymentMethod(paymentInstrument.paymentInstrumentId!);
    }
  };

  const handleDeletePaymentMethod = async () => {
    if (onDeletePaymentMethod) {
      setIsDeleting(true);
      await onDeletePaymentMethod(paymentInstrument.paymentInstrumentId!);
      setIsDeleting(false);
    }
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

        <span className="w-44">
          {maskAndFormatCardNumber(paymentInstrument.cardNumber, paymentInstrument.cardType)}
        </span>

        {/* ACTIONS */}
        <div className="flex gap-2">
          {onSetDefaultPaymentMethod && (
            <Button
              className="w-8 h-8 p-0"
              onClick={() => {
                useEditPaymentMethod.setPaymentInstrument(paymentInstrument);
                useEditPaymentMethod.onOpen();
              }}
            >
              <EditOutlined />
            </Button>
          )}
          {onDeletePaymentMethod && (
            <Button
              className="w-8 h-8 p-0"
              onClick={handleDeletePaymentMethod}
              aria-label="delete-payment-method"
              loading={isDeleting}
              danger
              disabled={!!paymentInstrument.isDefault}
            >
              {!isDeleting && <DeleteOutlined />}
            </Button>
          )}
        </div>

        <div className="flex gap-1">
          {paymentInstrument.isDefault && (
            <Badge className="bg-blue-500 text-white px-2 py-1 rounded-lg h-fit">Default</Badge>
          )}

          {isExpired && <Badge className="bg-rose-500 text-white px-2 py-1 rounded-lg h-fit">Expired</Badge>}
        </div>
      </div>
    );
  }

  return null;
};
