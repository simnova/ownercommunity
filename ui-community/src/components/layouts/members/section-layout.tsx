import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { Layout, theme } from 'antd';
import { LoggedInUserContainer } from '../../ui/organisms/header/logged-in-user.container';
import { MenuComponent } from '../shared/components/menu-component'
import { useEffect, useState } from 'react';
import { LocalSettingsKeys, handleToggler } from '../../../constants';
import { useLazyQuery } from '@apollo/client';
import { MemberSiteCurrentMemberHasAdminRoleDocument } from '../../../generated';
import { CommunitiesDropdownContainer } from '../../ui/organisms/dropdown-menu/communities-dropdown-container';

const { Sider, Header } = Layout;
export const SectionLayout: React.FC<any> = (props) => {
  const sidebarCollapsed = localStorage.getItem(LocalSettingsKeys.SidebarCollapsed);
  const [isExpanded, setIsExpanded] = useState(!sidebarCollapsed);
  const { communityId, memberId } = useParams();
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState<any>(null);

  const [loadMemberRole] = useLazyQuery(MemberSiteCurrentMemberHasAdminRoleDocument, {
    variables: {
      communityId: communityId
    }
  });

  useEffect(() => { 
    const fetchData = async () => {
      const result = await loadMemberRole();
      setData(result.data);
    }

    fetchData();
  }, []);

  const adminLink = () => {
      if (data?.memberForCurrentUser?.isAdmin !== null && data?.memberForCurrentUser?.isAdmin) {
        return (
          <a className="allowBoxShadow" onClick={() => navigate(`/community/${communityId}/admin/${memberId}`)}>
            View Admin Site
          </a>
        );
      }
  };

 
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  return (
    <Layout
      // className="site-layout"
      style={{ minHeight: '100vh', backgroundColor: colorBgContainer }}
      id="member-site-layout"
    >
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
         <div style={{ display: 'flex' }} className="allowBoxShadow">
            <CommunitiesDropdownContainer data={{ id: params.communityId }} />
          </div>
          {adminLink()}

          <div className="text-right  text-sky-400" style={{ flexGrow: '1' }}>
            <LoggedInUserContainer autoLogin={true} />
          </div>
        </div>
      </Header>
      <Layout
        hasSider
        style={{
          backgroundColor: colorBgContainer
        }}
      >
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
            bottom: 0,
            backgroundColor: colorBgContainer
          }}
        >
          <div className="logo" />

          <MenuComponent pageLayouts={props.pageLayouts} theme="light" mode="inline" />
        </Sider>

        <Layout
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1 auto',
            overflowY: 'scroll',
            height: 'calc(100vh - 64px)',
            backgroundColor: colorBgContainer
          }}
        >
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};
