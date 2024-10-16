import React, { useState } from 'react';

interface RequestFeedbackFormProps {
  changesRequested?: {
    updateAssignment: boolean;
    updateProperty: boolean;
    updateStatus: boolean;
  };
  isAdmin: boolean;
}

const RequestFeedbackForm: React.FC<RequestFeedbackFormProps> = (props) => {
  const [changesRequested] = useState(
    props.changesRequested || {
      updateAssignment: false,
      updateProperty: false,
      updateStatus: false
    }
  );

  const applicantView = (
    <div>
      Your application is unlocked, you can now update the:
      <br></br>
      <br></br>
      {changesRequested?.updateAssignment && (
        <li>
          <b>Document Assignment</b>
        </li>
      )}
      {changesRequested?.updateProperty && (
        <li>
          <b>Document Property</b>
        </li>
      )}
      {changesRequested?.updateStatus && (
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
      <ul>
        {changesRequested?.updateAssignment && (
          <li>
            <b>Document Assignment</b>
          </li>
        )}
        {changesRequested?.updateProperty && (
          <li>
            <b>Document Property</b>
          </li>
        )}
        {changesRequested?.updateStatus && (
          <li>
            <b>Document Status</b>
          </li>
        )}
      </ul>
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
        textAlign: 'left',
        border: '1px solid #d9d9d9',
        borderRadius: '8px'
      }}
    >
      {props.isAdmin ? caseWorkerView : applicantView}
    </div>
  );
};

export default RequestFeedbackForm;
