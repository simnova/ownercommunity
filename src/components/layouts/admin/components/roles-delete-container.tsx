import { useMutation, useQuery } from '@apollo/client';
import { AdminRolesDeleteContainerRoleDeleteAndReassignDocument ,AdminRolesDeleteContainerRolesDocument, RoleDeleteAndReassignInput, AdminRolesListContainerRolesDocument } from '../../../../generated';
import { message, Skeleton } from 'antd';
import { RolesDelete } from './roles-delete';
import { useNavigate } from 'react-router-dom';

export interface RolesDeleteContainerProps {
  data: {
    id: string;
  };
}

export const RolesDeleteContainer: React.FC<any> = (props) => {
  const navigate = useNavigate();
  const [roleDelete, { data:deleteData, loading:deleteLoading, error:deleteError }] = useMutation(AdminRolesDeleteContainerRoleDeleteAndReassignDocument,{

    update(cache, { data }) { // update the list by removing the deleted item
      const deletedRole = data?.roleDeleteAndReassign.role;
      const roles = cache.readQuery({ query: AdminRolesListContainerRolesDocument })?.roles;
      if(deletedRole && roles) {
        cache.writeQuery({
          query: AdminRolesListContainerRolesDocument,
          data: {
            roles: roles?.filter(role =>  role?.id !== deletedRole.id)
          }
        })
      }
    }

  });  
  const { data: roleData, loading: roleLoading, error: roleError } = useQuery(AdminRolesDeleteContainerRolesDocument,{
  });

  const handleReassignment = async (values: RoleDeleteAndReassignInput) => {
    try {
      await roleDelete({
        variables: {
          input:{
            roleToDelete: props.data.id,
            roleToReassignTo: values
          }         
        },       
      });
      message.success("Role Deleted Successfully");
      navigate(`../`, { replace: true });

    } catch (error) {
      message.error(`Error Deleting role: ${JSON.stringify(error)}`);
    }
  } 

  if(roleLoading ) {
    return <Skeleton active />
  }else if(roleError || deleteError) {
    return <div>{JSON.stringify(roleError || deleteError )}</div>
  }else if(roleData && roleData.roles) {
    var reassignmentOptions = {
      roleToDelete : roleData.roles.find(x => x?.id === props.data.id),
      roles: roleData.roles.filter(x => x?.id !== props.data.id)
    }
    if(reassignmentOptions.roleToDelete && reassignmentOptions.roles) {
      return <RolesDelete onSelectReassignment={handleReassignment}  data={reassignmentOptions} />
    }else {
      return <div>No Data...</div>
    }
  } else {
    return <div>No Data...</div>
  }
  
}