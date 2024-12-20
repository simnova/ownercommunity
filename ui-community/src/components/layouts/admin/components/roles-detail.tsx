import React from 'react';
import { Button, Checkbox, Descriptions, Form, Input, message } from 'antd';
import dayjs from 'dayjs';

import { AdminRolesDetailContainerRoleFieldsFragment, RoleAddInput, RoleUpdateInput } from '../../../../generated';
import { Helmet } from 'react-helmet-async';

export interface RolesDetailBaseProps {
  data: AdminRolesDetailContainerRoleFieldsFragment;
}

export interface RolesDetailAddProps extends RolesDetailBaseProps {
  onAdd: (role: RoleAddInput) => Promise<void>;
}

export interface RolesDetailUpdateProps extends RolesDetailBaseProps {
  onUpdate: (role: RoleUpdateInput) => Promise<void>;
}



export type RolesDetailProps = RolesDetailAddProps | RolesDetailUpdateProps;


// Type guard for RolesDetailsAddProps
function isRolesDetailAddProps(props: RolesDetailAddProps | RolesDetailUpdateProps): props is RolesDetailAddProps {
  return typeof (props as RolesDetailAddProps).onAdd === 'function';
}

// Type guard for RolesDetailsUpdateProps
function isRolesDetailUpdateProps(props: RolesDetailAddProps | RolesDetailUpdateProps): props is RolesDetailUpdateProps {
  return typeof (props as RolesDetailUpdateProps).onUpdate === 'function';
}


