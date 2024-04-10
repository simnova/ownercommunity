import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import { FormTags } from '../../../ui/organisms/form-tags';

const { TextArea } = Input;

export const MemberProfileDetails: React.FC<any> = (props) => {
  const [form] = Form.useForm();
  const [formLoading,setFormLoading] = React.useState(false);
  return (
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
        name="name"
        label="Name"
      >
        <Input placeholder='Name' maxLength={500}/>
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
      >
        <Input placeholder='Email' maxLength={254}/>
      </Form.Item>
      <Form.Item
        name="bio"
        label="bio"
      >
        <TextArea placeholder='Bio' maxLength={2000}/>
      </Form.Item>
      <Form.Item
        name="interests"
        label="Interests"
      >
        <FormTags/>
      </Form.Item>
      <Form.Item
        name={["showInterests"]}
        valuePropName="checked"
      >
        <Checkbox style={{lineHeight: '32px'}}>Show Interests</Checkbox>
      </Form.Item>
      <Form.Item
        name={["showEmail"]}
        valuePropName="checked"
      >
        <Checkbox style={{lineHeight: '32px'}}>Show Email</Checkbox>
      </Form.Item>
      <Form.Item
        name={["showLocation"]}
        valuePropName="checked"
      >
        <Checkbox style={{lineHeight: '32px'}}>Show Location</Checkbox>
      </Form.Item>
      <Form.Item
        name={["showProfile"]}
        valuePropName="checked"
      >
        <Checkbox style={{lineHeight: '32px'}}>Show Profile</Checkbox>
      </Form.Item>
      <Form.Item
        name={["showProperties"]}
        valuePropName="checked"
      >
        <Checkbox style={{lineHeight: '32px'}}>Show Properties</Checkbox>
      </Form.Item>

      <Button type="primary" htmlType="submit" value={'save'} loading={formLoading}>
        Save
      </Button>

    </Form>
  )
}