import { Table, Button, Layout, Menu, Drawer } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;

export const ServiceTicketsList: React.FC<any> = (props) => {
  const navigate = useNavigate();
  // const [collapsed, setCollapsed] = useState(false);

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
        {/* <Sider
          collapsible
          trigger={null}
          collapsed={collapsed}
          style={{ overflow: 'auto', border: '1px solid #ccc' }}
          theme="light"
          collapsedWidth={60}
          width={445}
        >
          {!collapsed && <ServiceTicketsSearchToolbar />}
          {!collapsed && <ServiceTicketsSearchFilters />}

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
              style={{ margin: '0 auto', color: 'black', backgroundColor: 'transparent', position: `${collapsed ? 'absolute' : 'relative'}`, bottom: '5px' }}
            />
          </div>
        </Sider> */}

        <Content>
          <Table columns={columns} dataSource={props.data} rowKey={(record: any) => record.id} />
        </Content>
      </Layout>
    </>
  );
};
