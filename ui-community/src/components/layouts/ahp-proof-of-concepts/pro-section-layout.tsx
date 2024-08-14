import ProLayout from '@ant-design/pro-layout';
import { Menu, Space, Button } from 'antd';
import { Header, Footer, Content } from 'antd/es/layout/layout';
import React from 'react';
import { useNavigate, Link, useResolvedPath, Outlet } from 'react-router-dom';
import { PageLayoutProps } from '../shared/components/menu-component';

interface ProSectionLayoutProps {
  pageLayouts: PageLayoutProps[];
}

const ProSectionLayout: React.FC<ProSectionLayoutProps> = ({ pageLayouts }) => {
  const navigate = useNavigate();

  const getKeyPath = () => {
    if (location.pathname.includes('settings')) {
      return 'settings';
    }
    return 'cases';
  };

  const createMenuItems = () => {
    return pageLayouts.map(layout => (
      <Menu.Item
        key={layout.id}
        style={{
          padding: '16px 24px',
          minHeight: '70px',
          minWidth: '50px',
          display: 'flex',
          textAlign: 'center',
          lineHeight: '1.2',
          borderRadius: '0',
          backgroundColor: getKeyPath() === layout.id ? '#bec2f4' : 'transparent'
        }}
      >
        <Link to={useResolvedPath(layout.path).pathname}></Link>
        {layout.icon}
        <div style={{ fontSize: '10px' }}>{layout.title}</div>
      </Menu.Item>
    ));
  };

  const HeaderLeftCorner = <div style={{ flex: 1 }}>Intealth</div>;

  const HeaderRightCorner = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
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
          <Button style={{ color: 'white' }} type="link" onClick={() => navigate('/')}>
            Logout
          </Button>
        </Space>
      </Space>
    </div>
  );

  const MainHeader = (
    <Header
      style={{
        background: '#3f4373',
        color: 'white',
        display: 'flex',
        padding: '0 16px',
        zIndex: 1,
        position: 'fixed',
        width: '100%',
        height: '70px',
        top: 0
      }}
    >
      {HeaderLeftCorner}
      {HeaderRightCorner}
    </Header>
  );

  const footer = <Footer style={{ textAlign: 'center' }}>Intealth ©2024</Footer>;

  return (
    <div className="ahp">
      {MainHeader}
      <ProLayout
        style={{
          minHeight: 'calc(100vh - 1000px)'
        }}
        menuContentRender={() => (
          <Menu
            defaultSelectedKeys={['1']}
            mode="inline"
            style={{
              position: 'fixed',
              width: '72px',
              top: '65px',
              marginLeft: '-12px'
            }}
            theme="light"
            selectedKeys={[getKeyPath()]}
          >
            {createMenuItems()}
          </Menu>
        )}
        menuHeaderRender={() => null}
        footerRender={() => footer}
        collapsedButtonRender={() => null}
        collapsed={true}
      >
        <Content
          style={{
            // background: "white",
            height: '800px'
          }}
        >
          <Outlet />
        </Content>
      </ProLayout>
    </div>
  );
};

export default ProSectionLayout;