export const RolesDetail: React.FC<RolesDetailProps> = (props) => {
  const [form] = Form.useForm<RoleAddInput|RoleUpdateInput>();
  const [formLoading, setFormLoading] = React.useState<boolean>(false);

  const handleFinish = async (values: RoleAddInput|RoleUpdateInput) => {
    setFormLoading(true);
    try {
      if (isRolesDetailUpdateProps(props)) {
        (values as RoleUpdateInput).id = props.data!.id;
        await props.onUpdate(values as RoleUpdateInput);
      } else if(isRolesDetailAddProps(props)) {
        await props.onAdd(values as RoleAddInput);
      }
    } catch (e) {
      console.error(e);
      message.error('Failed to save role.',);
    } finally {
      setFormLoading(false);
    }
  }

  return (
    <div>
      <Descriptions title="Role Info" size={'small'} layout={'vertical'}>
        <Descriptions.Item label="Id">{props.data.id}</Descriptions.Item>
        <Descriptions.Item label="Is Default">
          {props.data ? (props.data!.isDefault ? 'true' : 'false') : 'false'}
        </Descriptions.Item>
        <Descriptions.Item label="Created At">{dayjs(props.data.createdAt).format('MM/DD/YYYY')}</Descriptions.Item>
        <Descriptions.Item label="Updated At">{dayjs(props.data.createdAt).format('MM/DD/YYYY')}</Descriptions.Item>
      </Descriptions>
      <Helmet>
        <title>Create Role</title>
      </Helmet>
      <Form
        layout="vertical"
        form={form}
        initialValues={props.data}
        onFinish={handleFinish}
      >
        <Form.Item
          name={['roleName']}
          label="Role Name"
          rules={[{ required: true, message: 'Role name is required.' }]}
        >
          <Input placeholder="Role Name" maxLength={200} disabled={props.data.isDefault} />
        </Form.Item>

        <h3>Member Permissions</h3>
        <Form.Item name={['permissions', 'communityPermissions', 'canEditOwnMemberProfile']} valuePropName="checked">
          <Checkbox style={{ lineHeight: '32px' }} disabled={props.data.isDefault}>
            Can Edit Own Member Profile
          </Checkbox>
        </Form.Item>
        <Form.Item name={['permissions', 'communityPermissions', 'canEditOwnMemberAccounts']} valuePropName="checked">
          <Checkbox style={{ lineHeight: '32px' }} disabled={props.data.isDefault}>
            Can Edit Own Member Accounts
          </Checkbox>
        </Form.Item>
        <Form.Item name={['permissions', 'serviceTicketPermissions', 'canCreateTickets']} valuePropName="checked">
          <Checkbox style={{ lineHeight: '32px' }} disabled={props.data.isDefault}>
            Can Create Tickets
          </Checkbox>
        </Form.Item>
        <Form.Item name={['permissions', 'propertyPermissions', 'canEditOwnProperty']} valuePropName="checked">
          <Checkbox style={{ lineHeight: '32px' }} disabled={props.data.isDefault}>
            Can Edit Own Property
          </Checkbox>
        </Form.Item>

        <h3>Community Permissions (Administrative Permissions)</h3>
        <Form.Item
          name={['permissions', 'communityPermissions', 'canManageRolesAndPermissions']}
          valuePropName="checked"
        >
          <Checkbox style={{ lineHeight: '32px' }} disabled={props.data.isDefault}>
            Can Manage Roles and Permissions
          </Checkbox>
        </Form.Item>
        <Form.Item name={['permissions', 'communityPermissions', 'canManageCommunitySettings']} valuePropName="checked">
          <Checkbox style={{ lineHeight: '32px' }} disabled={props.data.isDefault}>
            Can Manage Community Settings
          </Checkbox>
        </Form.Item>
        <Form.Item name={['permissions', 'communityPermissions', 'canManageSiteContent']} valuePropName="checked">
          <Checkbox style={{ lineHeight: '32px' }} disabled={props.data.isDefault}>
            Can Manage Site Content
          </Checkbox>
        </Form.Item>
        <Form.Item name={['permissions', 'communityPermissions', 'canManageMembers']} valuePropName="checked">
          <Checkbox style={{ lineHeight: '32px' }} disabled={props.data.isDefault}>
            Can Manage Members
          </Checkbox>
        </Form.Item>

        <h3>Service Ticket Permissions (Administrative Permissions)</h3>
        <Form.Item name={['permissions', 'serviceTicketPermissions', 'canManageTickets']} valuePropName="checked">
          <Checkbox style={{ lineHeight: '32px' }} disabled={props.data.isDefault}>
            Can Manage Tickets
          </Checkbox>
        </Form.Item>
        <Form.Item name={['permissions', 'serviceTicketPermissions', 'canAssignTickets']} valuePropName="checked">
          <Checkbox style={{ lineHeight: '32px' }} disabled={props.data.isDefault}>
            Can Assign Tickets
          </Checkbox>
        </Form.Item>
        <Form.Item name={['permissions', 'serviceTicketPermissions', 'canWorkOnTickets']} valuePropName="checked">
          <Checkbox style={{ lineHeight: '32px' }} disabled={props.data.isDefault}>
            Can Work On Tickets
          </Checkbox>
        </Form.Item>

        <h3>Property Permissions (Administrative Permissions)</h3>
        <Form.Item name={['permissions', 'propertyPermissions', 'canManageProperties']} valuePropName="checked">
          <Checkbox style={{ lineHeight: '32px' }} disabled={props.data.isDefault}>
            Can Manage Properties
          </Checkbox>
        </Form.Item>

        <h3>Violation Ticket Permissions (Administrative Permissions)</h3>
        <Form.Item name={['permissions', 'violationTicketPermissions', 'canAssignTickets']} valuePropName="checked">
          <Checkbox style={{ lineHeight: '32px' }} disabled={props.data.isDefault}>
            Can Assign Tickets
          </Checkbox>
        </Form.Item>
        <Form.Item name={['permissions', 'violationTicketPermissions', 'canCreateTickets']} valuePropName="checked">
          <Checkbox style={{ lineHeight: '32px' }} disabled={props.data.isDefault}>
            Can Create Tickets
          </Checkbox>
        </Form.Item>
        <Form.Item name={['permissions', 'violationTicketPermissions', 'canManageTickets']} valuePropName="checked">
          <Checkbox style={{ lineHeight: '32px' }} disabled={props.data.isDefault}>
            Can Manage Tickets
          </Checkbox>
        </Form.Item>
        <Form.Item name={['permissions', 'violationTicketPermissions', 'canWorkOnTickets']} valuePropName="checked">
          <Checkbox style={{ lineHeight: '32px' }} disabled={props.data.isDefault}>
            Can Work on Tickets
          </Checkbox>
        </Form.Item>

        <Button type="primary" htmlType="submit" value={'save'} disabled={props.data.isDefault} loading={formLoading}>
          Save
        </Button>
      </Form>
    </div>
  );
};
