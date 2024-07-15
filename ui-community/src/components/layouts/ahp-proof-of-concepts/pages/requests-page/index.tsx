import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequestsPageLayout } from './requests-page-layout';
import { RequestsPageRoutes } from './requests-page-routes';

interface RequestsPageProps {}
export const RequestsPage: FC<RequestsPageProps> = (props) => {
  return (
    <Routes>
      <Route path="" element={<RequestsPageLayout />}>
        <Route path="*" element={<RequestsPageRoutes />} />
      </Route>
    </Routes>
  );
};
