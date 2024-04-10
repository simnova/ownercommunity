import React from 'react';

import { useMutation } from '@apollo/client';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  AdminRolesDetailContainerRoleAddDocument,
  AdminRolesListContainerRolesDocument,
  RoleAddInput
} from '../../../../generated';
import { RolesDetail } from './roles-detail';

export const RolesDetailAddContainer: React.FC<any> = (props) => {
  const navigate = useNavigate();
  const [roleAdd] = useMutation(
    AdminRolesDetailContainerRoleAddDocument,
    {
      update(cache, { data }) {
        // update the list with the new item
        const newRole = data?.roleAdd.role;
        const roles = cache.readQuery({
          query: AdminRolesListContainerRolesDocument,
          variables: { communityId: props.data.communityId }
        })?.rolesByCommunityId;
        if (newRole && roles) {
          cache.writeQuery({
            query: AdminRolesListContainerRolesDocument,
            variables: { communityId: props.data.communityId },
            data: {
              rolesByCommunityId: [...roles, newRole]
            }
          });
        }
      }
    }
  );

  const defaultValues: RoleAddInput = {
    roleName: '',
    permissions: {
      communityPermissions: {
        canManageRolesAndPermissions: false,
        canManageCommunitySettings: false,
        canManageSiteContent: false,
        canManageMembers: false,
        canEditOwnMemberProfile: false,
        canEditOwnMemberAccounts: false
      },
      propertyPermissions: {
        canManageProperties: false,
        canEditOwnProperty: false
      },
      serviceTicketPermissions: {
        canCreateTickets: false,
        canManageTickets: false,
        canAssignTickets: false,
        canWorkOnTickets: false
      }
    }
  };

  const handleAdd = async (values: RoleAddInput) => {
    try {
      const newRole = await roleAdd({
        variables: {
          input: values
        }
      });
      message.success('Role Added');
      navigate(`../${newRole.data?.roleAdd.role?.id}`, { replace: true });
    } catch (error) {
      message.error(`Error adding role: ${JSON.stringify(error)}`);
    }
  };

  return <RolesDetail onAdd={handleAdd} onUpdate={{}} data={defaultValues} />;
};
