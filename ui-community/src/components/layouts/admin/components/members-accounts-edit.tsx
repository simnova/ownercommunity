import React from 'react';

import { UserDeleteOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

import { MemberAccountEditInput } from '../../../../generated';

export interface MembersAccountsEditProps {
  data: MemberAccountEditInput;
  onSave: (member: MemberAccountEditInput) => Promise<void>;
  onRemove: () => Promise<void>;
}

export const MembersAccountsEdit: React.FC<MembersAccountsEditProps> = (props) => {
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
          name={[ "firstName"]}
          label="First Name"
          rules={[
            { required: true, message: 'First name is required.' },
          ]}
        >
          <Input placeholder='First Name' maxLength={200}  />
        </Form.Item>
        <Form.Item
          name={["lastName"]}
          label="Last Name"

        >
          <Input placeholder='Last Name' maxLength={200}  />
        </Form.Item>

        <Button type="primary" htmlType="submit" value={'save'} >
          Save Member Account
        </Button>

        <Button type="primary" danger icon={<UserDeleteOutlined />} onClick={props.onRemove} className={'float-right'} loading={formLoading}>
          Remove Member Account
        </Button>
      </Form>
    </div>
  )
}