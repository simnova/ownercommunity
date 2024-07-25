import { FC } from 'react';
import { ChatMessages } from './chat-messages';
import { ChatMessager } from './chat-messager';
import { ChatMessagesContainer } from './chat-messages.container';

interface ActiveCaseChatPageProps {}
export const ActiveCaseChatPage: FC<ActiveCaseChatPageProps> = (props) => {
  return (
    <div style={{ display: 'grid', paddingTop: 10 }}>
      <ChatMessagesContainer/> <ChatMessager />
    </div>
  );
};
