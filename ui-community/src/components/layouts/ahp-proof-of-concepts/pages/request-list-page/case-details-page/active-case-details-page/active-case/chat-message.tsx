import { FC } from 'react';

interface ChatMessageProps {
  sentBy: string;
  message: string;
  embedding: string;
  createdAt: string;
}
export const ChatMessage: FC<ChatMessageProps> = (props) => {
  const caseWorkerStyles = {
    border: '1px solid black',
    width: '75%',
    background: '#8890EB',
    margin: '10px 5px',
    padding: '10px',
    color: 'black',
    borderRadius: '5px'
  };
  const applicantStyles = {
    border: '1px solid black',
    width: '75%',
    background: '#ED693A',
    margin: '10px 5px',
    padding: '10px',
    color: 'black',
    borderRadius: '5px'
  };

  return (
    <>
      <div style={{ float: props.sentBy === 'internal' ? 'right' : 'left', paddingLeft: 5, paddingRight: 5 }}>
        {props.createdAt}
      </div>
      <div
        style={[
          props.sentBy === 'internal' ? caseWorkerStyles : applicantStyles,
          { float: props.sentBy === 'internal' ? 'right' : 'left' }
        ]}
      >
        {props.message}
      </div>
    </>
  );
};
