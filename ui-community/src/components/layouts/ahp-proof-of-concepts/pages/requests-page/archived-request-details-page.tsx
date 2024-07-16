import { FC } from 'react';
import { useParams } from 'react-router-dom';

interface ArchivedRequestDetailsPageProps {}
export const ArchivedRequestDetailsPage: FC<ArchivedRequestDetailsPageProps> = (_props) => {
  const params = useParams();
  return (
    <>
      Archived request for request id: {params.requestId}
    </>
  );
}