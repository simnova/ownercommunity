import { useQuery } from '@apollo/client';
import { AdminRolesListContainerRolesDocument, Role } from '../../../../generated';
import { RolesList } from './roles-list';
import { Skeleton } from 'antd';

export const RolesListContainer: React.FC<any> = (props) => {
  const {
    data: rolesData,
    loading: rolesLoading,
    error: rolesError
  } = useQuery(AdminRolesListContainerRolesDocument, {
    variables: { communityId: props.data.communityId }
  });

  if (rolesLoading) {
    return (
      <div>
        <Skeleton active />
      </div>
    );
  }
  if (rolesError) {
    return <div>{JSON.stringify(rolesError)}</div>;
  }
  if (rolesData && rolesData.rolesByCommunityId) {
    return <RolesList data={rolesData.rolesByCommunityId as Role[]} />;
  } else {
    return <div>No Data...</div>;
  }
};
