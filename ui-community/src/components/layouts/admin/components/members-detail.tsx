import React from 'react';

import { Button, Descriptions, Form, Input, Popover, Select } from 'antd';
import dayjs from 'dayjs';

import { MemberUpdateInput } from '../../../../generated';
import { InfoCircleOutlined } from '@ant-design/icons';

export interface MembersDetailProps {
  data: {
    member: any;
    roles: any[];
  };
  onSave: (member: MemberUpdateInput) => void;
}

export const MembersDetail: React.FC<any> = (props) => {
  const [form] = Form.useForm();
  const [formLoading, setFormLoading] = React.useState(false);
  const roleContent = (
    <div>
      <p>
        <span>ID: </span>
        {props.data.member.role.id}
      </p>
      <p>
        <span>Role Name: </span>
        {props.data.member.role.roleName}
      </p>
    </div>
  );
  return (
    <div>
      <Descriptions title="Member Info" size={'small'} layout={'vertical'}>
        <Descriptions.Item label="Id">{props.data.member.id}</Descriptions.Item>
        <Descriptions.Item label="Created At">
          {dayjs(props.data.member.createdAt).format('MM/DD/YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          {dayjs(props.data.member.createdAt).format('MM/DD/YYYY')}
        </Descriptions.Item>
      </Descriptions>
      <Form
        layout="vertical"
        form={form}
        initialValues={props.data.member}
        onFinish={(values) => {
          setFormLoading(true);
          const member: MemberUpdateInput = {
            id: props.data.member.id,
            memberName: values.memberName,
            role: values.role.id
          };
          props.onSave(member);
          setFormLoading(false);
        }}
      >
        <Form.Item
          name={['memberName']}
          label="Member Name"
          rules={[{ required: true, message: 'Member Name is required.' }]}
        >
          <Input placeholder="Name" maxLength={200} />
        </Form.Item>
        <Form.Item name={['role', 'id']} label="Role" required>
          <div className="flex gap-2" h-full>
            <Select
              allowClear={true}
              placeholder="Select a role"
              options={props.data.roles}
              fieldNames={{ label: 'roleName', value: 'id' }}
            />
            <Popover content={roleContent} title="Role">
              <Button>
                <InfoCircleOutlined />
              </Button>
            </Popover>
          </div>
        </Form.Item>

        <Button type="primary" htmlType="submit" value={'save'} loading={formLoading}>
          Save
        </Button>
      </Form>
    </div>
  );
};
