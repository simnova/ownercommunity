import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { theme } from 'antd';
import { LoggedInUserContainer } from '../../ui/organisms/header/logged-in-user.container';
const { Header } = Layout;

export const SectionLayout: React.FC<any> = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  console.log('Nishan', colorBgContainer);
  return (
    <Layout className="site-layout" style={{ minHeight: '100vh' }}>
      <Header
        style={{
          backgroundColor: colorBgContainer
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            gap: '10px'
          }}
        >
          <LoggedInUserContainer autoLogin={true} />
        </div>
      </Header>

      <Layout>
        <Layout
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1 auto',
            overflowY: 'scroll',
            height: 'calc(100vh - 64px)'
          }}
        >
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};
