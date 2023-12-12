import { Button, Descriptions, Form, Input, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';


export const SettingsGeneral: React.FC<any> = (props) => {
  const [form] = Form.useForm();
  const [formLoading,setFormLoading] = React.useState(false);
  const { Text } = Typography;

  const data = props.data;

  return (
    <>
      <Descriptions title="Community Info" size={'small'} layout={'vertical'}>
        <Descriptions.Item label="Id">{props.data.id}</Descriptions.Item>
        <Descriptions.Item label="Created At">{dayjs(props.data.createdAt).format('DD/MM/YYYY')}</Descriptions.Item>
        <Descriptions.Item label="Updated At">{dayjs(props.data.createdAt).format('DD/MM/YYYY')}</Descriptions.Item>
      </Descriptions>
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
          rules={[
            { required: true, message: 'Community Name is required.' },
          ]}
        >
          <Input placeholder='Name' maxLength={200} /> 
        </Form.Item>
        <Form.Item
          name="whiteLabelDomain"
          label="White Label Domain"
        >

          <Input placeholder='White Label Domain' defaultValue={data.whiteLabelDomain} maxLength={50} />
        </Form.Item>
        <div className={'m-3'}>
          The white domain is used to allow users to access your public community website.<br/>
          They will be able access it at : https://<Text strong>{data.whiteLabelDomain}</Text>.owner.community<br/>
          <Text type={'danger'}>This is necessary</Text> to allow users to access your community website unless you have a custom domain you own. (see below)
      </div>

        <Form.Item
          name="domain"
          label="Domain"
        >
          <Input placeholder='Domain' maxLength={50} defaultValue={data.domain} />
        </Form.Item>
        <div className={'m-3'}>
          The domain is used to apply a custom domain to the public facing website.<br/>
          You must have a domain name registered with us before you can use this feature.<br/>
          Assign the CNAME of "www" to "cname.vercel-dns.com" in your DNS settings.<br/>
          Once added, you can use the domain name in the white label field above.<br/>
          <br/>
          Status: {data.domainStatus.verified ? <Text type={'success'}>Verified</Text> : <Text type={'danger'}>Not Verified</Text>}<br/>
          {data.domainStatus.verificationDetail ? <Text type={'danger'}>{JSON.stringify(data.domainStatus.verificationDetail)}</Text> : null}

          
        </div>


        <Form.Item
          name="handle"
          label="Handle"
        >
          <Input placeholder='Handle' maxLength={50} defaultValue={data.handle}/>
        </Form.Item>
        <Button type="primary" htmlType="submit" value={'save'} loading={formLoading}>
          Save
        </Button>
      </Form>
    </>
  )
}