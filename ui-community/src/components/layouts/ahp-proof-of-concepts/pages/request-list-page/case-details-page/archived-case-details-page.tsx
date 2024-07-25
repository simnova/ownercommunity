import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { AHPObjectIDRouteLayer } from '.';

interface ArchivedCaseDetailsPageProps {}
export const ArchivedCaseDetailsPage: FC<ArchivedCaseDetailsPageProps> = (_props) => {
  const params = useParams();
  return <>Archived case for case id: {params[AHPObjectIDRouteLayer.CaseId]}</>;
};
