import {
  BarsOutlined,
  ContactsOutlined,
  HomeOutlined,
  LayoutOutlined,
  SafetyOutlined,
  ScheduleOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Route, Routes, useParams, useResolvedPath } from 'react-router-dom';
import { BlobToLocalStorage } from '../../shared/blob-to-local-storage';
import { Home } from './pages/home';
import { Members } from './pages/members';
import { Properties } from './pages/properties';
import { Roles } from './pages/roles';
import { ServiceTickets } from './pages/service-tickets';
import { Settings } from './pages/settings';
import { SiteEditor } from './pages/site-editor';
import { SectionLayoutContainer } from './section-layout.container';
import { Member } from '../../../generated';

export interface PageLayoutProps {
  path: string;
  title: string;
  icon: React.JSX.Element;
  id: string | number;
  parent?: string;
  hasPermissions?: (member: Member) => boolean;
}

export const Admin: React.FC<any> = (_props) => {
  const params = useParams();

  const pathLocations = {
    home: '',
    settings: 'settings/*',
    siteEditor: 'site-editor/*',
    roles: 'roles/*',
    members: 'members/*',
    properties: 'properties/*',
    serviceTickets: 'service-tickets/*'
  };
  
  const pageLayouts: PageLayoutProps[] = [
    { path: useResolvedPath(pathLocations.home).pathname, title: 'Home', icon: <HomeOutlined />, id: 'ROOT' },
    {
      path: useResolvedPath('settings/*').pathname,
      title: 'Settings',
      icon: <SettingOutlined />,
      id: 2,
      parent: 'ROOT',
      hasPermissions: (member: Member) =>
        member?.role?.permissions?.communityPermissions?.canManageCommunitySettings ?? false
    },
    {
      path: useResolvedPath(pathLocations.siteEditor).pathname,
      title: 'Site Editor',
      icon: <LayoutOutlined />,
      id: 3,
      parent: 'ROOT',
      hasPermissions: (member: Member) => member?.role?.permissions?.communityPermissions?.canManageSiteContent ?? false
    },
    {
      path: useResolvedPath(pathLocations.roles).pathname,
      title: 'Roles',
      icon: <SafetyOutlined />,
      id: 4,
      parent: 'ROOT',
      hasPermissions: (member: Member) =>
        member?.role?.permissions?.communityPermissions?.canManageRolesAndPermissions ?? false
    },
    {
      path: useResolvedPath(pathLocations.members).pathname,
      title: 'Members',
      icon: <ContactsOutlined />,
      id: 5,
      parent: 'ROOT',
      hasPermissions: (member: Member) => member?.role?.permissions?.communityPermissions?.canManageMembers ?? false
    },
    {
      path: useResolvedPath(pathLocations.properties).pathname,
      title: 'Properties',
      icon: <BarsOutlined />,
      id: 6,
      parent: 'ROOT',
      hasPermissions: (member: Member) => member?.role?.permissions?.propertyPermissions?.canManageProperties ?? false
    },
    {
      path: useResolvedPath(pathLocations.serviceTickets).pathname,
      title: 'Tickets',
      icon: <ScheduleOutlined />,
      id: 7,
      parent: 'ROOT',
      hasPermissions: (member: Member) => (member?.role?.permissions?.serviceTicketPermissions?.canManageTickets || 
                                          member?.role?.permissions?.violationTicketPermissions?.canManageTickets) ?? false
    }
  ];

  return (
    <BlobToLocalStorage communityId={params.communityId}>
      <Routes>
        <Route path="" element={<SectionLayoutContainer pageLayouts={pageLayouts} />}>
          <Route path={pathLocations.home} element={<Home />} />
          <Route path={pathLocations.settings} element={<Settings />} />
          <Route path={pathLocations.siteEditor} element={<SiteEditor />} />
          <Route path={pathLocations.roles} element={<Roles />} />
          <Route path={pathLocations.members} element={<Members />} />
          <Route path={pathLocations.properties} element={<Properties />} />
          <Route path={pathLocations.serviceTickets} element={<ServiceTickets />} />
        </Route>
      </Routes>
    </BlobToLocalStorage>
  );
};
