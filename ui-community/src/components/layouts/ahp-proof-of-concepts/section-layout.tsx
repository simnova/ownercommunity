import { Button, Layout, Space } from 'antd';
import { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { MenuComponent, PageLayoutProps } from '../shared/components/menu-component';
import Breadcrumbs from './components/breadcrumbs';
const { Header, Content, Sider } = Layout;

interface AHPPOCSectionLayoutProps {
  pageLayouts: PageLayoutProps[];
}
export const AHPPOCSectionLayout: FC<AHPPOCSectionLayoutProps> = (props) => {
  const navigation = useNavigate();

  const HeaderLeftCorner = () => <div style={{ justifyContent: 'flex-start' }}>Intealth</div>;
  const HeaderRightCorner = () => (
    <div style={{ justifyContent: 'flex-end' }}>
      <Space direction="horizontal">
        <div
          style={{
            height: '30px',
            width: '30px',
            borderRadius: '15px',
            border: '1px solid white',
            textAlign: 'center',
            lineHeight: '30px'
          }}
        >
          JD
        </div>
        <Space>
          <div>John Doe</div>
          <Button
            style={{ color: 'white' }}
            type="link"
            onClick={() => {
              navigation('/');
            }}
          >
            Logout
          </Button>
        </Space>
      </Space>
    </div>
  );
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          background: '#3f4373',
          border: '1px solid black',
          display: 'flex',
          justifyContent: 'space-between',
          color: 'white'
        }}
      >
        <HeaderLeftCorner />
        <HeaderRightCorner />
      </Header>
      <Header
        style={{
          background: 'white',
          border: '1px solid black',
          height: 'auto',
        }}
      >
        <Breadcrumbs />
      </Header>
      <Layout style={{ minHeight: '100%', background: 'white' }} hasSider>
        <Sider style={{ border: '1px solid black', borderTop: '0' }} theme="light">
          <MenuComponent pageLayouts={props.pageLayouts} theme="light" mode="inline" />
        </Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
