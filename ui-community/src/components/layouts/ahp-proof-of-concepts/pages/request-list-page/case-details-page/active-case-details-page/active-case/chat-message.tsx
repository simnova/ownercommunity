import { Avatar } from 'antd';
import { FC } from 'react';
import * as CmsComponents from '../../../../../../../editor/components';
import { Editor, Frame } from '@craftjs/core';
import dayjs from 'dayjs';

interface ChatMessageProps {
  sentBy: string;
  message: string;
  embedding: string | undefined;
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
  const toggle = (props.sentBy === 'internal' && props.isAdmin) || (props.sentBy === 'external' && !props.isAdmin);

  const getEmbededComponent = () => {
    if (props.embedding) {
      const componentData = JSON.parse(props.embedding);
      if (componentData.type === 'documentRequestType') {
        return (
          <CmsComponents.AhpRequestFeedbackForm
            changesRequested={componentData.changesRequested}
            isAdmin={props.isAdmin}
          />
        );
      } else if (componentData.type === 'requestPayment') {
        return (
          <CmsComponents.AhpPaymentRequestForm
            amount={componentData.amount}
            reason={componentData.reason}
            isAdmin={props.isAdmin}
          />
        );
      } else if (componentData.type === 'sendMoney') {
        return (
          <CmsComponents.AhpSendMoneyForm
            amount={componentData.amount}
            reason={componentData.reason}
            isAdmin={props.isAdmin}
          />
        );
      }
    }
    return <></>;
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: toggle ? 'flex-end' : 'flex-start'
        }}
      >
        <div
          style={{
            maxWidth: '75%',
            display: 'flex',
            flexDirection: toggle ? 'row-reverse' : 'row',
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
              {props.sentBy === 'internal' ? 'Intealth' : placeHolderInitials}
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
                textAlign: toggle ? 'right' : 'left'
              }}
            >
              {dayjs(props.createdAt).format('MM/DD/YYYY hh:mm A').toString()}
            </div>
            <div style={toggle ? caseWorkerStyles : applicantStyles}>
              {props.message}
              {props.embedding && (
                <Editor resolver={{ ...CmsComponents }}>
                  <Frame>{getEmbededComponent()}</Frame>
                </Editor>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
