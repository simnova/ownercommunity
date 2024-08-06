import { FC, useEffect, useState } from 'react';
import {
  ChatMessagesContainerServiceTicketDocument,
  ChatMessagesContainerViolationTicketDocument,
  ServiceTicket,
  ViolationTicket
} from '../../../../../../../../../../generated';
import { ComponentQueryLoader } from '../../../../../../../../../ui/molecules/component-query-loader';
import { useLazyQuery } from '@apollo/client';
import { AdminServiceTicketChatPage } from './admin-service-ticket-chat-page';
import { useParams } from 'react-router-dom';

interface ChatMessagesContainerProps {
  ticketType: string;
}

export const AdminChatMessagesContainer: FC<ChatMessagesContainerProps> = (props) => {
  const params = useParams();
  const isServiceTicket = props.ticketType === 'ServiceTicketType'
  const [messageQuery] = useLazyQuery(
    isServiceTicket ? ChatMessagesContainerServiceTicketDocument : ChatMessagesContainerViolationTicketDocument
  );

  const [messageData, setMessageData] = useState<ServiceTicket | ViolationTicket>({} as ServiceTicket | ViolationTicket);
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
      hasDataComponent={<AdminServiceTicketChatPage data={messageData} updateMessage={reloadMessages} />}
    />
  );
};
