import { AdminChatMessager } from './admin-chat-messager';
import { ChatMessages } from '../chat-messages';
import { ServiceTicket, ViolationTicket } from '../../../../../../../../../../generated';
interface ServiceTicketChatPageProps {
  data: ServiceTicket | ViolationTicket;
  updateMessage: () => void;
}
export const AdminServiceTicketChatPage: React.FC<ServiceTicketChatPageProps> = (props) => {
  return (
    <div style={{ display: 'grid', paddingTop: 10 }}>
      <ChatMessages data={props.data} isAdmin={true} /> <AdminChatMessager updateMessage={props.updateMessage} />
    </div>
  );
};
