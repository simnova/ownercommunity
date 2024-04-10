import React from 'react';

import { Button, Form, Input } from 'antd';
import { PropertyAddInput } from '../../../../generated';

export interface PropertiesAddProps {
  onSave: (member: PropertyAddInput) => void;
}

export const PropertiesAdd: React.FC<PropertiesAddProps> = (props) => {
  const [form] = Form.useForm();
  const [formLoading,setFormLoading] = React.useState(false);
  return (
    <div>

      <Form
        layout="vertical"
        form={form}
        onFinish={(values) => {
          setFormLoading(true);
          props.onSave(values);
          setFormLoading(false);
        }}
        >
        <Form.Item
          name={["propertyName"]}
          label="Property Name"
          rules={[
            { required: true, message: 'Property name is required.' },
          ]}
        >
          <Input placeholder='Property Name' maxLength={200}  />
        </Form.Item>

        <Button type="primary" htmlType="submit" value={'save'} loading={formLoading}>
          Add Property
        </Button>
      </Form>
    </div>
  )
}