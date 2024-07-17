import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ActiveRequestDetailsPage } from './active-request-details-page';
import { ArchivedRequestDetailsPage } from './archived-request-details-page';

interface RequestDetailsPageProps {}
export const RequestDetailsPage: FC<RequestDetailsPageProps> = (_props) => {
  return (
    <Routes>
      <Route path="active/:requestId/*" element={<ActiveRequestDetailsPage />} />
      <Route path="archived/:requestId" element={<ArchivedRequestDetailsPage />} />
    </Routes>
  );
};
