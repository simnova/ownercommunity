import TextArea from 'antd/lib/input/TextArea';
import { FC, useState } from 'react';
import { Button, Tag, Form } from 'antd';
import { useMutation } from '@apollo/client';
import {
  ChatMessagesContainerServiceTicketUpdateDocument,
  ChatMessagesContainerViolationTicketUpdateDocument
} from '../../../../../../../../../../generated';
import { RequestFeedbackButton } from './request-feedback-button';
import { RequestPaymentButton } from './request-payment-button';
import { SendMoneyButton } from './send-money-button';
import { useParams } from 'react-router-dom';
import { SendOutlined } from '@ant-design/icons';

interface ChatMessagerProps {
  updateMessage: () => void;
}

export const AdminChatMessager: FC<ChatMessagerProps> = (props) => {
  const params = useParams();
  const isServiceTicket = window.location.href.indexOf('ServiceTicketType') > -1;
  const [message, setMessage] = useState('');
  const [requests, setRequests] = useState<any[]>([]);
  const [updateServiceTicket] = useMutation(
    isServiceTicket
      ? ChatMessagesContainerServiceTicketUpdateDocument
      : ChatMessagesContainerViolationTicketUpdateDocument
  );

  const updateEmbedding = (requests: any[]) => {
    setRequests(requests);
  };

  function repeatEveryMinute() {
    setInterval(props.updateMessage, 60000);
  }

  const sendMessage = async () => {
    if (message === '') {
      return;
    }
    let embeddedData = undefined;
    const documentRequestTypes = ['updateAssignment', 'updateProperty', 'updateStatus'];

    if (requests.length > 0) {
      const mainRequest = requests[0];
      if (mainRequest.value === 'sendMoney') {
        embeddedData = JSON.stringify({
          type: 'sendMoney',
          amount: mainRequest.amount,
          reason: mainRequest.reason
        });
      } else if (mainRequest.value === 'requestPayment') {
        embeddedData = JSON.stringify({
          type: 'requestPayment',
          amount: mainRequest.amount,
          reason: mainRequest.reason,
          completed: false,
          success: false
        });
      } else if (documentRequestTypes.includes(mainRequest.value)) {
        embeddedData = JSON.stringify({
          type: 'documentRequestType',
          changesRequested: {
            updateAssignment: requests.findIndex((x) => x.value === 'updateAssignment') !== -1,
            updateProperty: requests.findIndex((x) => x.value === 'updateProperty') !== -1,
            updateStatus: requests.findIndex((x) => x.value === 'updateStatus') !== -1
          }
        });
      }
    }

    let input: any = isServiceTicket
      ? {
          serviceTicketId: params.id,
          messages: [
            {
              sentBy: 'internal',
              message: message,
              embedding: embeddedData ?? ''
            }
          ]
        }
      : {
          violationTicketId: params.id,
          messages: [
            {
              sentBy: 'internal',
              message: message,
              embedding: embeddedData ?? ''
            }
          ]
        };

    if (requests.length > 0 && documentRequestTypes.includes(requests[0].value)) {
      input.revisionRequest = {
        requestedChanges: {
          requestUpdatedAssignment: requests.findIndex((x) => x.value === 'updateAssignment') !== -1,
          requestUpdatedProperty: requests.findIndex((x) => x.value === 'updateProperty') !== -1,
          requestUpdatedStatus: requests.findIndex((x) => x.value === 'updateStatus') !== -1
        }
      };
    }

    await updateServiceTicket({
      variables: {
        input: input
      }
    });

    setMessage('');
    setRequests([]);
    props.updateMessage();
  };

  const removeRequest = (value: string) => {
    let tempRequests = requests.slice();
    const index = tempRequests.findIndex((x) => x.value === value);
    tempRequests.splice(index, 1);
    setRequests(tempRequests);
  };

  repeatEveryMinute();

  return (
    <div
      style={{
        gridColumn: 1,
        borderRadius: '8px',
        background: '#2a2e3608',
        borderTop: '0px',
        width: '75%',
        display: 'flex'
      }}
    >
      <div
        style={{
          padding: '15px 20px',
          width: '100%'
        }}
      >
        {requests.map((request: any) => {
          return (
            <Tag
              onClose={() => removeRequest(request.value)}
              key={request.value}
              closable
              style={{ borderRadius: '8px' }}
            >
              {request.icon} {request.message}
            </Tag>
          );
        })}
        <div
          style={{
            width: '50%',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignContent: 'stretch'
          }}
        >
          <RequestFeedbackButton updateEmbedding={updateEmbedding} />
          <RequestPaymentButton updateEmbedding={updateEmbedding} />
          <SendMoneyButton updateEmbedding={updateEmbedding} />
        </div>
        <div style={{ position: 'relative' }}>
          <TextArea
            style={{
              borderRadius: '8px',
              paddingRight: '40px',
              width: '100%',
              padding: '10px',
              overflow: 'auto'
            }}
            autoSize={true}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder="Type a message..."
          />
          <Button
            style={{
              position: 'absolute',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              paddingLeft: 5
            }}
            onClick={sendMessage}
          >
            <SendOutlined />
          </Button>
        </div>
      </div>
    </div>
  );
};
