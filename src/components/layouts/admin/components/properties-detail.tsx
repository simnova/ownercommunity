import React from 'react';
import { Form,Input,Button,Descriptions,  Checkbox } from 'antd';
import dayjs from 'dayjs';
import { PropertyUpdateInput } from '../../../../generated';

export interface PropertiesDetailProps {
  data: {
    property: any
  };
  onSave: (property: PropertyUpdateInput) => void;
}

export const PropertiesDetail: React.FC<any> = (props) => {
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
      </Form>
    </div>
  )
}