import { useMutation, useQuery } from "@apollo/client";
import { AdminRolesDetailContainerRoleUpdateDocument ,AdminRolesDetailContainerRoleAddDocument, AdminRolesDetailContainerRoleDocument, RoleUpdateInput, RoleAddInput, AdminRolesListContainerRolesDocument } from "../../../../generated";
import { message, Skeleton } from "antd";
import { RolesDetail } from "./roles-detail";


export const RolesDetailAddContainer: React.FC<any> = (props) => {
  const [roleAdd, {data:addData, loading:addLoading, error:addError }] = useMutation(AdminRolesDetailContainerRoleAddDocument,{

    update(cache, { data }) { // update the list with the new item
      const newRole = data?.roleAdd.role;
      const roles = cache.readQuery({ query: AdminRolesListContainerRolesDocument })?.roles;
      if(newRole && roles) {
        cache.writeQuery({
          query: AdminRolesListContainerRolesDocument,
          data: {
            roles: [...roles, newRole]
          }
        })
      }
    }
    
  });  

  const defaultValues: RoleAddInput = {
    roleName: '',
    permissions:{
      communityPermissions: {
        canManageRolesAndPermissions: false,
        canManageCommunitySettings: false,
        canManageSiteContent: false,
        canManageMembers: false,
        canEditOwnMemberProfile: false,
        canEditOwnMemberAccounts: false,        
      },
      propertyPermissions:{
        canManageProperties: false,
        canEditOwnProperty: false,
      },
      serviceTicketPermissions:{
        canCreateTickets: false,
        canManageTickets: false,
        canAssignTickets: false,
        canWorkOnTickets: false,
      }
    }
  }

  const handleAdd = async (values: RoleAddInput) => {
    try {
      await roleAdd({
        variables: {
          input: values
        }      
      });
      message.success("Role Added");
    } catch (error) {
      message.error(`Error adding role: ${JSON.stringify(error)}`);
    }
  }

  return <RolesDetail onAdd={handleAdd} onUpdate={{}} data={defaultValues} />
}