import { useNode } from '@craftjs/core';
import { TextComponent } from './text-component';
import { TextThing } from './text-thing';
import Title from 'antd/es/typography/Title';
import { Button } from 'antd';

interface AhpPaymentRequestFormProps {
  completed: boolean;
  success: boolean;
  amount: string;
  reason: string;
  isAdmin: boolean
}

const AhpPaymentRequestFormTop = (props: any) => {
  const {
    connectors: { connect }
  } = useNode();
  return <div ref={(ref) => connect(ref as HTMLDivElement)}>{props.children}</div>;
};

AhpPaymentRequestFormTop.craft = {
  rules: {
    canMoveIn: (incomingNodes: any[]) =>
      incomingNodes.every((incomingNode) => incomingNode.data.type === TextComponent || TextThing)
  }
};
const AhpPaymentRequestForm: any = ({ completed, success, amount, reason, isAdmin }: AhpPaymentRequestFormProps) => {
  const {
    actions: { setProp }
  } = useNode((state) => ({
    selected: state.events.selected,
    completed: state.data.props.completed,
    success: false
  }));

  const rejectPayment = () => {
    setProp((props: any) => {
      props.completed = true;
      props.success = false;
    });
  };

  const sendPayment = () => {
    setProp((props: any) => {
      props.completed = true;
      props.success = true;
    });
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
          <div style={{ marginTop: 7 }}>${amount} Sent Successfully</div> <Button>Download Reciept</Button>
        </div>
      </div>
    ) : (
      <div>
        The request for ${amount} was declined.
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
          ${amount} Request Rejected
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
      Intealth requests ${amount} for {reason}
      <br></br>
      <br></br>
      Your card will be charged ${amount} if you approve this request
      {/* <BillingInfoContainer data={null} /> */}
      <div style={{ justifyContent: 'space-between', display: 'flex' }}>
        <Button type={'primary'} style={{ marginTop: '15px' }} danger onClick={rejectPayment}>
          Reject
        </Button>
        <Button type={'primary'} style={{ marginTop: '15px' }} onClick={sendPayment}>
          Send ${amount}
        </Button>
      </div>
    </div>
  );

  const caseWorkerView = completed ? (
    success ? (
      <div>
        Applicant successfully sent a payment of ${amount}, you can download your receipt if you wish, or you can visit
        the transactions tab to see your transactions.
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
          <div style={{ marginTop: 7 }}>${amount} Received</div> <Button>Download Receipt</Button>
        </div>
      </div>
    ) : (
      <div>
        The request for ${amount} was declined by applicant.
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
          ${amount} Request Rejected
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
        <b>Payment:</b> ${amount}
        <br></br>
        <b>Reason: </b> "{reason}"
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
      {isAdmin ? caseWorkerView : applicantView}
    </div>
  );
};

AhpPaymentRequestForm.craft = {
  props: {
    bgColor: '#ffffff',
    padding: 0
  }
};

export { AhpPaymentRequestForm, AhpPaymentRequestFormTop };
