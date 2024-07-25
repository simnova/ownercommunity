import { Button, Form, Modal, Radio, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { PaymentInstrument, PaymentInstrumentResult } from '../../../../generated';

import usePayModal from '../../../../hooks/usePayModal';

import { CreditCardDisplay } from './payment-instruments-list';
import useAddPaymentMethodModal from '../../../../hooks/useAddPaymentMethodModal';

interface PaymentModalProps {
  title: string;
  paymentInstrumentsResult: PaymentInstrumentResult;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ title, paymentInstrumentsResult }) => {
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
      <Form form={paymentForm}>
        <Form.Item label="Payment Method" name="paymentInstrument">
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
          <Button type="primary" onClick={() => {}}>
            Pay
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
