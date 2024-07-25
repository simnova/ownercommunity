import { Layout } from 'antd';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { MenuComponent, PageLayoutProps } from '../../../../../shared/components/menu-component';

interface ActiveCaseDetailsPageLayoutProps {
  pageLayouts: PageLayoutProps[];
}
export const ActiveCaseDetailsPageLayout: FC<ActiveCaseDetailsPageLayoutProps> = (props) => {
  return (
    <Layout>
      <Layout.Content style={{ minHeight: '100%', background: 'white' }}>
        <MenuComponent pageLayouts={props.pageLayouts} theme="light" mode="horizontal" />
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};
