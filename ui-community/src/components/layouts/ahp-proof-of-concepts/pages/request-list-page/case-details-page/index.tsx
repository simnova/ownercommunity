import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ActiveCaseDetailsPage } from './active-case-details-page';
import { ArchivedCaseDetailsPage } from './archived-case-details-page';
import { AHPObjectStatusRouteLayer } from '..';

export const AHPObjectIDRouteLayer = {
  CaseId: 'caseId',
}

interface CaseDetailsPageProps {}
export const CaseDetailsPage: FC<CaseDetailsPageProps> = (_props) => {
  return (
    <Routes>
      <Route path={`${AHPObjectStatusRouteLayer.Active}/:${AHPObjectIDRouteLayer.CaseId}/*`} element={<ActiveCaseDetailsPage />} />
      <Route path={`${AHPObjectStatusRouteLayer.Archived}/:${AHPObjectIDRouteLayer.CaseId}`} element={<ArchivedCaseDetailsPage />} />
    </Routes>
  );
};
