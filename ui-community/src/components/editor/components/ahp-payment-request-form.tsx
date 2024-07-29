import { useNode } from '@craftjs/core';
import { TextComponent } from './text-component';
import { TextThing } from './text-thing';
import Title from 'antd/es/typography/Title';
import { Button } from 'antd';

interface AhpIdFormConfirmationProps {
  fileName: string;
  blobPath: string;
  value: number;
  response: string;
  submitted: boolean;
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
const AhpPaymentRequestForm: any = ({}: AhpIdFormConfirmationProps) => {
  const {
    actions: { setProp }
  } = useNode((state) => ({
    selected: state.events.selected
  }));

  const isAdmin = false;
  const transctionStatus = {
    completed: false,
    success: false
  };

  const applicantView = transctionStatus.completed ? (
    transctionStatus.success ? (
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
          <div style={{ marginTop: 7 }}>$30 Sent Successfully</div> <Button>Download Reciept</Button>
        </div>
      </div>
    ) : (
      <div>
        The request for $30 was declined.
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
          30$ Request Rejected
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
      Intealth requests $30 for Courier Fee
      <br></br>
      <br></br>
      Your card will be charged $30 if you approve this request
      {/* <BillingInfoContainer data={null} /> */}
      <div style={{ justifyContent: 'space-between', display: 'flex' }}>
        <Button type={'primary'} style={{ marginTop: '15px' }} danger>
          Reject
        </Button>
        <Button type={'primary'} style={{ marginTop: '15px' }}>
          Send $30
        </Button>
      </div>
    </div>
  );
  //display: 'block', marginLeft: 'auto', marginRight: 0
  const caseWorkerView = transctionStatus.completed ? (
    transctionStatus.success ? (
      <div>
        Applicant successfully sent a payment of $30, you can download your receipt if you wish, or you can visit the
        transactions tab to see your transactions.
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
          <div style={{ marginTop: 7 }}>30$ Received</div> <Button>Download Receipt</Button>
        </div>
      </div>
    ) : (
      <div>
        The request for $30 was declined by applicant.
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
          30$ Request Rejected
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
        <b>Payment:</b> $30
        <br></br>
        <b>Reason: </b> "Courier Fee"
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
