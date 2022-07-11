import { Table, Button, Layout, Menu } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { ServiceTicketsSearchFilters } from './service-tickets-search-filters';

const { Sider, Content } = Layout;

export const ServiceTicketsList: React.FC<any> = (props) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
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
      dataIndex: ['requestor', 'memberName'],
      key: 'requestor'
    },
    {
      title: 'Assigned To',
      dataIndex: ['assignedTo', 'memberName'],
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
      <Layout hasSider>
        <Sider
          collapsible
          trigger={null}
          collapsed={collapsed}
          style={{ overflow: 'auto', border: '1px solid #ccc' }}
          theme="light"
          collapsedWidth={48}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center'
              // borderBottom: '1px solid #ccc'
            }}
            className="py-3"
          >
            <Button
              type="text"
              icon={collapsed ? <LeftOutlined /> : <RightOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ margin: '0 auto', color: 'black', backgroundColor: 'transparent' }}
            />
          </div>

          <ServiceTicketsSearchFilters />
          
          {!collapsed && <div className="p-3">Thing</div>}
        </Sider>
        <Content className="pl-2">
          <Table columns={columns} dataSource={props.data} rowKey={(record: any) => record.id} />
        </Content>
      </Layout>
    </>
  );
};
