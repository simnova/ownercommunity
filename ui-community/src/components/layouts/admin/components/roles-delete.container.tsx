import { useMutation, useQuery } from '@apollo/client';
import { Skeleton, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  AdminRolesDeleteContainerRoleDeleteAndReassignDocument,
  AdminRolesDeleteContainerRolesDocument,
  AdminRolesListContainerRolesDocument,
  RoleDeleteAndReassignInput
} from '../../../../generated';
import { RolesDelete } from './roles-delete';

export interface RolesDeleteContainerProps {
  data: {
    id: string;
  };
}

export const RolesDeleteContainer: React.FC<any> = (props) => {
  const navigate = useNavigate();
  const [roleDelete, { error: deleteError }] =
    useMutation(AdminRolesDeleteContainerRoleDeleteAndReassignDocument, {
      update(cache, { data }) {
        // update the list by removing the deleted item
        const deletedRole = data?.roleDeleteAndReassign.role;
        const roles = cache.readQuery({
          query: AdminRolesListContainerRolesDocument
        })?.rolesByCommunityId;
        if (deletedRole && roles) {
          cache.writeQuery({
            query: AdminRolesListContainerRolesDocument,
            data: {
              rolesByCommunityId: roles?.filter((role) => role?.id !== deletedRole.id)
            }
          });
        }
      }
    });
  const {
    data: roleData,
    loading: roleLoading,
    error: roleError
  } = useQuery(AdminRolesDeleteContainerRolesDocument);

  const handleReassignment = async (values: RoleDeleteAndReassignInput) => {
    try {
      await roleDelete({
        variables: {
          input: {
            roleToDelete: props.data.id,
            roleToReassignTo: values
          }
        }
      }).then((res) => {
        if (res.data?.roleDeleteAndReassign.status.success) {
          message.success('Role Deleted Successfully');
          navigate(`../`, { replace: true });
        } else {
          message.error(`Error Deleting role: ${res.data?.roleDeleteAndReassign.status.errorMessage}`);
        }
      });
      
      
    } catch (error) {
      message.error(`Error Deleting role: ${JSON.stringify(error)}`);
    }
  };

  if (roleLoading) {
    return <Skeleton active />;
  } else if (roleError || deleteError) {
    return <div>{JSON.stringify(roleError ?? deleteError)}</div>;
  } else if (roleData?.roles) {
    const reassignmentOptions = {
      roleToDelete: roleData.roles.find((x) => x?.id === props.data.id),
      roles: roleData.roles.filter((x) => x?.id !== props.data.id)
    };
    if (reassignmentOptions.roleToDelete && reassignmentOptions.roles) {
      return <RolesDelete onSelectReassignment={handleReassignment} data={reassignmentOptions} />;
    } else {
      return <div>No Data...</div>;
    }
  } else {
    return <div>No Data...</div>;
  }
};
