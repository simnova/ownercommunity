import React, { useState } from 'react';

interface RequestFeedbackFormProps {
  changesRequested?: {
    requestUpdatedAssignment: boolean;
    requestUpdatedProperty: boolean;
    requestUpdatedStatus: boolean;
  };
  isAdmin: boolean;
}

const RequestFeedbackForm: React.FC<RequestFeedbackFormProps> = (props) => {
  const [changesRequested, setChangesRequested] = useState(
    props.changesRequested
      ? props.changesRequested
      : {
          requestUpdatedAssignment: false,
          requestUpdatedProperty: false,
          requestUpdatedStatus: false
        }
  );

  const applicantView = (
    <div>
      Your application is unlocked, you can now update the:
      <br></br>
      <br></br>
      {changesRequested?.requestUpdatedAssignment && (
        <li>
          <b>Document Assignment</b>
        </li>
      )}
      {changesRequested?.requestUpdatedProperty && (
        <li>
          <b>Document Property</b>
        </li>
      )}
      {changesRequested?.requestUpdatedStatus && (
        <li>
          <b>Document Status</b>
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
      {changesRequested?.requestUpdatedAssignment && (
        <li>
          <b>Document Assignment</b>
        </li>
      )}
      {changesRequested?.requestUpdatedProperty && (
        <li>
          <b>Document Property</b>
        </li>
      )}
      {changesRequested?.requestUpdatedStatus && (
        <li>
          <b>Document Status</b>
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
      {props.isAdmin ? caseWorkerView : applicantView}
    </div>
  );
};

export default RequestFeedbackForm;
