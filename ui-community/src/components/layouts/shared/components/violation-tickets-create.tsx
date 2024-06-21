import { Button, Form, Input, InputNumber, Select } from 'antd';
import React from 'react';

import { ViolationTicketCreateInput } from '../../../../generated';

const { TextArea } = Input;

export interface ViolationTicketsCreateProps {
  data: {
    members: any[];
    properties: any[];
  };
  onSave: (member: ViolationTicketCreateInput) => void;
  isAdmin?: boolean;
}

export const ViolationTicketsCreate: React.FC<ViolationTicketsCreateProps> = (props) => {
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

        <Form.Item
          name={['penaltyAmount']}
          label="Penalty Amount"
          rules={[{ required: true, message: 'Penalty amount is required for Admin Ticket.' }]}
        >
          <InputNumber
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
            className="w-fit"
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
            label="Member"
            rules={[{ required: true, message: 'Member is required.' }]}
          >
            <Select
              allowClear={true}
              placeholder="Select a Member"
              options={props.data.members}
              fieldNames={{ label: 'memberName', value: 'id' }}
            />
          </Form.Item>
        ) : null}

        <Button type="primary" htmlType="submit" value={'save'} loading={formLoading}>
          Create Violation Ticket
        </Button>
      </Form>
    </div>
  );
};
