import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { PropertyAddInput } from '../../../../generated';

export interface PropertiesAddProps {
  onSave: (member: PropertyAddInput) => Promise<void>;
}

export const PropertiesAdd: React.FC<PropertiesAddProps> = (props) => {
  const [form] = Form.useForm<PropertyAddInput>();
  const [formLoading,setFormLoading] = React.useState<boolean>(false);

  const handleFinish = async (values: PropertyAddInput) => {
    setFormLoading(true);
    try {
     await props.onSave(values);
    } 
    catch (e) {
      console.error(e);
      message.error('Failed to add Property.',);
    } finally {
      setFormLoading(false);
    }
  }

  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
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