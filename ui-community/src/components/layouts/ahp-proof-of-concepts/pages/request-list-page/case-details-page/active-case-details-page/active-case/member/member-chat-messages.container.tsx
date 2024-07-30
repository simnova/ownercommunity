import { FC, useEffect, useState } from 'react';
import * as CmsComponents from '../../../../../../../../editor/components';
import { ChatMessagesContainerServiceTicketDocument, ServiceTicket } from '../../../../../../../../../generated';
import { ComponentQueryLoader } from '../../../../../../../../ui/molecules/component-query-loader';
import { useLazyQuery } from '@apollo/client';
import { MemberServiceTicketChatPage } from './member-service-ticket-chat-page';

export const MemberChatMessagesContainer = () => {
  const [messageQuery] = useLazyQuery(ChatMessagesContainerServiceTicketDocument);

  const [messageData, setMessageData] = useState<ServiceTicket>({} as ServiceTicket);
  const [messageError, setMessageError] = useState<any>(undefined);
  const [messageLoading, setMessageLoading] = useState<any>(undefined);

  const getData = async () => {
    const {
      data: messageDataTemp,
      loading: messageLoadingTemp,
      error: messageErrorTemp
    } = await messageQuery({
      variables: { serviceTicketId: '66a7eb82ef9aff668fe0d5b9' },
      fetchPolicy: 'network-only'
    });
    setMessageData(messageDataTemp?.serviceTicket as ServiceTicket);
    setMessageError(messageLoadingTemp);
    setMessageLoading(messageErrorTemp);
  };

  const reloadMessages = () => {
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

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
      embedding: <CmsComponents.AhpSendMoneyForm amount={40} />,
      sentBy: 'internal',
      message: 'Here you go, go ahead and upload your document!',
      createdAt: '04-March-24 9:27 AM EST'
    },
    {
      embedding: <CmsComponents.AhpPaymentRequestForm amount={30} reason={'Courier Fee'} />,
      sentBy: 'internal',
      message: 'Sorry that was meant to be a request, refunding that and sending this new form now.',
      createdAt: '04-March-24 9:27 AM EST'
    },
    {
      embedding: (
        <CmsComponents.AhpRequestFeedbackForm
          changesRequested={{
            credentialType: true,
            credential: true,
            credentialTranslation: true,
            issuingInstitution: true,
            nameOnDocument: true
          }}
        />
      ),
      sentBy: 'internal',
      message: 'Could you also fix a few things in your document please.',
      createdAt: '04-March-24 9:27 AM EST'
    }
  ];
  return (
    <ComponentQueryLoader
      error={messageError}
      loading={messageLoading}
      hasData={messageData !== undefined}
      hasDataComponent={
        <MemberServiceTicketChatPage data={messageData as ServiceTicket} updateMessage={reloadMessages} />
      }
    />
  );
};
