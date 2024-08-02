import { useEffect } from 'react';
import { ServiceTicket } from '../../../../../../../../../generated';
import { ChatMessages } from '../chat-messages';
import { MemberChatMessager } from './member-chat-messager';

interface ServiceTicketMemberChatPageProps {
  data: ServiceTicket;
  updateMessage: () => void;
}
export const MemberServiceTicketChatPage: React.FC<ServiceTicketMemberChatPageProps> = (props) => {
  useEffect(() => {}, [props.data]);

  return (
    <div style={{ display: 'grid', paddingTop: 10 }}>
      <ChatMessages data={props.data} isAdmin={false} /> <MemberChatMessager updateMessage={props.updateMessage} />
    </div>
  );
};
