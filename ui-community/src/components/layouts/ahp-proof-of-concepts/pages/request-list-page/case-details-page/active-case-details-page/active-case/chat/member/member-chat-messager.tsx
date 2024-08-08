import TextArea from 'antd/lib/input/TextArea';
import { FC, useState } from 'react';
import { Button } from 'antd';
import { useMutation } from '@apollo/client';
import {
  ChatMessagesContainerServiceTicketUpdateDocument,
  ChatMessagesContainerViolationTicketUpdateDocument
} from '../../../../../../../../../../generated';
import { useParams } from 'react-router-dom';
import { SendOutlined } from '@ant-design/icons';

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
