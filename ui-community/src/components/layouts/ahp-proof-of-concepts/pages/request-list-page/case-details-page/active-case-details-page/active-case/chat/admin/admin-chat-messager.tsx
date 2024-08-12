import TextArea from 'antd/lib/input/TextArea';
import { FC, useEffect, useState } from 'react';
import { Button, Tag } from 'antd';
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
  const [request, setRequest] = useState<any>(null);
  const [updateServiceTicket] = useMutation(
    isServiceTicket
      ? ChatMessagesContainerServiceTicketUpdateDocument
      : ChatMessagesContainerViolationTicketUpdateDocument
  );

  const updateEmbedding = (request: any[]) => {
    setRequest(request);
  };

  function repeatEveryMinute() {
    setInterval(props.updateMessage, 60000);
  }

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (message === '') {
      return;
    }
    let embeddedData = undefined;

    if (request) {
      if (request.value === 'sendMoney') {
        embeddedData = JSON.stringify({
          type: 'sendMoney',
          amount: request.amount,
          reason: request.reason
        });
      } else if (request.value === 'requestPayment') {
        embeddedData = JSON.stringify({
          type: 'requestPayment',
          amount: request.amount,
          reason: request.reason,
          completed: false,
          success: false
        });
      } else if (request.value === 'documentRequestType') {
        embeddedData = JSON.stringify({
          type: 'documentRequestType',
          changesRequested: {
            updateAssignment: request.updateAssignment,
            updateProperty: request.updateProperty,
            updateStatus: request.updateStatus
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

    if (request && request.value === 'documentRequestType') {
      input.revisionRequest = {
        requestedChanges: {
          requestUpdatedAssignment: request.updatedAssignment,
          requestUpdatedProperty: request.updatedProperty,
          requestUpdatedStatus: request.updatedStatus
        }
      };
    }

    await updateServiceTicket({
      variables: {
        input: input
      }
    });

    setMessage('');
    setRequest(null);
    props.updateMessage();
  };

  const removeRequest = () => {
    setRequest(null);
  };

  useEffect(() => {}, [request]);

  repeatEveryMinute();

  return (
    <div
      style={{
        gridColumn: 1,
        borderRadius: '8px',
        background: '#2a2e360d',
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
              paddingRight: '80px',
              width: '100%',
              padding: '10px',
              paddingBottom: request !== null ? '60px' : '10px'
            }}
            onKeyDown={handleKeyDown}
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
          {request && (
            <Tag
              onClose={removeRequest}
              key={request.value}
              closable
              style={{ borderRadius: '8px', position: 'absolute', bottom: 0, left: 0, margin: '10px' }}
            >
              {request.icon} {request.message}
            </Tag>
          )}
        </div>
      </div>
    </div>
  );
};
