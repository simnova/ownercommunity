import { Button, Form, Modal, Radio, Space } from 'antd';
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

  const addPaymentButton = (
    <Button onClick={addPaymentMethod.onOpen}>
      <div className="flex items-center">
        <PlusOutlined className="mr-1" /> Add Card
      </div>
    </Button>
  );

  return (
    <Modal open={usePay.isOpen} onCancel={usePay.onClose} title={title} centered footer={() => <div />}>
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
      >
        <Form.Item<PaymentForm>
          label="Payment Method"
          name="paymentInstrumentId"
          rules={[{ required: true, message: 'Please select a payment method' }]}
        >
          <Radio.Group
            defaultValue={(paymentInstrumentsResult.paymentInstruments as PaymentInstrument[]).find((i) => {
              if (i.isDefault) {
                return i.paymentInstrumentId;
              }
            })}
          >
            <Space direction="vertical">
              {(paymentInstrumentsResult.paymentInstruments as PaymentInstrument[]).map((paymentInstrument) => (
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
    </Modal>
  );
};
