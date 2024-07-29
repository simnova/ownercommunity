import { useNode } from '@craftjs/core';
import { TextComponent } from './text-component';
import { TextThing } from './text-thing';
import { Button } from 'antd';

interface AhpIdFormConfirmationProps {
  fileName: string;
  blobPath: string;
  value: number;
  response: string;
  submitted: boolean;
}

const AhpSendMoneyFormTop = (props: any) => {
  const {
    connectors: { connect }
  } = useNode();
  return <div ref={(ref) => connect(ref as HTMLDivElement)}>{props.children}</div>;
};

AhpSendMoneyFormTop.craft = {
  rules: {
    canMoveIn: (incomingNodes: any[]) =>
      incomingNodes.every((incomingNode) => incomingNode.data.type === TextComponent || TextThing)
  }
};
const AhpSendMoneyForm: any = ({}: AhpIdFormConfirmationProps) => {
  const {
    actions: {  }
  } = useNode((state) => ({
    selected: state.events.selected
  }));

  const isAdmin = true;

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
        <div style={{ marginTop: 7 }}>$30 Received Successfully</div> <Button>Download Receipt</Button>
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
        <div style={{ marginTop: 7 }}>$30 Sent Successfully</div> <Button>Download Receipt</Button>
      </div>
    </div>
  );

  return <> {isAdmin ? caseWorkerView : applicantView}</>;
};

AhpSendMoneyForm.craft = {
  props: {
    bgColor: '#ffffff',
    padding: 0
  }
};

export { AhpSendMoneyForm, AhpSendMoneyFormTop };
