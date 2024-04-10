import { useQuery } from '@apollo/client';
import { AdminRolesListContainerRolesDocument, Role } from '../../../../generated';
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
  } = useQuery(AdminRolesListContainerRolesDocument, {
    variables: { communityId: props.data.communityId }
  });

  return (
    <ComponentQueryLoader
      loading={rolesLoading}
      hasData={rolesData?.rolesByCommunityId}
      hasDataComponent={<RolesList data={rolesData?.rolesByCommunityId as Role[]} />}
      error={rolesError}
    />
  );
};
