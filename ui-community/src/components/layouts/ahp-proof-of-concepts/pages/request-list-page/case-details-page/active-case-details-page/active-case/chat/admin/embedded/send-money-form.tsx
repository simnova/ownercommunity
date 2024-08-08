import { Button } from 'antd';
import React from 'react';

interface SendMoneyFormProps {
  amount: number;
  reason: string;
  isAdmin: boolean;
}

const SendMoneyForm: React.FC<SendMoneyFormProps> = (props) => {
  const applicantView = (
    <div style={{ paddingRight: '30px' }}>
      <div
        style={{
          padding: '10px',
          color: 'black',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          background: '#D2F9D2',
          width: '100%'
        }}
      >
        <div style={{ marginTop: 7, marginRight: 10 }}>
          ${props.amount} Received Successfully for "{props.reason}" 
        </div>
        <Button>Download Receipt</Button> 
      </div>
    </div>
  );

  const caseWorkerView = (
    <div>
      <div
        style={{
          margin: '10px 5px',
          padding: '10px',
          color: 'black',
          display: 'flex',
          justifyContent: 'space-between',
          background: '#D2F9D2',
          width: '100%',
          borderRadius: '8px'
        }}
      >
        <div style={{ marginTop: 7 }}>
          ${props.amount} Sent Successfully for {props.reason}
        </div>{' '}
        <Button>Download Receipt</Button>
      </div>
    </div>
  );

  return (
    <div
      style={{
        padding: 5
      }}
    >
      {props.isAdmin ? caseWorkerView : applicantView}{' '}
    </div>
  );
};

export default SendMoneyForm;
