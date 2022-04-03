import React from 'react';
import { Form,Input,Button }  from 'antd';
import { PropertyAddInput } from '../../../../generated';

export interface PropertiesAddProps {
  onSave: (member: PropertyAddInput) => void;
}

export const PropertiesAdd: React.FC<PropertiesAddProps> = (props) => {
  const [form] = Form.useForm();
  return (
    <div>

      <Form
        layout="vertical"
        form={form}
        onFinish={(values) => {
            props.onSave(values);
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


        <Button type="primary" htmlType="submit" value={'save'} >
          Add Property
        </Button>
      </Form>
    </div>
  )
}