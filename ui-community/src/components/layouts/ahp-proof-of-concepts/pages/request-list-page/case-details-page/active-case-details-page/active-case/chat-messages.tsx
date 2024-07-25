import { FC } from 'react';
import { ChatMessage } from './chat-message';

interface ChatMessagesProps {
  data: {
    embedding: string;
    sentBy: string;
    message: string;
    createdAt: string;
  }[];
}
export const ChatMessages: FC<ChatMessagesProps> = (props) => {
  return (
    <div style={{ gridColumn: 1, border: '1px solid black', width: '75%', maxHeight: "1000px", overflowY: "scroll" }}>
      {props.data.map((message: any) => {
        return (
          <ChatMessage
            sentBy={message.sentBy}
            message={message.message}
            embedding={message.embedding}
            createdAt={message.createdAt}
          />
        );
      })}
    </div>
  );
};
