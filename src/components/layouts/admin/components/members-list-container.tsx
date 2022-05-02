import { useQuery } from '@apollo/client';
import { AdminMembersListContainerMembersDocument } from '../../../../generated';
import { MembersList } from './members-list';
import { Skeleton } from 'antd';
import { useParams } from 'react-router-dom';

export const MembersListContainer: React.FC<any> = (props) => {
  const params = useParams();
  const {
    data: memberData,
    loading: memberLoading,
    error: memberError
  } = useQuery(AdminMembersListContainerMembersDocument, {
    variables: { communityId: params.communityId ?? '' }
  });

  if (memberLoading) {
    return (
      <div>
        <Skeleton active />
      </div>
    );
  }
  if (memberError) {
    return <div>{JSON.stringify(memberError)}</div>;
  }
  if (memberData) {
    return <MembersList data={memberData.membersByCommunityId} />;
  } else {
    return <div>No Data...</div>;
  }
};
