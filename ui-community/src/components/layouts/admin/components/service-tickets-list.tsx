import { Button, Table } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

export const ServiceTicketsList: React.FC<any> = (props) => {
  const navigate = useNavigate();
  const columns = [
    {
      title: 'Action',
      dataIndex: 'id',
      render: (text: any, record: any) => {
        return (
          <Button type="primary" size="small" onClick={() => navigate(`${record.ticketType}/${text}`)}>
            Edit
          </Button>
        );
      }
    },
    {
      title: 'Type',
      dataIndex: 'ticketType',
      key: 'ticketType',
      render: (text: string) => {
        switch (text) {
          case 'ViolationTicketType':
            return 'Violation';
          case 'ServiceTicketType':
            return 'Service Request';
          default:
            return text;
        }
      }
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Requestor',
      dataIndex: ['requestor'],
      key: 'requestor'
    },
    {
      title: 'Assigned To',
      dataIndex: ['assignedTo'],
      key: 'assignedTo'
    },
    {
      title: 'Priority',
      dataIndex: ['priority'],
      key: 'priority'
    },
    {
      title: 'Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text: any) => <span>{dayjs(text).format('MM/DD/YYYY')}</span>
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: any) => <span>{dayjs(text).format('MM/DD/YYYY')}</span>
    }
  ];
  console.table(props.data?.serviceTicketsResults);
  return (
    <div>
      <Table
        columns={columns}
        dataSource={props.data?.serviceTicketsResults as any}
        rowKey={(record: any) => record.id}
      />
    </div>
  );
};
