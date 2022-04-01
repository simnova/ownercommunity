import { useMutation, useQuery } from "@apollo/client";
import { AdminRolesDetailContainerRoleUpdateDocument ,AdminRolesDetailContainerRoleAddDocument, AdminRolesDetailContainerRoleDocument, RoleUpdateInput, RoleAddInput } from "../../../../generated";
import { message, Skeleton } from "antd";
import { RolesDetail } from "./roles-detail";


export const RolesDetailAddContainer: React.FC<any> = (props) => {
  const [roleAdd, { loading:addLoading, error:addError }] = useMutation(AdminRolesDetailContainerRoleAddDocument);  

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