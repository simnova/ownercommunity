import { Table, Button, Layout } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

export const ServiceTicketsList: React.FC<any> = (props) => {
  const navigate = useNavigate();

  const columns = [
    {
      title: 'Action',
      dataIndex: 'id',
      render: (text: any) => (
        <Button type="primary" size="small" onClick={() => navigate(text)}>
          Edit
        </Button>
      )
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
      render: (text: any) => <span>{dayjs(text).format('DD/MM/YYYY')}</span>
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: any) => <span>{dayjs(text).format('DD/MM/YYYY')}</span>
    }
  ];

  return (
    <>
      <Layout style={{ margin: '0px' }}>
        <Content>
          <Table columns={columns} dataSource={props.data} pagination={{position: ['topRight']}} rowKey={(record: any) => record.id} />
        </Content>
      </Layout>
    </>
  );
};
