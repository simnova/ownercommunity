import { Button, Form, Input } from 'antd';
import React from 'react';

import { MemberAccountAddInput } from '../../../../generated';

export interface MembersAccountsAddProps {
  data: MemberAccountAddInput;
  onSave: (member: MemberAccountAddInput) => void;
  onCheckUserId: (userId: string) => Promise<{success:boolean, errorMessage:string}>;
}



export const MembersAccountsAdd: React.FC<MembersAccountsAddProps> = (props) => {
  const [form] = Form.useForm();
  const [formLoading,setFormLoading] = React.useState(false);

  const userIdNotAlreadyAssigned = async  (_: any, value:any) : Promise<void> => {
console.log('value: ', value );
    const result = await props.onCheckUserId(value);
    if (!result.success) {
      return Promise.reject(result.errorMessage);
    } else {
      return Promise.resolve();
    }
  }

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
          name={["account", "firstName"]}
          label="First Name"
          rules={[
            { required: true, message: 'First name is required.' },
          ]}
        >
          <Input placeholder='First Name' maxLength={200}  />
        </Form.Item>
        <Form.Item
          name={["account", "lastName"]}
          label="Last Name"

        >
          <Input placeholder='Last Name' maxLength={200}  />
        </Form.Item>
        <Form.Item
          name={["account", "user"]}
          label="User ID"
          rules={[
            { required: true, message: 'User ID is required.' },
            { validator: userIdNotAlreadyAssigned },
            
          ]}
        >
          <Input placeholder='User ID Name' maxLength={200}  />
        </Form.Item>

        <Button type="primary" htmlType="submit" value={'save'} loading={formLoading}>
          Add Member Account
        </Button>
      </Form>
    </div>
  )
}