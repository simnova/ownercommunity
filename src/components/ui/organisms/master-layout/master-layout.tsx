import React, { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Layout } from 'antd';
import { handleToggler, LocalSettingsKeys } from '../../../../constants';
import { MenuComponent } from '../../../layouts/admin/components/menu-component';
import { LoggedInUserContainer } from '../header/logged-in-user-container';
import { PageLayoutProps } from '../../../layouts/admin';
import { CommunitiesDropdownContainer } from '../dropdown-menu/communities-dropdown-container';

const { Sider, Header } = Layout;

interface MasterLayoutProps {
  hasHeaderDropdownMenu: boolean;
  hasSidebar: boolean;
  pageLayouts: PageLayoutProps[];
}

export const MasterLayout: React.FC<MasterLayoutProps> = (props) => {
  const params = useParams();
  const sidebarCollapsed = localStorage.getItem(LocalSettingsKeys.SidebarCollapsed);
  const [isExpanded, setIsExpanded] = useState(sidebarCollapsed ? false : true);

  return (
    <Layout className="site-layout" style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: 'black' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            gap: '10px'
          }}
        >
          {props.hasHeaderDropdownMenu ? (
            <div style={{ display: 'flex' }} className="allowBoxShadow">
              <CommunitiesDropdownContainer data={{ id: params.communityId }} />
            </div>
          ) : null}

          <a
            className="allowBoxShadow"
            onClick={() => (window.location.href = `/community/${params.communityId}/members`)}
          >
            View Member Site
          </a>

          <LoggedInUserContainer autoLogin={true} />
        </div>
      </Header>

      <Layout hasSider={props.hasSidebar}>
        {props.hasSidebar ? (
          <Sider
            theme="light"
            className="site-layout-background"
            collapsible
            collapsed={!isExpanded}
            onCollapse={() => handleToggler(isExpanded, setIsExpanded)}
            style={{
              overflow: 'auto',
              height: 'calc(100vh - 64px)',
              position: 'relative',
              left: 0,
              top: 0,
              bottom: 0
            }}
          >
            <div className="logo" />

            <MenuComponent pageLayouts={props.pageLayouts} theme="light" mode="inline" />
          </Sider>
        ) : null}

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
