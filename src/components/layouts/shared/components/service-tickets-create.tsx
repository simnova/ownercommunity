import { Button, Form, Input, Select } from 'antd';
import React from 'react';

import { ServiceTicketCreateInput } from '../../../../generated';

const { TextArea } = Input;

export interface ServiceTicketsCreateProps {
  data: {
    members: any[];
    properties: any[];
  };
  onSave: (member: ServiceTicketCreateInput) => void;
  isAdmin?: boolean;
}

export const ServiceTicketsCreate: React.FC<ServiceTicketsCreateProps> = (props) => {
  const [form] = Form.useForm();
  const [formLoading, setFormLoading] = React.useState(false);

  const formItems = () => {
    return (
      <>
        <Form.Item name={['title']} label="Title" rules={[{ required: true, message: 'Title is required.' }]}>
          <Input placeholder="Short title of the request" maxLength={200} />
        </Form.Item>

        <Form.Item
          name={['description']}
          label="Description"
          rules={[{ required: true, message: 'Description is required.' }]}
        >
          <TextArea placeholder="Description of the request" maxLength={2000} />
        </Form.Item>

        <Form.Item
          name={['propertyId']}
          label="Property"
          rules={[{ required: true, message: 'Property is required.' }]}
        >
          <Select
            allowClear={true}
            placeholder="Select a Property"
            options={props.data.properties}
            fieldNames={{ label: 'propertyName', value: 'id' }}
          />
        </Form.Item>
      </>
    );
  };

  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        onFinish={(values) => {
          setFormLoading(true);
          props.onSave(values);
          setFormLoading(false);
        }}
      >
        {formItems()}

        {props.isAdmin ? (
          <Form.Item
            name={['requestorId']}
            label="Requestor"
            rules={[{ required: true, message: 'Requestor is required.' }]}
          >
            <Select
              allowClear={true}
              placeholder="Select an Owner"
              options={props.data.members}
              fieldNames={{ label: 'memberName', value: 'id' }}
            />
          </Form.Item>
        ) : null}

        <Button type="primary" htmlType="submit" value={'save'} loading={formLoading}>
          Create Service Ticket
        </Button>
      </Form>
    </div>
  );
};
