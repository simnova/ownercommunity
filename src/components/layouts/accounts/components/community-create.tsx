import React from 'react';
import {Form, Input, Button} from 'antd';

export const CommunityCreate: React.FC<any> = (props) => {
  const [form] = Form.useForm();
  const [formLoading,setFormLoading] = React.useState(false);
  return (
    <Form
      layout='vertical'
      form={form}
      onFinish={(values) => {
        setFormLoading(true);
        props.onSave(values);
        setFormLoading(false);
      }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          { required: true, message: 'Please input Name!' },
        ]}
      >
        <Input placeholder="Name" />
      </Form.Item>
     
      <Button type="primary" htmlType="submit" loading={formLoading}>
        Create Community
      </Button>
    </Form> 
  )
}