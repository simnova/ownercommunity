import { FC } from 'react';
import { ChatMessager } from './chat-messager';
import { ChatMessagesContainer } from './chat-messages.container';

interface ActiveCaseChatPageProps {}
export const ActiveCaseChatPage: FC<ActiveCaseChatPageProps> = () => {
  return (
    <div style={{ display: 'grid', paddingTop: 10 }}>
      <ChatMessagesContainer/> <ChatMessager />
    </div>
  );
};
