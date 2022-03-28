import {Form, Input, Button} from 'antd';
export const CommunityCreate: React.FC<any> = (props) => {
  const [form] = Form.useForm();
  return (
    <Form
      layout='vertical'
      form={form}
      onFinish={(values) => {
        props.onSave(values);
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
     
      <Button type="primary" htmlType="submit">
        Create Community
      </Button>
    </Form> 
  )
}