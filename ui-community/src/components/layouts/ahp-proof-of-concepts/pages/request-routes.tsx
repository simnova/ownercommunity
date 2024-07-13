import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequestsPageLayout } from './requests-page-layout';
import { RequestsPage } from './requests-page-routes';

interface RequestRoutesProps {}
export const RequestRoutes: FC<RequestRoutesProps> = (props) => {
  return (
    <Routes>
      <Route path="" element={<RequestsPageLayout />}>
        <Route path="*" element={<RequestsPage />} />
      </Route>
    </Routes>
  );
};
