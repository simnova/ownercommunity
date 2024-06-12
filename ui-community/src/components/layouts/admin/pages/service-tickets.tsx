import { Route, Routes } from 'react-router-dom';
import { ServiceTicketsCreate } from './service-tickets-create';
import { ServiceTicketsDetail } from './service-tickets-detail';
import { ServiceTicketsList } from './service-tickets-list';
import { Helmet } from 'react-helmet-async';

export const ServiceTickets: React.FC<any> = () => {
  return (
  <>
    <Helmet>
        <title>Service Tickets</title>
    </Helmet>
    <Routes>
      <Route path="" element={<ServiceTicketsList />} />
      <Route path="/new" element={<ServiceTicketsCreate />} />
      <Route path="/:id" element={<ServiceTicketsDetail />} />
    </Routes>
  </>
  )
}