import { Avatar } from 'antd';
import { FC } from 'react';
import dayjs from 'dayjs';
import RequestFeedbackForm from './admin/embedded/request-feedback-form';
import PaymentRequestForm from './admin/embedded/payment-request-form';
import SendMoneyForm from './admin/embedded/send-money-form';

interface ChatMessageProps {
  id: string;
  sentBy: string;
  message: string;
  embedding: string | undefined;
  createdAt: string;
  isAdmin: boolean;
}
export const ChatMessage: FC<ChatMessageProps> = (props) => {
  const caseWorkerStyles = {
    background: '#d4d8f7',
    margin: '10px 5px',
    padding: '8px',
    color: 'black',
    borderRadius: '8px',
    fontWeight: '12px'
  };
  const applicantStyles = {
    // background: '#f6b8a2',
    background: "white",
    margin: '10px 5px',
    padding: '8px',
    color: 'black',
    borderRadius: '8px',
    fontWeight: '12px'
  };

  const placeHolderInitials = 'JM';
  const toggle = (props.sentBy === 'internal' && props.isAdmin) || (props.sentBy === 'external' && !props.isAdmin);

  const getEmbededComponent = () => {
    if (props.embedding) {
      const componentData = JSON.parse(props.embedding);
      if (componentData.type === 'documentRequestType') {
        return <RequestFeedbackForm changesRequested={componentData.changesRequested} isAdmin={props.isAdmin} />;
      } else if (componentData.type === 'requestPayment') {
        return (
          <PaymentRequestForm
            amount={componentData.amount}
            reason={componentData.reason}
            isAdmin={props.isAdmin}
            message={{
              id: props.id,
              message: props.message,
              sentBy: props.sentBy
            }}
            success={componentData.success}
            completed={componentData.completed}
          />
        );
      } else if (componentData.type === 'sendMoney') {
        return <SendMoneyForm amount={componentData.amount} reason={componentData.reason} isAdmin={props.isAdmin} />;
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
              {props.message} {getEmbededComponent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
