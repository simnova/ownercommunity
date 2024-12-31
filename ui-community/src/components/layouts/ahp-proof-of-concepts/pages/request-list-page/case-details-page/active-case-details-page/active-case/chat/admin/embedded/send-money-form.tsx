import { Button } from 'antd';
import React from 'react';

interface SendMoneyFormProps {
  amount: number;
  reason: string;
  isAdmin: boolean;
}

export const SendMoneyForm: React.FC<SendMoneyFormProps> = (props) => {
  const commonStyles = {
    padding: '10px',
    color: 'black',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    background: '#D2F9D2',
    width: '100%',
    margin: '10px 5px',
  };

  const message = props.isAdmin
    ? `$${props.amount} Sent Successfully for ${props.reason}`
    : `$${props.amount} Received Successfully for ${props.reason}`;

  return (
    <div style={{ padding: 5 }}>
      <div style={commonStyles}>
        <div style={{ marginTop: 7 }}>{message}</div>
        <Button>Download Receipt</Button>
      </div>
    </div>
  );
};