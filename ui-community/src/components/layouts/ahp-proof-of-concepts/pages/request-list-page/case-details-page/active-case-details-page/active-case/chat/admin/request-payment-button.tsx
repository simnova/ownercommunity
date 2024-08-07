import { DollarOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
import { FC, useState } from 'react';

interface RequestPaymentButtonProps {
  updateEmbedding: (requests: any[]) => void;
}
export const RequestPaymentButton: FC<RequestPaymentButtonProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentReason, setPaymentReason] = useState('');

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setSecondModalOpen(false);
    props.updateEmbedding([
      {
        value: 'requestPayment',
        message: 'Request Payment',
        reason: paymentReason,
        amount: paymentAmount,
        icon: <DollarOutlined />
      }
    ]);
    setPaymentAmount('');
    setPaymentReason('');
  };

  const secondCheck = () => {
    setSecondModalOpen(true);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setSecondModalOpen(false);
  };

  const endFooterButton = (
    <Button onClick={closeModal} type="primary">
      Create Request
    </Button>
  );

  return (
    <>
      <Modal title="Request Payment" footer={null} open={isOpen} onCancel={handleCancel}>
        <Form onFinish={secondCheck}>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: 'Please input the amount!'
              }
            ]}
          >
            <Input
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              placeholder="Enter Amount"
              style={{
                width: '35%'
              }}
            />
          </Form.Item>
          <Form.Item
            label="Reason"
            name="reason"
            rules={[
              {
                required: true,
                message: 'Please input the reason!'
              }
            ]}
          >
            <Input
              value={paymentReason}
              onChange={(e) => setPaymentReason(e.target.value)}
              placeholder="Enter Reason"
            />
          </Form.Item>
          <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <Button type="primary" htmlType="submit" style={{ marginTop: 10 }}>
              Create Request
            </Button>
          </div>
        </Form>
      </Modal>
      <Modal title="Request Payment" footer={endFooterButton} open={secondModalOpen} onCancel={handleCancel}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          Are you sure you want to put in a request of ${paymentAmount} for reason "{paymentReason}"?
        </div>
      </Modal>
      <Button style={{ width: '100%', borderRadius: '0px' }} onClick={openModal}>
        <DollarOutlined /> Request Payment
      </Button>
    </>
  );
};
