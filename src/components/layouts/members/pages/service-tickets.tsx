import { Route, Routes } from 'react-router-dom';
import { ServiceTicketsCreate } from './service-tickets-create';
import { ServiceTicketsList } from './service-tickets-list';
import { ServiceTicketsDetail } from './service-tickets-detail';

export const ServiceTickets: React.FC<any> = (_props) => {
  return (
    <Routes>
      <Route path="" element={<ServiceTicketsList />} />
      <Route path="/new" element={<ServiceTicketsCreate />} />
      <Route path="/:id" element={<ServiceTicketsDetail />} />
    </Routes>
  )
}