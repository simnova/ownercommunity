import React from 'react';
import { Form, Input, Button, Descriptions, Checkbox } from 'antd';
import dayjs from 'dayjs';
import { AdminSettingsGeneralContainerCommunityDocument } from '../../../../generated';
import { useQuery } from '@apollo/client';

export const SettingsGeneral: React.FC<any> = (props) => {
  const [form] = Form.useForm();
  const [formLoading,setFormLoading] = React.useState(false);

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
          rules={[
            { required: true, message: 'Please input the white label domain!' },
          ]}
        >
          <Input placeholder='White Label Domain' defaultValue={data.whiteLabelDomain} maxLength={50} />
        </Form.Item>
        <Form.Item
          name="domain"
          label="Domain"
          rules={[
            { required: true, message: 'Please input the domain!' },
          ]}
        >
          <Input placeholder='Domain' maxLength={50} defaultValue={data.domain} />
        </Form.Item>
        <Form.Item
          name="handle"
          label="Handle"
          rules={[
            { required: true, message: 'Please input your handle!' },
          ]}
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