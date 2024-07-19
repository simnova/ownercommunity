import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ActiveRequestDetailsPage } from './active-request-details-page';
import { ArchivedRequestDetailsPage } from './archived-request-details-page';
import { AHPObjectStatusRouteLayer } from '..';

export const AHPObjectIDRouteLayer = {
  CaseId: 'caseId',
}

interface RequestDetailsPageProps {}
export const RequestDetailsPage: FC<RequestDetailsPageProps> = (_props) => {
  return (
    <Routes>
      <Route path={`${AHPObjectStatusRouteLayer.Active}/:${AHPObjectIDRouteLayer.CaseId}/*`} element={<ActiveRequestDetailsPage />} />
      <Route path={`${AHPObjectStatusRouteLayer.Archived}/:${AHPObjectIDRouteLayer.CaseId}`} element={<ArchivedRequestDetailsPage />} />
    </Routes>
  );
};
