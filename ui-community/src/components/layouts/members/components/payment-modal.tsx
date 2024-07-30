import { Button, Empty, Form, Modal, Radio, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { PaymentInstrument, PaymentInstrumentResult } from '../../../../generated';

import usePayModal from '../../../../hooks/usePayModal';

import { CreditCardDisplay } from './payment-instruments-list';
import useAddPaymentMethodModal from '../../../../hooks/useAddPaymentMethodModal';
import { useState } from 'react';

type PaymentForm = {
  paymentInstrumentId: string;
};

interface PaymentModalProps {
  title: string;
  paymentInstrumentsResult: PaymentInstrumentResult;
  onPayment: (paymentInstrumentId: string) => Promise<void>;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ title, paymentInstrumentsResult, onPayment }) => {
  const [processingPayment, setProcessingPayment] = useState(false);

  const usePay = usePayModal();
  const addPaymentMethod = useAddPaymentMethodModal();
  const [paymentForm] = Form.useForm();

  const paymentInstruments = paymentInstrumentsResult?.paymentInstruments as PaymentInstrument[] | undefined;
  const defaultPaymentInstrument = paymentInstruments?.find((i) => i.isDefault);

  const addPaymentButton = (
    <Button
      onClick={addPaymentMethod.onOpen}
      type={paymentInstruments && paymentInstruments.length > 0 ? 'default' : 'primary'}
    >
      <div className="flex items-center">
        <PlusOutlined className="mr-1" /> Add Card
      </div>
    </Button>
  );

  return (
    <Modal open={usePay.isOpen} onCancel={usePay.onClose} title={title} centered footer={() => <div />}>
      {paymentInstruments && paymentInstruments.length > 0 ? (
        <Form
          form={paymentForm}
          onFinish={(values: PaymentForm) => {
            setProcessingPayment(true);
            onPayment(values.paymentInstrumentId)
              .then(() => {
                usePay.onClose();
              })
              .finally(() => {
                setProcessingPayment(false);
              });
          }}
          initialValues={{
            paymentInstrumentId: defaultPaymentInstrument?.paymentInstrumentId || undefined
          }}
        >
          <Form.Item<PaymentForm>
            label="Payment Method"
            name="paymentInstrumentId"
            rules={[{ required: true, message: 'Please select a payment method' }]}
          >
            <Radio.Group>
              <Space direction="vertical">
                {paymentInstruments?.map((paymentInstrument) => (
                  <Radio key={paymentInstrument.paymentInstrumentId!} value={paymentInstrument?.paymentInstrumentId}>
                    <div className="flex gap-4 items-center">
                      <CreditCardDisplay paymentInstrument={paymentInstrument} />
                    </div>
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>
          <div className="flex items-center justify-end gap-2">
            {addPaymentButton}
            <Button type="primary" htmlType="submit" loading={processingPayment}>
              Pay
            </Button>
          </div>
        </Form>
      ) : (
        <Empty description="You don't have any payment methods setup yet." children={addPaymentButton} />
      )}
    </Modal>
  );
};
