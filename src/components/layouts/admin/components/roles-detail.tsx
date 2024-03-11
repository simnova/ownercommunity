import React from 'react';

import { Button, Checkbox, Descriptions, Form, Input } from 'antd';
import dayjs from 'dayjs';

import { Role, RoleAddInput, RoleUpdateInput } from '../../../../generated';

export interface RolesDetailProps {
  data: Role;
  onAdd: (role: RoleAddInput) => void;
  onUpdate: (role: RoleUpdateInput) => void;
}

export const RolesDetail: React.FC<any> = (props) => {
  const [form] = Form.useForm();
  const [formLoading,setFormLoading] = React.useState(false);
  return (
    <div>
      <Descriptions title="Role Info" size={'small'} layout={'vertical'}>
        <Descriptions.Item label="Id">{props.data.id}</Descriptions.Item>
        <Descriptions.Item label="Is Default">{props.data?(props.data!.isDefault?"true":"false"):"false"}</Descriptions.Item>
        <Descriptions.Item label="Created At">{dayjs(props.data.createdAt).format('DD/MM/YYYY')}</Descriptions.Item>
        <Descriptions.Item label="Updated At">{dayjs(props.data.createdAt).format('DD/MM/YYYY')}</Descriptions.Item>
      </Descriptions>
      <Form
        layout="vertical"
        form={form}
        initialValues={props.data}
        onFinish={(values) => {
          setFormLoading(true);
          if(props.data?.id){
            values.id = props.data!.id
            props.onUpdate(values)
          }else{
            props.onAdd(values);
          }
          setFormLoading(false);
        }}
        >
        <Form.Item
          name={["roleName"]}
          label="Role Name"
          rules={[
            { required: true, message: 'Role name is required.' },
          ]}
        >
          <Input placeholder='Role Name' maxLength={200} disabled={props.data.isDefault} />
        </Form.Item>

        <h3>Member Permissions</h3>
        <Form.Item 
          name={["permissions","communityPermissions","canEditOwnMemberProfile"]}
          valuePropName="checked"        
          > 
          <Checkbox style={{ lineHeight: '32px' }} disabled={props.data.isDefault}>Can Edit Own Member Profile</Checkbox>
        </Form.Item>
        <Form.Item 
          name={["permissions","communityPermissions","canEditOwnMemberAccounts"]}
          valuePropName="checked"        
          > 
          <Checkbox style={{ lineHeight: '32px' }} disabled={props.data.isDefault}>Can Edit Own Member Accounts</Checkbox>
        </Form.Item>
        <Form.Item 
          name={["permissions","serviceTicketPermissions","canCreateTickets"]}
          valuePropName="checked"        
          > 
          <Checkbox style={{ lineHeight: '32px' }} disabled={props.data.isDefault}>Can Create Tickets</Checkbox>
        </Form.Item>
        <Form.Item 
          name={["permissions","propertyPermissions","canEditOwnProperty"]}
          valuePropName="checked"        
          > 
          <Checkbox style={{ lineHeight: '32px' }} disabled={props.data.isDefault}>Can Edit Own Property</Checkbox>
        </Form.Item>

        <h3>Community Permissions (Administrative Permissions)</h3>
        <Form.Item 
          name={["permissions","communityPermissions","canManageRolesAndPermissions"]}
          valuePropName="checked"        
          > 
          <Checkbox style={{ lineHeight: '32px' }} disabled={props.data.isDefault}>Can Manage Roles and Permissions</Checkbox>
        </Form.Item>
        <Form.Item 
          name={["permissions","communityPermissions","canManageCommunitySettings"]}
          valuePropName="checked"        
          > 
          <Checkbox style={{ lineHeight: '32px' }} disabled={props.data.isDefault}>Can Manage Community Settings</Checkbox>
        </Form.Item>
        <Form.Item 
          name={["permissions","communityPermissions","canManageSiteContent"]}
          valuePropName="checked"        
          > 
          <Checkbox style={{ lineHeight: '32px' }} disabled={props.data.isDefault}>Can Manage Site Content</Checkbox>
        </Form.Item>
        <Form.Item 
          name={["permissions","communityPermissions","canManageMembers"]}
          valuePropName="checked"        
          > 
          <Checkbox style={{ lineHeight: '32px' }} disabled={props.data.isDefault}>Can Manage Members</Checkbox>
        </Form.Item>

        <h3>Service Ticket Permissions (Administrative Permissions)</h3>
        <Form.Item 
          name={["permissions","serviceTicketPermissions","canManageTickets"]}
          valuePropName="checked"        
          > 
          <Checkbox style={{ lineHeight: '32px' }} disabled={props.data.isDefault}>Can Manage Tickets</Checkbox>
        </Form.Item>
        <Form.Item 
          name={["permissions","serviceTicketPermissions","canAssignTickets"]}
          valuePropName="checked"        
          > 
          <Checkbox style={{ lineHeight: '32px' }} disabled={props.data.isDefault}>Can Assign Tickets</Checkbox>
        </Form.Item>
        <Form.Item 
          name={["permissions","serviceTicketPermissions","canWorkOnTickets"]}
          valuePropName="checked"        
          > 
          <Checkbox style={{ lineHeight: '32px' }} disabled={props.data.isDefault}>Can Work On Tickets</Checkbox>
        </Form.Item>

        <h3>Property Permissions (Administrative Permissions)</h3>
        <Form.Item 
          name={["permissions","propertyPermissions","canManageProperties"]}
          valuePropName="checked"        
          > 
          <Checkbox style={{ lineHeight: '32px' }} disabled={props.data.isDefault}>Can Manage Properties</Checkbox>
        </Form.Item>

        <Button type="primary" htmlType="submit" value={'save'} disabled={props.data.isDefault} loading={formLoading}>
          Save
        </Button>
      </Form>
    </div>
  )
}