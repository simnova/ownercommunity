import { Button, Form, Select, Typography } from 'antd';
import { AdminServiceTicketsDetailContainerMemberFieldsFragment, AdminServiceTicketsDetailContainerServiceTicketFieldsFragment, ServiceTicketAssignInput } from '../../../../generated';
import { useState } from 'react';
const { Title } = Typography;

export interface serviceTicketsDetailAssignmentFormProps {
  data: {
    serviceTicket: AdminServiceTicketsDetailContainerServiceTicketFieldsFragment;
    members: AdminServiceTicketsDetailContainerMemberFieldsFragment[];
  };
  onAssign: (assignInput: ServiceTicketAssignInput) => void;
}
export const ServiceTicketsDetailAssignmentForm : React.FC<serviceTicketsDetailAssignmentFormProps> = (props) => 
{
  const [assignForm] = Form.useForm<ServiceTicketAssignInput>();
  const [assignFormLoading, setAssignFormLoading] = useState(false);

  return (
    <div style={{ marginTop: 20, padding: 24, minHeight: '100%', backgroundColor: 'white' }}>
    <Title level={5}>Ticket Assignment</Title>
    <br />
    <Form
      layout="vertical"
      form={assignForm}
      initialValues={props.data.serviceTicket}
      onFinish={(values) => {
        setAssignFormLoading(true);
        console.log('values', values);
        props.onAssign({
          serviceTicketId: props.data.serviceTicket.id,
          assignedToId: values.assignedToId
        });
        setAssignFormLoading(false);
      } }
    >
      <Form.Item name={['assignedTo', 'id']} label="Assigned To">
        <Select
          allowClear={true}
          placeholder="Select a Member"
          options={props.data.members}
          fieldNames={{ label: 'memberName', value: 'id' }}
          style={{ width: '35%' }} />
      </Form.Item>
      <Button type="primary" htmlType="submit" value={'save'} loading={assignFormLoading}>
        Save Assignment
      </Button>
    </Form>
    </div>
  );
}
