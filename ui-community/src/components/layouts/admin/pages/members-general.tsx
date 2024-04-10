
import { useParams } from 'react-router-dom';
import { MembersDetailContainer } from '../components/members-detail.container';

export const MembersGeneral: React.FC<any> = () => {
  const params = useParams();

  return (
    <MembersDetailContainer data={{ id: params.id ?? '', communityId: params.communityId ?? '' }} />
  );
};
