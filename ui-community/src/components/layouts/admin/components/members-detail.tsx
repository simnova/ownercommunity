import React from 'react';

import { Button, Descriptions, Form, Input, Select } from 'antd';
import dayjs from 'dayjs';

import { MemberUpdateInput, AdminMembersDetailContainerMemberFieldsFragment, AdminMembersDetailContainerRoleFieldsFragment } from '../../../../generated';
import { useNavigate, useParams } from 'react-router-dom';

export interface MembersDetailProps {
  data: {
    member: AdminMembersDetailContainerMemberFieldsFragment;
    roles: AdminMembersDetailContainerRoleFieldsFragment[];
  };
  onSave: (member: MemberUpdateInput) => void;
}

export const MembersDetail: React.FC<MembersDetailProps> = (props) => {
  const [form] = Form.useForm<MemberUpdateInput>();
  const [formLoading, setFormLoading] = React.useState<boolean>(false);
  const params = useParams();

  const navigate = useNavigate();
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
          <div className="flex gap-2">
            <Select
              allowClear={true}
              placeholder="Select a role"
              options={props.data.roles.map((role: any) => ({ label: role.roleName, value: role.id }))}
              defaultValue={props.data.member?.role?.id ?? null}
              onChange={(value) => form.setFieldsValue({ role: { id: value } })}
            />
            <Button
              disabled={!form.getFieldValue('role')}
              onClick={() =>
                navigate(`/community/${params.communityId}/admin/${params.memberId}/roles/${form.getFieldValue('role')}`)
              }
              aria-label="Open Role Details"
            >
              Open Role Details
            </Button>
          </div>
        </Form.Item>

        <Button type="primary" htmlType="submit" value={'save'} loading={formLoading}>
          Save
        </Button>
      </Form>
    </div>
  );
};
