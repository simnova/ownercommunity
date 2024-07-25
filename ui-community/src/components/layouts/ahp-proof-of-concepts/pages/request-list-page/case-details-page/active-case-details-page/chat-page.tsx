import { FC } from 'react';
import { ChatContainer } from './components/chat.container';

interface ChatPageProps {}
export const ChatPage: FC<ChatPageProps> = (_props) => {
  return <ChatContainer />;
};
