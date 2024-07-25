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
      message: 'Hello I am no longer interested in following through with this.',
      createdAt: '04-March-24 9:12 AM EST'
    },
    {
      embedding: '',
      sentBy: 'external',
      message: 'Please close this matter.',
      createdAt: '04-March-24 9:24 AM EST'
    },
    {
      embedding: '',
      sentBy: 'internal',
      message: 'Alright give me a second.',
      createdAt: '04-March-24 9:25 AM EST'
    },
    {
      embedding: '',
      sentBy: 'internal',
      message:
        'I am going to need some information from you to cancel this please given me a second to go through our records and check what is missing.',
      createdAt: '04-March-24 9:25 AM EST'
    },
    {
      embedding: '',
      sentBy: 'external',
      message: 'Is there a problem? Want to make sure there is nothing to worry about if this information is missing from my records or anything else.',
      createdAt: '04-March-24 9:24 AM EST'
    },
    {
      embedding: '',
      sentBy: 'internal',
      message: 'No worries at all, just give me half an hour to look into it!',
      createdAt: '04-March-24 9:25 AM EST'
    }
  ];
  return <ChatMessages data={testData} />;
};
