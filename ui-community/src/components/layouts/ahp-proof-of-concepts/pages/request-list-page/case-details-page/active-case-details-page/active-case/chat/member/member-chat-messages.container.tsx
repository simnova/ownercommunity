import { useEffect, useState } from 'react';
import {
  ChatMessagesContainerServiceTicketDocument,
  ChatMessagesContainerViolationTicketDocument,
  ServiceTicket,
  ViolationTicket
} from '../../../../../../../../../../generated';
import { ComponentQueryLoader } from '../../../../../../../../../ui/molecules/component-query-loader';
import { useLazyQuery } from '@apollo/client';
import { MemberServiceTicketChatPage } from './member-service-ticket-chat-page';
import { useParams } from 'react-router-dom';

export const MemberChatMessagesContainer = () => {
  const params = useParams();
  const isServiceTicket = window.location.href.indexOf('ServiceTicketType') > -1;
  const [messageQuery] = useLazyQuery(
    isServiceTicket ? ChatMessagesContainerServiceTicketDocument : ChatMessagesContainerViolationTicketDocument
  );
  const [messageData, setMessageData] = useState<ServiceTicket | ViolationTicket>(
    {} as ServiceTicket | ViolationTicket
  );
  const [messageError, setMessageError] = useState<any>(undefined);
  const [messageLoading, setMessageLoading] = useState<any>(undefined);

  const getData = async () => {
    const variables: any = isServiceTicket ? { serviceTicketId: params.id } : { violationTicketId: params.id };
    const {
      data: messageDataTemp,
      loading: messageLoadingTemp,
      error: messageErrorTemp
    } = await messageQuery({
      variables: variables,
      fetchPolicy: 'network-only'
    });

    const tempData: any = messageDataTemp;
    setMessageData(isServiceTicket ? tempData?.serviceTicket : tempData?.violationTicket);
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
