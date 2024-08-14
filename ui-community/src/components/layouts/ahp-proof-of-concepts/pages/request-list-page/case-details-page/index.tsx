import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ActiveCaseDetailsPage } from './active-case-details-page';
import { ArchivedCaseDetailsPage } from './archived-case-details-page';

interface CaseDetailsPageProps {}
export const CaseDetailsPage: FC<CaseDetailsPageProps> = (_props) => {
  return (
    <Routes>
      <Route path={`active/:caseId/*`} element={<ActiveCaseDetailsPage />} />
      <Route path={`archived/:caseId`} element={<ArchivedCaseDetailsPage />} />
    </Routes>
  );
};
