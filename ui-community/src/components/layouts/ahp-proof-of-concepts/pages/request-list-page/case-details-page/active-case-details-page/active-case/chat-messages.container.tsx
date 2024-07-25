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
    },
    {
      embedding: '',
      sentBy: 'internal',
      message:
        'Are you sure you arent interested in any more offers? Please Please Please Please Please Please Please Please Please Please Please Please Please Please',
      createdAt: '04-March-24 9:25 AM EST'
    },
    {
      embedding: '',
      sentBy: 'external',
      message: 'はい、どうぞ、それは素晴らしいことです。もう金を払いたくない、とても破産している。',
      createdAt: '04-March-24 9:24 AM EST'
    },
    {
      embedding: '',
      sentBy: 'internal',
      message: 'Wait what',
      createdAt: '04-March-24 9:25 AM EST'
    }
  ];
  return <ChatMessages data={testData} />;
};
