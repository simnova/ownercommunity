import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { AHPObjectIDRouteLayer } from '.';

interface ArchivedRequestDetailsPageProps {}
export const ArchivedRequestDetailsPage: FC<ArchivedRequestDetailsPageProps> = (_props) => {
  const params = useParams();
  return <>Archived request for case id: {params[AHPObjectIDRouteLayer.CaseId]}</>;
};
