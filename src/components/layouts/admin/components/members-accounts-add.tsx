import React from 'react';
import { Form,Input,Button }  from 'antd';
import { MemberAccountAddInput } from '../../../../generated';
import { RuleObject } from 'antd/lib/form';

export interface MembersAccountsAddProps {
  data: MemberAccountAddInput;
  onSave: (member: MemberAccountAddInput) => void;
  onCheckUserId: (userId: string) => Promise<{success:boolean, errorMessage:string}>;
}



export const MembersAccountsAdd: React.FC<MembersAccountsAddProps> = (props) => {
  const [form] = Form.useForm();

  const userIdNotAlreadyAssigned = async  (rule:RuleObject,value:any) : Promise<void> => {
    var result = await props.onCheckUserId(value);
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
            props.onSave(values);
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


        <Button type="primary" htmlType="submit" value={'save'} >
          Add Member Account
        </Button>
      </Form>
    </div>
  )
}