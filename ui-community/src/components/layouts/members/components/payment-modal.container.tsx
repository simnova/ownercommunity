import { useQuery } from '@apollo/client';

import { MemberPaymentInstrumentsDocument } from '../../../../generated';
import { PaymentModal } from './payment-modal';
import { Empty, Skeleton } from 'antd';

interface PaymentModalContainerProps {
  title: string;
  onPayment: (paymentInstrumentId: string) => Promise<void>;
}

export const PaymentModalContainer: React.FC<PaymentModalContainerProps> = ({ title, onPayment }) => {
  const {
    data: paymentInstruments,
    error: paymentInstrumentsError,
    loading: paymentInstrumentsLoading
  } = useQuery(MemberPaymentInstrumentsDocument);

  if (paymentInstrumentsLoading) {
    return <Skeleton active />;
  }

  if (paymentInstrumentsError) {
    return <div>Error loading payment instruments</div>;
  }

  return (
    <>
      {paymentInstrumentsError || !paymentInstruments || !paymentInstruments?.memberPaymentInstruments ? (
        <Empty />
      ) : (
        <PaymentModal
          title={title}
          paymentInstrumentsResult={paymentInstruments?.memberPaymentInstruments}
          onPayment={onPayment}
        />
      )}
    </>
  );
};
