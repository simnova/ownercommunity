import { Badge } from 'antd';

interface paymentInstrumentListProps {
  cards: {
    id: number;
    cardNumber: string;
    default: boolean;
  }[];
}

const PaymentInstrumentList: React.FC<paymentInstrumentListProps> = ({ cards }) => {
  return (
    <div className="flex flex-col gap-4">
      {cards.map((card) => (
        <CreditCardDisplay key={card.id} cardNumber={card.cardNumber} defaultCard={card.default} />
      ))}
    </div>
  );
};

export const CreditCardDisplay: React.FC<{ cardNumber: string; defaultCard?: boolean }> = ({
  cardNumber,
  defaultCard
}) => {
  const maskAndFormatCardNumber = (cardNumber: string) => {
    // Mask all digits except the last four
    const maskedCardNumber = cardNumber.slice(0, -4).replace(/\d/g, 'X') + cardNumber.slice(-4);

    // Add hyphens for readability
    const formattedCardNumber = maskedCardNumber.replace(/(.{4})/g, '$1-').slice(0, -1);

    return formattedCardNumber;
  };

  return (
    <div className="flex gap-4 items-center">
      <span>{maskAndFormatCardNumber(cardNumber)}</span>
      {defaultCard && <Badge className="bg-blue-500 text-white px-2 py-1 rounded-lg">Default</Badge>}
    </div>
  );
};

export default PaymentInstrumentList;
