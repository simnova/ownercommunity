import { useMutation, useQuery } from "@apollo/client";
import { AdminRolesDetailContainerRoleUpdateDocument ,AdminRolesDetailContainerRoleAddDocument, AdminRolesDetailContainerRoleDocument, RoleUpdateInput, RoleAddInput } from "../../../../generated";
import { message, Skeleton } from "antd";
import { RolesDetail } from "./roles-detail";

export interface RolesDetailContainerProps {
  data: {
    id: string;
  };
}

export const RolesDetailContainer: React.FC<any> = (props) => {
  const [roleUpdate, { data:updateData, loading:updateLoading, error:updateError }] = useMutation(AdminRolesDetailContainerRoleUpdateDocument);  
  const { data: roleData, loading: roleLoading, error: roleError } = useQuery(AdminRolesDetailContainerRoleDocument,{
    variables: {
      Id: props.data.id
    }
  });

  const handleUpdate = async (values: RoleUpdateInput) => {
    try {
      await roleUpdate({
        variables: {
          input: values
        },
        refetchQueries: [
          {
            query: AdminRolesDetailContainerRoleDocument,
            variables: {
              Id: props.data.id
            }
          }
        ]
      });
      message.success("Role Updated");
    } catch (error) {
      message.error(`Error updating role: ${JSON.stringify(error)}`);
    }
  } 

  if(roleLoading ) {
    return <Skeleton active />
  }else if(roleError  ) {
    return <div>{JSON.stringify(roleError || updateError )}</div>
  }else if(roleData && roleData.role) {
  return <RolesDetail onAdd={{}} onUpdate={handleUpdate} data={roleData?.role} />
  } else {
    return <div>No Data...</div>
  }
  
}