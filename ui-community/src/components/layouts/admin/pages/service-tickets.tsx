import { Route, Routes } from 'react-router-dom';
import { ServiceRequestCreate } from './service-tickets-create';
import { ServiceTicketsDetail } from './service-tickets-detail';
import { ServiceTicketsList } from './service-tickets-list';
import { ViolationTicketsCreate } from './violation-tickets-create';

export const ServiceTickets: React.FC<any> = () => {
  return (
    <Routes>
      <Route path="" element={<ServiceTicketsList />} />
      <Route path="/new/service-request" element={<ServiceRequestCreate />} />
      <Route path="/new/violation" element={<ViolationTicketsCreate />} />
      <Route path="/:ticketType/:id" element={<ServiceTicketsDetail />} />
    </Routes>
  );
};
