import { Button } from 'antd';
import React from 'react';

interface SendMoneyFormProps {
  amount: number;
  reason: string;
  isAdmin: boolean;
}

const SendMoneyForm: React.FC<SendMoneyFormProps> = (props) => {
  
  const applicantView = (
    <div>
      <div
        style={{
          border: '1px solid black',
          margin: '10px 5px',
          padding: '10px',
          color: 'black',
          borderRadius: '5px',
          display: 'flex',
          justifyContent: 'space-between',
          background: '#D2F9D2',
          width: '100%'
        }}
      >
        <div style={{ marginTop: 7 }}>
          ${props.amount} Received Successfully for {props.reason}
        </div>{' '}
        <Button>Download Receipt</Button>
      </div>
    </div>
  );

  const caseWorkerView = (
    <div>
      <div
        style={{
          border: '1px solid black',
          margin: '10px 5px',
          padding: '10px',
          color: 'black',
          borderRadius: '5px',
          display: 'flex',
          justifyContent: 'space-between',
          background: '#D2F9D2',
          width: '100%'
        }}
      >
        <div style={{ marginTop: 7 }}>
          ${props.amount} Sent Successfully for {props.reason}
        </div>{' '}
        <Button>Download Receipt</Button>
      </div>
    </div>
  );

  return <> {props.isAdmin ? caseWorkerView : applicantView}</>;
};

export default SendMoneyForm;
