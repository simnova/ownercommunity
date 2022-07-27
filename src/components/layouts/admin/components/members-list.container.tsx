import { useQuery } from '@apollo/client';
import { AdminMembersListContainerMembersDocument } from '../../../../generated';
import { MembersList } from './members-list';
import { Skeleton } from 'antd';
import { useParams } from 'react-router-dom';

interface MembersListContainerProps {
  data: {
    communityId: string;
  };
}

export const MembersListContainer: React.FC<MembersListContainerProps> = (props) => {
  const {
    data: memberData,
    loading: memberLoading,
    error: memberError
  } = useQuery(AdminMembersListContainerMembersDocument, {
    variables: { communityId: props.data.communityId }
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
