import { Route, Routes } from 'react-router-dom';
import { ServiceTicketsCreate } from './service-tickets-create';
import { ServiceTicketsList } from './tickets-list';
import { ServiceTicketsDetail } from './service-tickets-detail';
import { ViolationTicketsDetail } from './violation-ticket-detail';

export const ServiceTickets: React.FC<any> = (_props) => {
  return (
    <Routes>
      <Route path="" element={<ServiceTicketsList />} />
      <Route path="/new" element={<ServiceTicketsCreate />} />
      <Route path="/:id" element={<ServiceTicketsDetail />} />
      <Route path="/ServiceTicketType/:id" element={<ServiceTicketsDetail />} />
      <Route path="/ViolationTicketType/:id" element={<ViolationTicketsDetail />} />
    </Routes>
  )
}