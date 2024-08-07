import TextArea from 'antd/lib/input/TextArea';
import { FC, useState } from 'react';
import { Button } from 'antd';
import { useMutation } from '@apollo/client';
import {
  ChatMessagesContainerServiceTicketUpdateDocument,
  ChatMessagesContainerViolationTicketUpdateDocument
} from '../../../../../../../../../../generated';
import { useParams } from 'react-router-dom';

interface ChatMessagerProps {
  updateMessage: () => void;
}

export const MemberChatMessager: FC<ChatMessagerProps> = (props) => {
  const params = useParams();
  const isServiceTicket = window.location.href.indexOf('ServiceTicketType') > -1;
  const [message, setMessage] = useState('');
  const [updateServiceTicket] = useMutation(
    isServiceTicket
      ? ChatMessagesContainerServiceTicketUpdateDocument
      : ChatMessagesContainerViolationTicketUpdateDocument
  );

  function repeatEveryMinute() {
    setInterval(props.updateMessage, 60000);
  }

  const sendMessage = async () => {
    if (message === '') {
      return;
    }
    const input: any = isServiceTicket
      ? {
          serviceTicketId: params.id,
          messages: [
            {
              sentBy: 'external',
              message: message,
              embedding: undefined
            }
          ]
        }
      : {
          violationTicketId: params.id,
          messages: [
            {
              sentBy: 'external',
              message: message,
              embedding: undefined
            }
          ]
        };

    await updateServiceTicket({
      variables: {
        input: input
      }
    });
    setMessage('');
    props.updateMessage();
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
          width: '85%'
        }}
      >
        <div
          style={{
            paddingBottom: '10px'
          }}
        >
        </div>
        <TextArea
          style={{ borderRadius: '0px' }}
          autoSize={{
            minRows: 3,
            maxRows: 5
          }}
          onChange={(e: any) => setMessage(e.target.value)}
          value={message}
        />
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
