import React from 'react';

import { UserDeleteOutlined } from '@ant-design/icons';
import { Button, Checkbox, Descriptions, Form, Input, Select } from 'antd';
import dayjs from 'dayjs';

import { PropertyTypeOptions } from '../../../../constants';
import { PropertyUpdateInput } from '../../../../generated';

export interface PropertiesDetailProps {
  data: {
    property: any;
    members: any[];
  };
  onSave: (property: PropertyUpdateInput) => void;
  onDelete: () => void;
  isAdmin?: boolean;
}

export const PropertiesDetail: React.FC<PropertiesDetailProps> = (props) => {
  const [form] = Form.useForm();
  const [formLoading, setFormLoading] = React.useState(false);
  return (
    <div>
      <Descriptions title="Property Info" size={'small'} layout={'vertical'}>
        <Descriptions.Item label="Id">{props.data.property.id}</Descriptions.Item>
        <Descriptions.Item label="Created At">
          {dayjs(props.data.property.createdAt).format('DD/MM/YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          {dayjs(props.data.property.updatedAt).format('DD/MM/YYYY')}
        </Descriptions.Item>

        {!props.isAdmin && (
          <>
            <Descriptions.Item label="Name">{props.data.property.propertyName}</Descriptions.Item>
            <Descriptions.Item label="Type">{props.data.property.propertyType}</Descriptions.Item>
          </>
        )}
      </Descriptions>
      <Form
        layout="vertical"
        form={form}
        initialValues={props.data.property}
        onFinish={(values) => {
          setFormLoading(true);
          const property: PropertyUpdateInput = {
            id: props.data.property.id,
            ...values
          };
          props.onSave(property);
          setFormLoading(false);
        }}
      >
        {props.isAdmin && (
          <>
            <Form.Item
              name={['propertyName']}
              label="Property Name"
              rules={[{ required: true, message: 'Property Name is required.' }]}
            >
              <Input placeholder="Name" maxLength={200} />
            </Form.Item>
            <Form.Item name={['propertyType']} label="Property Type">
              <Select placeholder="Property Type" options={PropertyTypeOptions} />
              {/* <Input placeholder='Name' maxLength={200} /> */}
            </Form.Item>

            <Form.Item name={['owner', 'id']} label="Owner">
              <Select
                allowClear={true}
                placeholder="Select an Owner"
                options={props.data.members}
                fieldNames={{ label: 'memberName', value: 'id' }}
              />
            </Form.Item>
          </>
        )}

        <Form.Item name={['listedForSale']} valuePropName="checked">
          <Checkbox style={{ lineHeight: '32px' }}>Listed for Sale</Checkbox>
        </Form.Item>
        <Form.Item name={['listedForRent']} valuePropName="checked">
          <Checkbox style={{ lineHeight: '32px' }}>Listed for Rent</Checkbox>
        </Form.Item>
        <Form.Item name={['listedForLease']} valuePropName="checked">
          <Checkbox style={{ lineHeight: '32px' }}>Listed for Lease</Checkbox>
        </Form.Item>
        <Form.Item name={['listedInDirectory']} valuePropName="checked">
          <Checkbox style={{ lineHeight: '32px' }}>Listed in Directory</Checkbox>
        </Form.Item>

        <Button type="primary" htmlType="submit" value={'save'}>
          Save
        </Button>
        {props.isAdmin && (
          <Button
            type="primary"
            danger
            icon={<UserDeleteOutlined />}
            onClick={props.onDelete}
            className={'float-right'}
            loading={formLoading}
          >
            Delete Property
          </Button>
        )}
      </Form>
    </div>
  );
};
