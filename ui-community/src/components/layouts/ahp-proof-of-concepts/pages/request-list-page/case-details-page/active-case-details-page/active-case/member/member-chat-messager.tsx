import TextArea from 'antd/lib/input/TextArea';
import { FC, useState } from 'react';
import { Button } from 'antd';
import { useMutation } from '@apollo/client';
import { ChatMessagesContainerServiceTicketUpdateDocument } from '../../../../../../../../../generated';


interface ChatMessagerProps {
  updateMessage: () => void;
}

export const MemberChatMessager: FC<ChatMessagerProps> = (props) => {
  const [message, setMessage] = useState('');
  const [updateServiceTicket] = useMutation(ChatMessagesContainerServiceTicketUpdateDocument);

  const sendMessage = async () => {
    if (message === '') {
      return;
    }
    await updateServiceTicket({
      variables: {
        input: {
          serviceTicketId: '66a7eb82ef9aff668fe0d5b9',
          messages: [
            {
              sentBy: 'external',
              message: message,
              embedding: undefined
            }
          ]
        }
      }
    });
    setMessage('');
    props.updateMessage();
  };

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
