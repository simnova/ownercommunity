import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import AddPaymentMethodModalContainer from './add-payment-method-modal.container';
import PaymentInstrumentList from './payment-instruments-list';

import useAddPaymentMethodModal from '../../../../hooks/useAddPaymentMethodModal';
import { PaymentInstrument, PaymentInstrumentResult } from '../../../../generated';

interface WalletProps {
  paymentInstrumentsResult: PaymentInstrumentResult;
}

const Wallet: React.FC<WalletProps> = ({ paymentInstrumentsResult }) => {
  const useAddPaymentMethod = useAddPaymentMethodModal();

  const { paymentInstruments } = paymentInstrumentsResult;

  return (
    <div>
      {paymentInstruments && <PaymentInstrumentList paymentInstruments={paymentInstruments as PaymentInstrument[]} />}
      <Button type="primary" className="mt-4" onClick={useAddPaymentMethod.onOpen}>
        <div className="flex items-center">
          <PlusOutlined className="mr-1" /> Add Card
        </div>
      </Button>
      <AddPaymentMethodModalContainer />
    </div>
  );
};

export default Wallet;
