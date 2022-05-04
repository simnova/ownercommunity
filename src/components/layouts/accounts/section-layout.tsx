import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { LoggedInUserContainer } from '../../ui/organisms/header/logged-in-user-container';

const { Header, Content, Footer } = Layout;

export const SectionLayout: React.FC<any> = (props) => {
  return (
    <Layout>
      <Header style={{ backgroundColor: 'black' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            gap: '10px'
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
            Header
          </div>
          {/* <div className="text-right text-sky-400" style={{ flexGrow: '1' }}>
            <LoggedInUserContainer autoLogin={true} />
          </div> */}
          <div className="text-right text-sky-400" style={{ flexGrow: '1' }}>
            <LoggedInUserContainer autoLogin={true} />
          </div>
        </div>
      </Header>
      <Layout hasSider={true}></Layout>
      <Layout
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 auto',
          overflowY: 'scroll',
          height: 'calc(100vh - 64px)'
        }}
      >
        <h1>Accounts</h1>
        <Outlet />
      </Layout>
    </Layout>
  );
};
