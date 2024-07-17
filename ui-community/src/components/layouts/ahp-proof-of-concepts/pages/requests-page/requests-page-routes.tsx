import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ActiveRequestDetailsPage } from './active-requests-details-page';
import { ArchivedRequestDetailsPage } from './archived-request-details-page';

interface RequestsPageRoutesProps {}
export const RequestsPageRoutes: FC<RequestsPageRoutesProps> = (_props) => {
  return (
    <Routes>
      <Route path="active/:requestId/*" element={<ActiveRequestDetailsPage />} />
      <Route path="archived/:requestId" element={<ArchivedRequestDetailsPage />} />
    </Routes>
  );
};
