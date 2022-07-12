import { Table, Button, Layout, Menu, Drawer } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterOutlined } from '@ant-design/icons';
import { ServiceTicketsSearchFilters } from './service-tickets-search-filters';
import { ServiceTicketsSearchToolbar } from './service-tickets-search-toolbar';

const { Sider, Content } = Layout;

export const ServiceTicketsList: React.FC<any> = (props) => {
  const navigate = useNavigate();
  // const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);

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
      <Layout style={{ margin: '0px'}}>
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
        <Drawer title="Search Filters" placement="left" onClose={() => setVisible(false)} visible={visible} width={445}>
          <ServiceTicketsSearchToolbar />
          <ServiceTicketsSearchFilters />
        </Drawer>
        <Button type="default" onClick={() => setVisible(true)} style={{ width: '48px', margin: '20px 8px' }}>
          <FilterOutlined />
        </Button>
        <Content className="pl-2">
          <Table columns={columns} dataSource={props.data} rowKey={(record: any) => record.id} />
        </Content>
      </Layout>
    </>
  );
};
