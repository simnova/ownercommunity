import { useQuery } from '@apollo/client';
import { AdminRolesListContainerRoleFieldsFragment, AdminRolesListContainerRolesByCommunityIdDocument } from '../../../../generated';
import { ComponentQueryLoader } from '../../../ui/molecules/component-query-loader';
import { RolesList } from './roles-list';

interface RolesListContainerProps {
  data: {
    communityId: string;
  };
}

export const RolesListContainer: React.FC<RolesListContainerProps> = (props) => {
  const {
    data: rolesData,
    loading: rolesLoading,
    error: rolesError
  } = useQuery(AdminRolesListContainerRolesByCommunityIdDocument, {
    variables: { communityId: props.data.communityId }
  });

  return (
    <ComponentQueryLoader
      loading={rolesLoading}
      hasData={rolesData?.rolesByCommunityId}
      hasDataComponent={<RolesList data={rolesData?.rolesByCommunityId as AdminRolesListContainerRoleFieldsFragment[]} />}
      error={rolesError}
    />
  );
};
