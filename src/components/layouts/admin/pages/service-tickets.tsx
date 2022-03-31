import { Route, Routes } from 'react-router-dom';
import { ServiceTicketsList } from './service-tickets-list';

export const ServiceTickets: React.FC<any> = (props) => {
  return (
    <Routes>
      <Route path="" element={<ServiceTicketsList />} />
  
    </Routes>
  )
}