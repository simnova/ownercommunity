import { Button, Divider, Layout } from 'antd';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { MenuComponent, PageLayoutProps } from '../../../shared/components/menu-component';
import { CaseDetailsPage } from './case-details-page';

const { Content, Sider } = Layout;

interface CaseListPageLayoutProps {
  pageLayouts: PageLayoutProps[];
}
export const CaseListPageLayout: FC<CaseListPageLayoutProps> = (props) => {
  return (
    <Layout style={{ minHeight: '100%' }} hasSider>
      {/* make new requests and request list area */}
      <Sider
        width={300}
        style={{ borderRight: '1px solid black', borderBottom: '1px solid black', textAlign: 'center' }}
        theme="light"
      >
        <Button type="primary" style={{ margin: '20px 0 5px' }}>
          New Request
        </Button>
        <Divider style={{ margin: '15px 0 10px 0' }} />
        <MenuComponent pageLayouts={props.pageLayouts} theme="light" mode="horizontal" />
        <Outlet />
      </Sider>
      {/* request details area */}
      <Content style={{ background: 'white', padding: '10px' }}>
        <CaseDetailsPage />
      </Content>
    </Layout>
  );
};
