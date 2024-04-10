import { Route, Routes } from 'react-router-dom';
import { ServiceTicketsCreate } from './service-tickets-create';
import { ServiceTicketsDetail } from './service-tickets-detail';
import { ServiceTicketsList } from './service-tickets-list';

export const ServiceTickets: React.FC<any> = () => {
  return (
    <Routes>
      <Route path="" element={<ServiceTicketsList />} />
      <Route path="/new" element={<ServiceTicketsCreate />} />
      <Route path="/:id" element={<ServiceTicketsDetail />} />
    </Routes>
  )
}