import React from 'react';
import { Form,Input,Button }  from 'antd';
import { MemberCreateInput } from '../../../../generated';

export interface MembersCreateProps {
  onSave: (member: MemberCreateInput) => void;
}

export const MembersCreate: React.FC<any> = (props) => {
  const [form] = Form.useForm();
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
          name={["memberName"]}
          label="Member Name"
          rules={[
            { required: true, message: 'Member name is required.' },
          ]}
        >
          <Input placeholder='Member Name' maxLength={200} disabled={props.data.isDefault} />
        </Form.Item>


        <Button type="primary" htmlType="submit" value={'save'} disabled={props.data.isDefault}>
          Create Member
        </Button>
      </Form>
    </div>
  )
}