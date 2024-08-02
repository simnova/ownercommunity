import { DollarOutlined } from '@ant-design/icons';
import { Button, Input, Modal } from 'antd';
import { FC, useState } from 'react';

interface SendMoneyButtonProps {
  updateEmbedding: (requests: any[]) => void;
}
export const SendMoneyButton: FC<SendMoneyButtonProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentReason, setPaymentReason] = useState('');

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    props.updateEmbedding([
      {
        value: 'sendMoney',
        message: 'Send Money',
        reason: paymentReason,
        amount: paymentAmount,
        icon: <DollarOutlined />
      }
    ]);
    setPaymentAmount('');
    setPaymentReason('');
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const setPayment = (amount: string) => {
    setPaymentAmount(amount);
  };

  const setReason = (reason: string) => {
    setPaymentReason(reason);
  };

  const footerButton = (
    <Button onClick={closeModal} type="primary">
      Create Request
    </Button>
  );

  return (
    <>
      <Modal title="Send Money" footer={footerButton} open={isOpen} onCancel={handleCancel}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          How Much?
          <Input style={{ width: '25%' }} onChange={(e: any) => setPayment(e.target.value)} />
          For What?
          <Input style={{ width: '50%' }} onChange={(e: any) => setReason(e.target.value)} />
        </div>
      </Modal>
      <Button style={{ width: '100%', borderRadius: '0px' }} onClick={openModal}>
        <DollarOutlined /> Send Money
      </Button>
    </>
  );
};
