import { FC } from 'react';
import { ChatMessage } from './chat-message';
import { ServiceTicket } from '../../../../../../../../generated';

interface ChatMessagesProps {
  data: ServiceTicket;
  isAdmin: boolean;
}
export const ChatMessages: FC<ChatMessagesProps> = (props) => {
  return (
    <div
      style={{
        gridColumn: 1,
        border: '1px solid black',
        width: '75%',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        maxHeight: '400px',
        minHeight: '400px'
      }}
    >
      {props?.data?.messages?.map((message: any) => {
        return (
          <ChatMessage
            sentBy={message.sentBy}
            message={message.message}
            embedding={message.embedding}
            createdAt={message.createdAt}
            isAdmin={props.isAdmin}
          />
        );
      })}
    </div>
  );
};
