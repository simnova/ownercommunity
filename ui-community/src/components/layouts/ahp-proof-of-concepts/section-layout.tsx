import { Button, Layout, Menu, Row, Space } from 'antd';
import { FC, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { PageLayoutProps } from '.';
import { MenuComponent } from '../shared/components/menu-component';
const { Header, Content, Footer, Sider } = Layout;

interface AHPPOCSectionLayoutProps {
  pageLayouts: PageLayoutProps[];
}
export const AHPPOCSectionLayout: FC<AHPPOCSectionLayoutProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false);
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
            border: '1px solid black',
            textAlign: 'center',
            lineHeight: '30px'
          }}
        >
          JD
        </div>
        <Space>
          <div>John Doe</div>
          <Button
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
        style={{ background: 'white', border: '1px solid black', display: 'flex', justifyContent: 'space-between' }}
      >
        <HeaderLeftCorner />
        <HeaderRightCorner />
      </Header>
      <Layout style={{ minHeight: '100%', background: 'white' }}>
        <Sider
          style={{ border: '1px solid black', borderTop: '0' }}
          theme="light"
          // collapsible
          // collapsed={collapsed}
          // onCollapse={(value) => setCollapsed(value)}
        >
          <MenuComponent pageLayouts={props.pageLayouts} theme="light" mode="inline" />
        </Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
