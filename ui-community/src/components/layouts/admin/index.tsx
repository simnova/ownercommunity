import {
  BarsOutlined,
  ContactsOutlined,
  HomeOutlined,
  LayoutOutlined,
  SafetyOutlined,
  ScheduleOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Route, Routes, useParams } from 'react-router-dom';
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

  const pageLayouts: PageLayoutProps[] = [
    { path: '/community/:communityId/admin/:memberId', title: 'Home', icon: <HomeOutlined />, id: 'ROOT' },
    {
      path: '/community/:communityId/admin/:memberId/settings/*',
      title: 'Settings',
      icon: <SettingOutlined />,
      id: 2,
      parent: 'ROOT',
      hasPermissions: (member: Member) =>
        member?.role?.permissions?.communityPermissions?.canManageCommunitySettings ?? false
    },
    {
      path: '/community/:communityId/admin/:memberId/site-editor/*',
      title: 'Site Editor',
      icon: <LayoutOutlined />,
      id: 3,
      parent: 'ROOT',
      hasPermissions: (member: Member) => member?.role?.permissions?.communityPermissions?.canManageSiteContent ?? false
    },
    {
      path: '/community/:communityId/admin/:memberId/roles/*',
      title: 'Roles',
      icon: <SafetyOutlined />,
      id: 4,
      parent: 'ROOT',
      hasPermissions: (member: Member) =>
        member?.role?.permissions?.communityPermissions?.canManageRolesAndPermissions ?? false
    },
    {
      path: '/community/:communityId/admin/:memberId/members/*',
      title: 'Members',
      icon: <ContactsOutlined />,
      id: 5,
      parent: 'ROOT',
      hasPermissions: (member: Member) => member?.role?.permissions?.communityPermissions?.canManageMembers ?? false
    },
    {
      path: '/community/:communityId/admin/:memberId/properties/*',
      title: 'Properties',
      icon: <BarsOutlined />,
      id: 6,
      parent: 'ROOT',
      hasPermissions: (member: Member) => member?.role?.permissions?.propertyPermissions?.canManageProperties ?? false
    },
    {
      path: '/community/:communityId/admin/:memberId/service-tickets/*',
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
          <Route path="/" element={<Home />} />
          <Route path="/settings/*" element={<Settings />} />
          <Route path="/site-editor/*" element={<SiteEditor />} />
          <Route path="/roles/*" element={<Roles />} />
          <Route path="/members/*" element={<Members />} />
          <Route path="/properties/*" element={<Properties />} />
          <Route path="/service-tickets/*" element={<ServiceTickets />} />
        </Route>
      </Routes>
    </BlobToLocalStorage>
  );
};
