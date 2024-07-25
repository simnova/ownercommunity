import { FC } from 'react';
import { ChatMessages } from './chat-messages';

interface ChatMessagesContainerProps {}
export const ChatMessagesContainer: FC<ChatMessagesContainerProps> = () => {
  const testData = [
    {
      embedding: '',
      sentBy: 'internal',
      message: 'Hello, how are you doing?',
      createdAt: '04-March-24 9:00 AM EST'
    },
    {
      embedding: '',
      sentBy: 'external',
      message: 'Please do not contact me again.',
      createdAt: '04-March-24 9:12 AM EST'
    },
    {
      embedding: '',
      sentBy: 'external',
      message: 'I am no longer interested.',
      createdAt: '04-March-24 9:24 AM EST'
    },
    {
      embedding: '',
      sentBy: 'internal',
      message: ':(',
      createdAt: '04-March-24 9:25 AM EST'
    }
  ];
  return <ChatMessages data={testData} />;
};
