import { useEffect, useState } from 'react';
import { ChatMessagesContainerServiceTicketDocument, ServiceTicket } from '../../../../../../../../../generated';
import { ComponentQueryLoader } from '../../../../../../../../ui/molecules/component-query-loader';
import { useLazyQuery } from '@apollo/client';
import { MemberServiceTicketChatPage } from './member-service-ticket-chat-page';
import { useParams } from 'react-router-dom';

export const MemberChatMessagesContainer = () => {
  const params = useParams();
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
      variables: { serviceTicketId: params.id },
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

  return (
    <ComponentQueryLoader
      error={messageError}
      loading={messageLoading}
      hasData={messageData !== undefined}
      hasDataComponent={<MemberServiceTicketChatPage data={messageData} updateMessage={reloadMessages} />}
    />
  );
};
