import React from 'react';
import { Form,Input,Button,Descriptions, Select, Checkbox } from 'antd';
import dayjs from 'dayjs';
import { PropertyUpdateInput } from '../../../../generated';
import { UserDeleteOutlined } from '@ant-design/icons';

export interface PropertiesDetailProps {
  data: {
    property: any
    members: any[]
  };
  onSave: (property: PropertyUpdateInput) => void;
  onDelete: () => void;
}

export const PropertiesDetail: React.FC<PropertiesDetailProps> = (props) => {
  const [form] = Form.useForm();
  return(
    <div>
      <Descriptions title="Property Info" size={'small'} layout={'vertical'}>
        <Descriptions.Item label="Id">{props.data.property.id}</Descriptions.Item>
        <Descriptions.Item label="Created At">{dayjs(props.data.property.createdAt).format('DD/MM/YYYY')}</Descriptions.Item>
        <Descriptions.Item label="Updated At">{dayjs(props.data.property.createdAt).format('DD/MM/YYYY')}</Descriptions.Item>
      </Descriptions>
      <Form
        layout="vertical"
        form={form}
        initialValues={props.data.property}
        onFinish={(values) => {
          var property: PropertyUpdateInput = {
            id: props.data.property.id,
            ...values
          }
          props.onSave(property);
        }}
        >
        <Form.Item
          name={['propertyName']}
          label="Property Name"
          rules={[
            { required: true, message: 'Property Name is required.' },
          ]}
        >
          <Input placeholder='Name' maxLength={200} />
        </Form.Item>
        <Form.Item
          name={['propertyType']}
          label="Property Type"
        >
          <Input placeholder='Name' maxLength={200} />
        </Form.Item>

        <Form.Item
          name={['owner','id']}
          label="Owner"
        >
          <Select allowClear={true}  placeholder="Select am Owner" options={props.data.members} fieldNames={{label:'memberName', value:'id'}} />
        </Form.Item>

        <Form.Item 
          name={["listedForSale"]}
          valuePropName="checked"        
          > 
          <Checkbox style={{ lineHeight: '32px' }}>Listed for Sale</Checkbox>
        </Form.Item>
        <Form.Item 
          name={["listedForRent"]}
          valuePropName="checked"        
          > 
          <Checkbox style={{ lineHeight: '32px' }}>Listed for Rent</Checkbox>
        </Form.Item>
        <Form.Item 
          name={["listedForLease"]}
          valuePropName="checked"        
          > 
          <Checkbox style={{ lineHeight: '32px' }}>Listed for Lease</Checkbox>
        </Form.Item>
        <Form.Item 
          name={["listedInDirectory"]}
          valuePropName="checked"        
          > 
          <Checkbox style={{ lineHeight: '32px' }}>Listed in Directory</Checkbox>
        </Form.Item>

        <Button type="primary" htmlType="submit" value={'save'} >
          Save
        </Button>
        <Button type="primary" danger icon={<UserDeleteOutlined />} onClick={props.onDelete} className={'float-right'}>
          Delete Property
        </Button>
      </Form>
    </div>
  )
}