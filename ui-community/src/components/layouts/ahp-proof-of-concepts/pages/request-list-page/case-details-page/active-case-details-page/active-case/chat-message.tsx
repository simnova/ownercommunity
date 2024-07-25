import { Avatar } from 'antd';
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
    background: '#d4d8f7',
    margin: '10px 5px',
    padding: '10px',
    color: 'black',
    borderRadius: '5px',
  };
  const applicantStyles = {
    border: '1px solid black',
    background: '#f6b8a2',
    margin: '10px 5px',
    padding: '10px',
    color: 'black',
    borderRadius: '5px'
  };

  const placeHolderInitials = 'JM';

  return (
    <div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: props.sentBy === 'internal' ? 'flex-end' : 'flex-start'
        }}
      >
        <div
          style={{
            width: '75%',
            display: 'flex',
            flexDirection: props.sentBy === 'internal' ? 'row-reverse' : 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        >
          <div
            style={{
              marginRight: 10
            }}
          >
            <Avatar style={{
              marginLeft: 5
            }}size="large">{props.sentBy === 'internal' ? 'Intealth' : placeHolderInitials}</Avatar>
          </div>
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div
              style={{
                marginTop: 10,
                color: 'grey',
                fontSize: '10px',
                textAlign: props.sentBy === 'internal' ? 'right' : 'left'
              }}
            >
              {props.createdAt}
            </div>
            <div style={props.sentBy === 'internal' ? caseWorkerStyles : applicantStyles}>{props.message}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
