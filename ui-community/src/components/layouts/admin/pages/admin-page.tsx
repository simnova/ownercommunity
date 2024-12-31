import { BarsOutlined, ContactsOutlined, HomeOutlined, LayoutOutlined, SafetyOutlined, ScheduleOutlined, SettingOutlined } from '@ant-design/icons';
import ProLayout from '@ant-design/pro-layout';
import { Grid, Menu } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import { Link, Route, Routes, useResolvedPath, useLocation } from 'react-router-dom';
import { ServiceTickets } from './service-tickets';
import { Properties } from './properties';
import { Settings } from './settings';
import { SiteEditor } from './site-editor';
import { Roles } from './roles';
import { Home } from './home';
import { Members } from './members';

interface HomeProps {}

export const AdminPage: React.FC<HomeProps> = () => {
  const casesRoutePath = useResolvedPath('cases');
  const settingsRoutePath = useResolvedPath('settings');
  const profileRoutePath = useResolvedPath('profile');
  const location = useLocation();

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [clickedId, setClickedId] = useState<string | null>(null);
  const screen = Grid.useBreakpoint();
  const isMobile = screen.xs;

  const MenuContent: React.FC<{ matchedIds: string[]; pageLayouts: any[] }> = ({ matchedIds, pageLayouts }) => {
    const createMenuItems = () => {
      return pageLayouts.map((layout) => {
        const isHovered = hoveredId === layout.id;
        const isClicked = clickedId === layout.id;
        const isSelected = matchedIds.includes(layout.id);
        const icon =
          (isHovered || isClicked || isSelected) && layout.filledIcon
            ? React.cloneElement(layout.filledIcon, { style: { color: '#3f4373', fontSize: '24px' } })
            : layout.icon
            ? React.cloneElement(layout.icon, { style: { fontSize: '24px' } })
            : null;

        return {
          key: layout.id,
          label: (
            <Link to={layout.path}>
              <div>{icon}</div>
              <div>{layout.title}</div>
            </Link>
          ),
          style: {
            paddingTop: '16px',
            paddingBottom: '16px',
            paddingLeft: '24px',
            paddingRight: '24px',
            minHeight: '70px',
            minWidth: '55px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            lineHeight: '1.2',
            borderRadius: '0',
            backgroundColor: isSelected ? '#d3d6f8' : 'transparent',
            fontSize: '10px',
            width: '100%',
            marginInline: '0px',
            marginBlock: '0px'
          },
          onMouseEnter: () => setHoveredId(layout.id),
          onMouseLeave: () => setHoveredId(null),
          onClick: () => {
            setClickedId(layout.id);
            if (isMobile) {
              setCollapsed(true);
            }
          }
        };
      });
    };

    return (
      <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
        style={{
          width: '100%'
        }}
        theme="light"
        selectedKeys={matchedIds}
        items={createMenuItems() as any}
      ></Menu>
    );
  };

  const pathLocations = {
    home: '*',
    settings: 'settings/*',
    siteEditor: 'site-editor/*',
    roles: 'roles/*',
    members: 'members/*',
    properties: 'properties/*',
    serviceTickets: 'service-tickets/*'
  };

  const pageLayouts = [
    { path: pathLocations.home, title: 'Home', icon: <HomeOutlined />, id: 'ROOT' },
    {
      path: pathLocations.settings,
      title: 'Settings',
      icon: <SettingOutlined />,
      id: 2,
      parent: 'ROOT'
      // hasPermissions: (member: Member) =>   member?.role?.permissions?.communityPermissions?.canManageCommunitySettings ?? false
    },
    {
      path: pathLocations.siteEditor,
      title: 'Site Editor',
      icon: <LayoutOutlined />,
      id: 3,
      parent: 'ROOT'
      // hasPermissions: (member: Member) => member?.role?.permissions?.communityPermissions?.canManageSiteContent ?? false
    },
    {
      path: pathLocations.roles,
      title: 'Roles',
      icon: <SafetyOutlined />,
      id: 4,
      parent: 'ROOT'
      // hasPermissions: (member: Member) => member?.role?.permissions?.communityPermissions?.canManageRolesAndPermissions ?? false
    },
    {
      path: pathLocations.members,
      title: 'Members',
      icon: <ContactsOutlined />,
      id: 5,
      parent: 'ROOT'
      // hasPermissions: (member: Member) => member?.role?.permissions?.communityPermissions?.canManageMembers ?? false
    },
    {
      path: pathLocations.properties,
      title: 'Properties',
      icon: <BarsOutlined />,
      id: 6,
      parent: 'ROOT'
      // hasPermissions: (member: Member) => member?.role?.permissions?.propertyPermissions?.canManageProperties ?? false
    },
    {
      path: pathLocations.serviceTickets,
      title: 'Tickets',
      icon: <ScheduleOutlined />,
      id: 7,
      parent: 'ROOT'
      // hasPermissions: (member: Member) =>(member?.role?.permissions?.serviceTicketPermissions?.canManageTickets || member?.role?.permissions?.violationTicketPermissions?.canManageTickets) ?? false
    }
  ];

  const matchPartialRoute = (currentPath: string, routePath: string) => {
    return currentPath.startsWith(routePath);
  };

  const getMatchedPageIds = (pageLayouts: any[], location: { pathname: string }) => {
    const currentPath = location.pathname;

    return pageLayouts.filter((layout) => matchPartialRoute(currentPath, layout.path)).map((layout) => layout.id.toString());
  };

  const matchedIds = getMatchedPageIds(pageLayouts, location);

  const [collapsed, setCollapsed] = useState(true);

  return (
    <ProLayout
      token={{
        sider: {
          paddingInlineLayoutMenu: 0
        }
      }}
      menuContentRender={() => <MenuContent matchedIds={matchedIds} pageLayouts={pageLayouts} />}
      menuHeaderRender={() => null}
      footerRender={() => null}
      collapsedButtonRender={() => null}
      onCollapse={() => setCollapsed(!collapsed)}
      collapsed={collapsed}
      siderWidth={86}
      contentStyle={{
        paddingBlock: '0px',
        paddingInline: '0px',
        height: '100%',
        width: '100%',
        backgroundColor: '#ffffff',
        zIndex: 1
      }}
    >
      <Content style={{ height: 'calc(100% - 55px)', overflowY: isMobile ? 'unset' : 'auto' }}>
        <Routes>
          <Route path={pathLocations.home} element={<Home />} />
          <Route path={pathLocations.settings} element={<Settings />} />
          <Route path={pathLocations.siteEditor} element={<SiteEditor />} />
          <Route path={pathLocations.roles} element={<Roles />} />
          <Route path={pathLocations.members} element={<Members />} />
          <Route path={pathLocations.properties} element={<Properties />} />
          <Route path={pathLocations.serviceTickets} element={<ServiceTickets />} />
        </Routes>
      </Content>
    </ProLayout>
  );
};
