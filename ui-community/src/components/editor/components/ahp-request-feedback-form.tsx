import { useNode } from '@craftjs/core';
import { TextComponent } from './text-component';
import { TextThing } from './text-thing';

interface AhpIdFormConfirmationProps {
  fileName: string;
  blobPath: string;
  value: number;
  response: string;
  submitted: boolean;
}

const AhpRequestFeedbackFormTop = (props: any) => {
  const {
    connectors: { connect }
  } = useNode();
  return <div ref={(ref) => connect(ref as HTMLDivElement)}>{props.children}</div>;
};

AhpRequestFeedbackFormTop.craft = {
  rules: {
    canMoveIn: (incomingNodes: any[]) =>
      incomingNodes.every((incomingNode) => incomingNode.data.type === TextComponent || TextThing)
  }
};
const AhpRequestFeedbackForm: any = ({}: AhpIdFormConfirmationProps) => {
  const {
    actions: {  }
  } = useNode((state) => ({
    selected: state.events.selected
  }));

  const isAdmin = false;
  const changesRequested = {
    credentialType: true,
    credential: false,
    credentialTranslation: false,
    issuingInstitution: true,
    nameOnDocument: true
  };

  const applicantView = (
    <div>
      Your application is unlocked, you can now update the:
      <br></br>
      <br></br>
      {changesRequested.credentialType && (
        <li>
          <b>Credential Type</b>
        </li>
      )}
      {changesRequested.credential && (
        <li>
          <b>Credential</b>
        </li>
      )}
      {changesRequested.credentialTranslation && (
        <li>
          <b>Credential Translation</b>
        </li>
      )}
      {changesRequested.issuingInstitution && (
        <li>
          <b>Issuing Institution</b>
        </li>
      )}
      {changesRequested.nameOnDocument && (
        <li>
          <b>Name on Document</b>
        </li>
      )}
      <br></br>
      <br></br>
      in the application tab above.
    </div>
  );

  const caseWorkerView = (
    <div>
      The applicants application has been opened and can now update the:
      <br></br>
      <br></br>
      {changesRequested.credentialType && (
        <li>
          <b>Credential Type</b>
        </li>
      )}
      {changesRequested.credential && (
        <li>
          <b>Credential</b>
        </li>
      )}
      {changesRequested.credentialTranslation && (
        <li>
          <b>Credential Translation</b>
        </li>
      )}
      {changesRequested.issuingInstitution && (
        <li>
          <b>Issuing Institution</b>
        </li>
      )}
      {changesRequested.nameOnDocument && (
        <li>
          <b>Name on Document</b>
        </li>
      )}
      <br></br>
      <br></br>
      in the application tab.
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

AhpRequestFeedbackForm.craft = {
  props: {
    bgColor: '#ffffff',
    padding: 0
  }
};

export { AhpRequestFeedbackForm, AhpRequestFeedbackFormTop };
