import { FC } from 'react';
import { useParams } from 'react-router-dom';

interface ArchivedCaseDetailsPageProps {}
export const ArchivedCaseDetailsPage: FC<ArchivedCaseDetailsPageProps> = (_props) => {
  const params = useParams();
  return <>Archived case for case id: {params['caseId']}</>;
};
