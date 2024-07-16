import { Layout } from 'antd';
import { FC } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { PageLayoutProps } from '../../..';
import { MenuComponent } from '../../../../shared/components/menu-component';

interface ActiveRequestDetailsPageLayoutProps {
  pageLayouts: PageLayoutProps[];
}
export const ActiveRequestDetailsPageLayout: FC<ActiveRequestDetailsPageLayoutProps> = (props) => {
  const params = useParams();
  return (
    <Layout>
      <Layout.Content style={{ minHeight: '100%', background: 'white' }}>
        <MenuComponent pageLayouts={props.pageLayouts} theme="light" mode="horizontal" />
        <Outlet />
        {/* <Tabs type="card">
          <Tabs.TabPane key={ActiveRequestTabName.CHAT} tab={ActiveRequestTabName.CHAT}>
            CHAT HISTORY for request id: {params.requestId}
          </Tabs.TabPane>
          <Tabs.TabPane key={ActiveRequestTabName.APPLICATION} tab={ActiveRequestTabName.APPLICATION}>
            APPLICATION for request id: {params.requestId}
          </Tabs.TabPane>
          <Tabs.TabPane key={ActiveRequestTabName.FILES} tab={ActiveRequestTabName.FILES}>
            FILES for request id: {params.requestId}
          </Tabs.TabPane>
          <Tabs.TabPane key={ActiveRequestTabName.TRANSACTIONS} tab={ActiveRequestTabName.TRANSACTIONS}>
            TRANSACTIONS for request id: {params.requestId}
          </Tabs.TabPane>
        </Tabs> */}
      </Layout.Content>
    </Layout>
  );
};
