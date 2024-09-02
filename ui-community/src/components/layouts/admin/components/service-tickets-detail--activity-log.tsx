import { Button, Form, Input, Table, Typography } from 'antd';
import { AdminServiceTicketsDetailContainerServiceTicketFieldsFragment, AdminServiceTicketsDetailContainerServiceTicketActivityDetailFieldsFragment, ServiceTicketActivityDetail, ServiceTicketAddUpdateActivityInput } from '../../../../generated';
import { useState } from 'react';
import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';

const { Title } = Typography;
const { TextArea } = Input;

export interface ServiceTicketsDetailActivityLogProps {
  data: {
    serviceTicket: AdminServiceTicketsDetailContainerServiceTicketFieldsFragment;
  };
  onAddUpdateActivity: (values: ServiceTicketAddUpdateActivityInput) => Promise<void>;
}

export const ServiceTicketsDetailActivityLog : React.FC<ServiceTicketsDetailActivityLogProps> = (props) => {
  const [addUpdateActivityForm] = Form.useForm<ServiceTicketAddUpdateActivityInput>();
  const [addUpdateActivityFormLoading, setAddUpdateActivityFormLoading] = useState<boolean>(false);

  const columns: ColumnsType<AdminServiceTicketsDetailContainerServiceTicketActivityDetailFieldsFragment> = [
    {
      title: 'Activity',
      dataIndex: 'activityType',
      key: 'activityType',
      render: (text: string) => {
        if (text === 'INPROGRESS') {
          return 'IN PROGRESS';
        }
        return text;
      }
    },
    {
      title: 'Activity By',
      dataIndex: ['activityBy', 'memberName'],
      key: 'activityBy'
    },
    {
      title: 'Description',
      dataIndex: ['activityDescription'],
      key: 'activityDescription'
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      defaultSortOrder: 'ascend',
      sorter: (a: any, b: any) => (new Date(a).getTime() > new Date(b).getTime() ? 1 : -1),
      render: (text: any) => <span>{dayjs(text).format('DD-MMM-YYYY h:mm A')}</span>
    }
  ];

  return (
  <>
    <Title level={5}>Activity Log</Title>
    <br />
    <Table
      columns={columns}
      dataSource={props.data.serviceTicket.activityLog as ServiceTicketActivityDetail[]}
      rowKey={(record: AdminServiceTicketsDetailContainerServiceTicketActivityDetailFieldsFragment) => record.id}
    />
    <Form
      layout="vertical"
      form={addUpdateActivityForm}
      onFinish={async (values) => {
        setAddUpdateActivityFormLoading(true);
        await props.onAddUpdateActivity({
          serviceTicketId: props.data.serviceTicket.id,
          activityDescription: values.activityDescription
        });
        addUpdateActivityForm.resetFields();
        setAddUpdateActivityFormLoading(false);
      }}
    >
      <Form.Item name={['activityDescription']} label="Activity Description">
        <TextArea rows={4} placeholder="Add an update to the ticket." maxLength={2000} />
      </Form.Item>
      <Button type="primary" htmlType="submit" value={'save'} loading={addUpdateActivityFormLoading}>
        Add Activity Update
      </Button>
    </Form>
  </>
  );
}