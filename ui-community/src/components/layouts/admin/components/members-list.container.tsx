import { useQuery } from '@apollo/client';
import { AdminMembersListContainerMemberFieldsFragment, AdminMembersListContainerMembersByCommunityIdDocument } from '../../../../generated';
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
  } = useQuery(AdminMembersListContainerMembersByCommunityIdDocument, {
    variables: { communityId: props.data.communityId }
  });

  return (
    <ComponentQueryLoader
      loading={memberLoading}
      hasData={memberData?.membersByCommunityId}
      hasDataComponent={<MembersList data={memberData?.membersByCommunityId as AdminMembersListContainerMemberFieldsFragment[]} />}
      error={memberError}
    />
  );
};