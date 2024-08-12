import { DollarOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Popconfirm } from 'antd';
import { FC, useState } from 'react';

interface RequestPaymentButtonProps {
  updateEmbedding: (requests: any) => void;
}
export const RequestPaymentButton: FC<RequestPaymentButtonProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentReason, setPaymentReason] = useState('');

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    if(paymentAmount === '' || paymentReason === '') {
      return;
    }
    setIsOpen(false);
    props.updateEmbedding({
      value: 'requestPayment',
      message: 'Request Payment',
      reason: paymentReason,
      amount: paymentAmount,
      icon: <DollarOutlined />
    });
    setPaymentAmount('');
    setPaymentReason('');
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Modal title="Request Payment" footer={null} open={isOpen} onCancel={handleCancel}>
        <Form>
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
            <Popconfirm
              title="Are you sure?"
              description="Are you sure you want to request payment for this amount?"
              onConfirm={closeModal}
            >
              <Button type="primary" htmlType="submit" style={{ marginTop: 10 }}>
                Create Request
              </Button>
            </Popconfirm>
          </div>
        </Form>
      </Modal>
      <Button
        style={{ width: '100%', borderRadius: '8px', marginRight: 10, marginBottom: 10, marginTop: 10 }}
        onClick={openModal}
      >
        <DollarOutlined /> Request Payment
      </Button>
    </>
  );
};
