import React from 'react';
import { Button, Form, Input } from 'antd';

import { MemberCreateInput } from '../../../../generated';

export interface MembersCreateProps {
  onSave: (member: MemberCreateInput) => void;
}

export const MembersCreate: React.FC<any> = (props) => {
  const [form] = Form.useForm();
  const [formLoading,setFormLoading] = React.useState(false);
  return (
    <div>

      <Form
        layout="vertical"
        form={form}
        initialValues={props.data}
        onFinish={(values) => {
          setFormLoading(true);
          props.onSave(values);
          setFormLoading(false);
        }}
        >
        <Form.Item
          name={["memberName"]}
          label="Member Name"
          rules={[
            { required: true, message: 'Member name is required.' },
          ]}
        >
          <Input placeholder='Member Name' maxLength={200} disabled={props.data.isDefault} />
        </Form.Item>


        <Button type="primary" htmlType="submit" value={'save'} disabled={props.data.isDefault} loading={formLoading}>
          Create Member
        </Button>
      </Form>
    </div>
  )
}