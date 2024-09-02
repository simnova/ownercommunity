import { Button, Form, Input, Select, Space, Typography } from 'antd';
import { AdminServiceTicketsDetailContainerPropertyFieldsFragment, AdminServiceTicketsDetailContainerServiceTicketFieldsFragment, ServiceTicketUpdateInput } from '../../../../generated';
import { useState } from 'react';
const { Title } = Typography;
const { TextArea } = Input;

export interface ServiceTicketsDetailDraftFormProps {
  data: {
    serviceTicket: AdminServiceTicketsDetailContainerServiceTicketFieldsFragment;
    properties: AdminServiceTicketsDetailContainerPropertyFieldsFragment[];
  };
  onUpdate: (serviceTicket: ServiceTicketUpdateInput) => void;
}
export const ServiceTicketsDetailDraftForm : React.FC<ServiceTicketsDetailDraftFormProps> = (props) => 
{
  const [editDraftForm] = Form.useForm<ServiceTicketUpdateInput>();
  const [editDraftFormLoading, setEditDraftFormLoading] = useState<boolean>(false);
  return(
    <>
      <Title level={5}>Edit Draft Ticket</Title>
      <br />
      <Form
        layout="vertical"
        form={editDraftForm}
        initialValues={props.data.serviceTicket}
        onFinish={(values) => {
          setEditDraftFormLoading(true);
          props.onUpdate(values);
          setEditDraftFormLoading(false);
        }}
      >
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

        <Form.Item name={['property', 'id']} label="Property">
          <Select
            allowClear={true}
            placeholder="Select a Property"
            options={props.data.properties}
            fieldNames={{ label: 'propertyName', value: 'id' }}
          />
        </Form.Item>

        <Form.Item
          name={['priority']}
          label="Priority"
          rules={[{ required: true, message: 'Priority is required.' }]}
        >
          <Select allowClear={false} placeholder="Select a Priority">
            <Select.Option value={1}>1-Critical</Select.Option>
            <Select.Option value={2}>2-High</Select.Option>
            <Select.Option value={3}>3-Normal</Select.Option>
            <Select.Option value={4}>4-Low</Select.Option>
            <Select.Option value={5}>5-No Rush</Select.Option>
          </Select>
        </Form.Item>
        
        <Space>
          <Button type="primary" htmlType="submit" value={'save'} loading={editDraftFormLoading}>
            Save Draft
          </Button>
        </Space>
      </Form>
    </>
  );
}