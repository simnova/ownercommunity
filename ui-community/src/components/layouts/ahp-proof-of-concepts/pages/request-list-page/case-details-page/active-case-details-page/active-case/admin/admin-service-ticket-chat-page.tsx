import { ServiceTicket } from '../../../../../../../../../generated';
import { AdminChatMessager } from './admin-chat-messager';
import { ChatMessages } from '../chat-messages';
interface ServiceTicketChatPageProps {
  data: ServiceTicket;
  updateMessage: () => void;
}
export const AdminServiceTicketChatPage: React.FC<ServiceTicketChatPageProps> = (props) => {
  return (
    <div style={{ display: 'grid', paddingTop: 10 }}>
      <ChatMessages data={props.data} isAdmin={true} /> <AdminChatMessager updateMessage={props.updateMessage} />
    </div>
  );
};
