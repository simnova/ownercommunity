import { Button } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';

interface PaymentRequestFormProps {
  amount: number;
  reason: string;
  isAdmin: boolean;
}

const PaymentRequestForm: React.FC<PaymentRequestFormProps> = (props) => {
  const [completed, setCompleted] = useState(false);
  const [success, setSuccess] = useState(false);

  const rejectPayment = () => {
    setCompleted(true);
    setSuccess(false);
  };

  const sendPayment = () => {
    setCompleted(true);
    setSuccess(true);
  };

  const applicantView = completed ? (
    success ? (
      <div>
        Your card was charged successfully, you can download your receipt if you wish, or you can visit the transactions
        tab to see your transactions and update your payment info.
        <div
          style={{
            border: '1px solid black',
            margin: '10px 5px',
            padding: '10px',
            color: 'black',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            background: '#D2F9D2'
          }}
        >
          <div style={{ marginTop: 7 }}>${props.amount} Sent Successfully</div> <Button>Download Reciept</Button>
        </div>
      </div>
    ) : (
      <div>
        The request for ${props.amount} was declined.
        <div
          style={{
            border: '1px solid black',
            margin: '10px 5px',
            padding: '10px',
            color: 'black',
            borderRadius: '5px',
            background: '#FFADB0'
          }}
        >
          ${props.amount} Request Rejected
        </div>
      </div>
    )
  ) : (
    <div>
      <Title
        level={5}
        style={{
          marginBottom: 15
        }}
      >
        Payment Requested
      </Title>
      Intealth requests ${props.amount} for {props.reason}
      <br></br>
      <br></br>
      Your card will be charged ${props.amount} if you approve this request
      {/* <BillingInfoContainer data={null} /> */}
      <div style={{ justifyContent: 'space-between', display: 'flex' }}>
        <Button type={'primary'} style={{ marginTop: '15px' }} danger onClick={rejectPayment}>
          Reject
        </Button>
        <Button type={'primary'} style={{ marginTop: '15px' }} onClick={sendPayment}>
          Send ${props.amount}
        </Button>
      </div>
    </div>
  );

  const caseWorkerView = completed ? (
    success ? (
      <div>
        Applicant successfully sent a payment of ${props.amount}, you can download your receipt if you wish, or you can
        visit the transactions tab to see your transactions.
        <div
          style={{
            border: '1px solid black',
            margin: '10px 5px',
            padding: '10px',
            color: 'black',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            background: '#D2F9D2'
          }}
        >
          <div style={{ marginTop: 7 }}>${props.amount} Received</div> <Button>Download Receipt</Button>
        </div>
      </div>
    ) : (
      <div>
        The request for ${props.amount} was declined by applicant.
        <div
          style={{
            border: '1px solid black',
            margin: '10px 5px',
            padding: '10px',
            color: 'black',
            borderRadius: '5px',
            background: '#FFADB0'
          }}
        >
          ${props.amount} Request Rejected
        </div>
      </div>
    )
  ) : (
    <div>
      <Title
        level={5}
        style={{
          marginBottom: 15
        }}
      >
        Payment Requested
      </Title>
      <div
        style={{
          border: '1px solid black',
          margin: '10px 5px',
          padding: '10px',
          color: 'black',
          borderRadius: '5px',
          background: '#FFDBBB'
        }}
      >
        <b> Awaiting Applicant Response</b>
        <br></br>
        <br></br>
        <b>Payment:</b> ${props.amount}
        <br></br>
        <b>Reason: </b> "{props.reason}"
      </div>
    </div>
  );

  return (
    <div
      style={{
        backgroundColor: 'white',
        paddingTop: '20px',
        paddingBottom: '20px',
        paddingLeft: '20px',
        paddingRight: '20px',
        margin: 10,
        border: '1px solid black',
        textAlign: 'left'
      }}
    >
      {props.isAdmin ? caseWorkerView : applicantView}
    </div>
  );
};

export default PaymentRequestForm;
