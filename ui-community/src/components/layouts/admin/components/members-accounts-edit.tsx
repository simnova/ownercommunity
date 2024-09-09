import React from 'react';
import { UserDeleteOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { MemberAccountEditInput, AdminMembersAccountEditContainerMemberFieldsFragment } from '../../../../generated';

export interface MembersAccountsEditProps {
  data: Omit<(AdminMembersAccountEditContainerMemberFieldsFragment & MemberAccountEditInput),'id'>;
  onSave: (member: MemberAccountEditInput) => Promise<void>;
  onRemove: () => Promise<void>;
}

export const MembersAccountsEdit: React.FC<MembersAccountsEditProps> = (props) => {
  const [form] = Form.useForm<MemberAccountEditInput>();
  const [formLoading,setFormLoading] = React.useState<boolean>(false);

  const handleFinish = async (values: MemberAccountEditInput) => {
    setFormLoading(true);
    try {
      await props.onSave(values);
    }
    catch (e) {
      console.error(e);
      message.error('Failed to save Member Account.',);
    } finally {
      setFormLoading(false);
    }
  }

  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        initialValues={props.data}
        onFinish={handleFinish}
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