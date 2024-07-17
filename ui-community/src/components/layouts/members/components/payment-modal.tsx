import { Badge, Button, Form, Modal, Radio, Space } from 'antd';
import usePayModal from '../../../../hooks/usePayModal';
import { PlusOutlined } from '@ant-design/icons';

const cards = [
  {
    id: 1,
    cardNumber: '411111XXXXXX1111',
    default: true
  },
  {
    id: 2,
    cardNumber: 'XXXXXXXXXXXX1234',
    default: false
  },
  {
    id: 3,
    cardNumber: 'XXXXXXXXXXXX5678',
    default: false
  }
];

interface PaymentModalProps {
  title: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ title }) => {
  const usePay = usePayModal();
  const [paymentForm] = Form.useForm();

  const addPaymentButton = (
    <Button>
      <div className="flex items-center">
        <PlusOutlined className="mr-1" /> Add Card
      </div>
    </Button>
  );

  return (
    <Modal
      open={usePay.isOpen}
      onCancel={usePay.onClose}
      title={title}
      centered
      footer={(_, { OkBtn, CancelBtn }) => (
        <div className="flex items-center justify-end gap-2">
          {addPaymentButton}
          <CancelBtn />
          <OkBtn />
        </div>
      )}
    >
      <Form form={paymentForm}>
        <Form.Item label="Payment Method" name="paymentInstrument">
          <Radio.Group>
            <Space direction="vertical">
              {cards.map((card) => (
                <Radio key={card.id} value={card.cardNumber}>
                  <div className="flex gap-4 items-center">
                    <span>{card.cardNumber}</span>
                    {card.default && <Badge className="bg-blue-500 text-white px-2 py-1 rounded-lg">Default</Badge>}
                  </div>
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PaymentModal;
