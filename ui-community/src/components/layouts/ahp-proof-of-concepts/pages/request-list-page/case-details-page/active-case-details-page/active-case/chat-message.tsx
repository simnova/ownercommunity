import { Avatar } from 'antd';
import { FC } from 'react';
import * as CmsComponents from '../../../../../../../editor/components';
import { Editor, Frame } from '@craftjs/core';

interface ChatMessageProps {
  sentBy: string;
  message: string;
  embedding: JSX.Element;
  createdAt: string;
  isAdmin: boolean;
}
export const ChatMessage: FC<ChatMessageProps> = (props) => {
  const caseWorkerStyles = {
    border: '1px solid black',
    background: '#d4d8f7',
    margin: '10px 5px',
    padding: '10px',
    color: 'black',
    borderRadius: '5px'
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
          justifyContent: props.sentBy === 'internal' && props.isAdmin ? 'flex-end' : 'flex-start'
        }}
      >
        <div
          style={{
            maxWidth: '75%',
            display: 'flex',
            flexDirection: props.sentBy === 'internal' && props.isAdmin ? 'row-reverse' : 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        >
          <div
            style={{
              marginRight: 10
            }}
          >
            <Avatar
              style={{
                marginLeft: 5
              }}
              size="large"
            >
              {props.sentBy === 'internal' && props.isAdmin ? 'Intealth' : placeHolderInitials}
            </Avatar>
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
                textAlign: props.sentBy === 'internal' && props.isAdmin ? 'right' : 'left'
              }}
            >
              {props.createdAt}
            </div>
            <div style={props.sentBy === 'internal' && props.isAdmin ? caseWorkerStyles : applicantStyles}>
              {props.message}
              {props.embedding && (
                <Editor resolver={{ ...CmsComponents }}>
                  <Frame>
                    {props.embedding}
                  </Frame>
                </Editor>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
