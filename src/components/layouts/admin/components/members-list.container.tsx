import { useQuery } from '@apollo/client';
import { AdminMembersListContainerMembersDocument } from '../../../../generated';
import { ComponentQueryLoader } from '../../../ui/molecules/component-query-loader';
import { MembersList } from './members-list';

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

  return (
    <ComponentQueryLoader
      loading={memberLoading}
      hasData={memberData?.membersByCommunityId}
      hasDataComponent={<MembersList data={memberData?.membersByCommunityId} />}
      error={memberError}
    />
  );

};
