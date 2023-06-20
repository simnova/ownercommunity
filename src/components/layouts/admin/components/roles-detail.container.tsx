import { useMutation, useQuery } from '@apollo/client';
import {
  AdminRolesDetailContainerRoleUpdateDocument,
  AdminRolesDetailContainerRoleDocument,
  RoleUpdateInput,

} from '../../../../generated';
import { message } from 'antd';
import { RolesDetail } from './roles-detail';
import { ComponentQueryLoader } from '../../../ui/molecules/component-query-loader';

export interface RolesDetailContainerProps {
  data: {
    id: string;
  };
}

export const RolesDetailContainer: React.FC<any> = (props) => {
  const [roleUpdate, { data: updateData, loading: updateLoading, error: updateError }] = useMutation(
    AdminRolesDetailContainerRoleUpdateDocument
  );
  const {
    data: roleData,
    loading: roleLoading,
    error: roleError
  } = useQuery(AdminRolesDetailContainerRoleDocument, {
    variables: {
      Id: props.data.id
    }
  });

  const handleUpdate = async (values: RoleUpdateInput) => {
    try {
      await roleUpdate({
        variables: {
          input: values
        }
      });
      message.success('Role Updated');
    } catch (error) {
      message.error(`Error updating role: ${JSON.stringify(error)}`);
    }
  };

  return (
    <ComponentQueryLoader
      loading={roleLoading}
      hasData={roleData && roleData.role}
      hasDataComponent={<RolesDetail onAdd={{}} onUpdate={handleUpdate} data={roleData?.role} />}
      error={roleError || updateError}
    />
  );
};
