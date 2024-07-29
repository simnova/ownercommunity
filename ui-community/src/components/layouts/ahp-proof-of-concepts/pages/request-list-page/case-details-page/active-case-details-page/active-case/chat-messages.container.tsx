import { FC } from 'react';
import { ChatMessages } from './chat-messages';
import * as CmsComponents from '../../../../../../../editor/components';

interface ChatMessagesContainerProps {}
export const ChatMessagesContainer: FC<ChatMessagesContainerProps> = () => {
  const testData = [
    {
      sentBy: 'internal',
      message: 'Hello, how are you doing?',
      createdAt: '04-March-24 9:00 AM EST'
    },
    {
      sentBy: 'external',
      message: 'Hello I am no longer interested in following through with this.',
      createdAt: '04-March-24 9:12 AM EST'
    },
    {
      sentBy: 'external',
      message: 'Please close this matter.',
      createdAt: '04-March-24 9:24 AM EST'
    },
    {
      sentBy: 'internal',
      message: 'Alright give me a second.',
      createdAt: '04-March-24 9:25 AM EST'
    },
    {
      sentBy: 'internal',
      message:
        'I am going to need some information from you to cancel this please given me a second to go through our records and check what is missing.',
      createdAt: '04-March-24 9:25 AM EST'
    },
    {
      sentBy: 'external',
      message:
        'Is there a problem? Want to make sure there is nothing to worry about if this information is missing from my records or anything else.',
      createdAt: '04-March-24 9:24 AM EST'
    },
    {
      sentBy: 'internal',
      message: 'No worries at all, just give me half an hour to look into it!',
      createdAt: '04-March-24 9:25 AM EST'
    },
    {
      embedding: <CmsComponents.AhpSendMoneyForm />,
      sentBy: 'internal',
      message: 'Here you go, go ahead and upload your document!',
      createdAt: '04-March-24 9:27 AM EST'
    },
    {
      embedding: <CmsComponents.AhpPaymentRequestForm />,
      sentBy: 'internal',
      message: 'Sorry that was meant to be a request, refunding that and sending this new form now.',
      createdAt: '04-March-24 9:27 AM EST'
    }
  ];
  return <ChatMessages data={testData} />;
};
