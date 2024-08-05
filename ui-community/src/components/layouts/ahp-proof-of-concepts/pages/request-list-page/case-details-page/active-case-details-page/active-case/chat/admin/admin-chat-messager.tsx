import TextArea from 'antd/lib/input/TextArea';
import { FC, useState } from 'react';
import { Button, Tag } from 'antd';
import { useMutation } from '@apollo/client';
import { ChatMessagesContainerServiceTicketUpdateDocument } from '../../../../../../../../../../generated';
import { RequestFeedbackButton } from './request-feedback-button';
import { RequestPaymentButton } from './request-payment-button';
import { SendMoneyButton } from './send-money-button';
import { useParams } from 'react-router-dom';

interface ChatMessagerProps {
  updateMessage: () => void;
}

export const AdminChatMessager: FC<ChatMessagerProps> = (props) => {
  const params = useParams();
  const [message, setMessage] = useState('');
  const [requests, setRequests] = useState<any[]>([]);
  const [updateServiceTicket] = useMutation(ChatMessagesContainerServiceTicketUpdateDocument, {
    onCompleted: () => {}
  });

  const updateEmbedding = (requests: any[]) => {
    setRequests(requests);
  };

  function repeatEverySecond() {
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

    let input: any = {
      serviceTicketId: params.id,
      messages: [
        {
          sentBy: 'internal',
          message: message,
          embedding: embeddedData ?? ''
        }
      ]
    };

    if (documentRequestTypes.includes(requests[0].value)) {
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

  repeatEverySecond();

  return (
    <div style={{ gridColumn: 1, border: '1px solid black', borderTop: '0px', width: '75%', display: 'flex' }}>
      <div
        style={{
          padding: '15px 20px',
          width: '85%'
        }}
      >
        <div
          style={{
            paddingBottom: '10px'
          }}
        >
          Message
        </div>
        {requests.map((request: any) => {
          return (
            <Tag onClose={() => removeRequest(request.value)} key={request.value} closable>
              {request.icon} {request.message}
            </Tag>
          );
        })}
        <TextArea
          style={{ borderRadius: '0px' }}
          autoSize={{
            minRows: 3,
            maxRows: 5
          }}
          onChange={(e: any) => setMessage(e.target.value)}
          value={message}
        />
        <div
          style={{
            width: 'auto',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignContent: 'stretch'
          }}
        >
          <RequestFeedbackButton updateEmbedding={updateEmbedding} />
          <RequestPaymentButton updateEmbedding={updateEmbedding} />
          <SendMoneyButton updateEmbedding={updateEmbedding} />
        </div>
      </div>
      <Button
        style={{
          marginTop: '40px',
          marginLeft: '10px'
        }}
        onClick={sendMessage}
      >
        Send
      </Button>
    </div>
  );
};
