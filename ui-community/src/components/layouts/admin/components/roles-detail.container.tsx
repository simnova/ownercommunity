import { useMutation, useQuery } from '@apollo/client';
import { message } from 'antd';
import {
  AdminRolesDetailContainerRoleDocument,
  AdminRolesDetailContainerRoleUpdateDocument,
  RoleUpdateInput
} from '../../../../generated';
import { ComponentQueryLoader } from '../../../ui/molecules/component-query-loader';
import { RolesDetail } from './roles-detail';

export interface RolesDetailContainerProps {
  data: {
    id: string;
  };
}

export const RolesDetailContainer: React.FC<RolesDetailContainerProps> = (props) => {
  const [roleUpdate, { error: updateError }] = useMutation(AdminRolesDetailContainerRoleUpdateDocument);
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
      }).then((res) => {
        if (res.data?.roleUpdate.status.success) {
          message.success('Role Updated');
        } else {
          message.error(`Error updating role: ${res.data?.roleUpdate.status.errorMessage}`);
        }
      });
    } catch (error) {
      message.error(`Error updating role: ${JSON.stringify(error)}`);
    }
  };

  return (
    <ComponentQueryLoader
      loading={roleLoading}
      hasData={roleData?.role}
      hasDataComponent={roleData?.role && <RolesDetail data={roleData.role} onAdd={() => {}} onUpdate={handleUpdate} />}
      error={roleError ?? updateError}
    />
  );
};