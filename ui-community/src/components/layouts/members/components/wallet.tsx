import React from 'react';
import { Button, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import AddPaymentMethodModalContainer from './add-payment-method-modal.container';
import { PaymentInstrumentList } from './payment-instruments-list';

import useAddPaymentMethodModal from '../../../../hooks/useAddPaymentMethodModal';
import { PaymentInstrument, PaymentInstrumentResult } from '../../../../generated';
import { EditPaymentMethodModalContianer } from './edit-payment-modal.container';

interface WalletProps {
  paymentInstrumentsResult: PaymentInstrumentResult;
  onSetDefaultPaymentMethod: (paymentInstrumentId: string) => Promise<void>;
  onDeletePaymentMethod: (paymentInstrumentId: string) => Promise<void>;
}

const Wallet: React.FC<WalletProps> = ({
  paymentInstrumentsResult,
  onSetDefaultPaymentMethod,
  onDeletePaymentMethod
}) => {
  const useAddPaymentMethod = useAddPaymentMethodModal();

  const { paymentInstruments } = paymentInstrumentsResult;

  const addPaymentMethodButton = (
    <Button type="primary" className="mt-8" onClick={useAddPaymentMethod.onOpen}>
      <div className="flex items-center">
        <PlusOutlined className="mr-1" /> Add Card
      </div>
    </Button>
  );

  return (
    <div>
      <h2>Your Cards</h2>
      {paymentInstruments && paymentInstruments?.length > 0 ? (
        <PaymentInstrumentList
          paymentInstruments={paymentInstruments as PaymentInstrument[]}
          onSetDefaultPaymentMethod={onSetDefaultPaymentMethod}
          onDeletePaymentMethod={onDeletePaymentMethod}
        />
      ) : (
        <Empty description="You don't have any payment methods setup yet." children={addPaymentMethodButton} />
      )}
      {paymentInstruments && paymentInstruments?.length > 0 && addPaymentMethodButton}
      <AddPaymentMethodModalContainer />
      <EditPaymentMethodModalContianer />
    </div>
  );
};

export default Wallet;
