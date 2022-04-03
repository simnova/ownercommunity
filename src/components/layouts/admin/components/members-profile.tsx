import React from 'react';
import { Form,Input,Button,Descriptions, Checkbox } from 'antd';
import dayjs from 'dayjs';
import { FormTags } from '../../../ui/organisms/form-tags';

const { TextArea } = Input;

export const MembersProfile: React.FC<any> = (props) => {
  const [form] = Form.useForm();
  return (
    <>

      <Form
        layout="vertical"
        form={form}
        initialValues={props.data}
        onFinish={(values) => {
          props.onSave(values);
        }}
        >

        <Form.Item
          name="name"
          label="Name"
        >
          <Input placeholder='Name' maxLength={500} />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
        >
          <Input placeholder='Email' maxLength={254} />
        </Form.Item>
        <Form.Item
          name="bio"
          label="bio"
        >
          <TextArea placeholder='Bio' maxLength={2000} />
        </Form.Item>
        <Form.Item
          name="interests"
          label="Interests"
        >
          <FormTags />
        </Form.Item>
        <Form.Item 
          name={["showInterests"]}
          valuePropName="checked"        
          > 
          <Checkbox style={{ lineHeight: '32px' }}>Show Interests</Checkbox>
        </Form.Item>
        <Form.Item 
          name={["showEmail"]}
          valuePropName="checked"        
          > 
          <Checkbox style={{ lineHeight: '32px' }}>Show Email</Checkbox>
        </Form.Item>
        <Form.Item 
          name={["showLocation"]}
          valuePropName="checked"        
          > 
          <Checkbox style={{ lineHeight: '32px' }}>Show Location</Checkbox>
        </Form.Item>
        <Form.Item 
          name={["showProfile"]}
          valuePropName="checked"        
          > 
          <Checkbox style={{ lineHeight: '32px' }}>Show Profile</Checkbox>
        </Form.Item>
        <Form.Item 
          name={["showProperties"]}
          valuePropName="checked"        
          > 
          <Checkbox style={{ lineHeight: '32px' }}>Show Properties</Checkbox>
        </Form.Item>

        <Button type="primary" htmlType="submit" value={'save'}>
          Save
        </Button>

      </Form>
    </>
  )
}