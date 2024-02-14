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
import { SectionLayout } from './section-layout';

export interface PageLayoutProps {
  path: string;
  title: string;
  icon: React.JSX.Element;
  id: string | number;
  parent?: string;
}

export const Admin: React.FC<any> = (_props) => {
  const params = useParams();

  const pageLayouts: PageLayoutProps[] = [
    { path: '/community/:communityId/admin', title: 'Home', icon: <HomeOutlined />, id: 'ROOT' },
    {
      path: '/community/:communityId/admin/settings/*',
      title: 'Settings',
      icon: <SettingOutlined />,
      id: 2,
      parent: 'ROOT'
    },
    {
      path: '/community/:communityId/admin/site-editor/*',
      title: 'Site Editor',
      icon: <LayoutOutlined />,
      id: 3,
      parent: 'ROOT'
    },
    {
      path: '/community/:communityId/admin/roles/*',
      title: 'Roles',
      icon: <SafetyOutlined />,
      id: 4,
      parent: 'ROOT'
    },
    {
      path: '/community/:communityId/admin/members/*',
      title: 'Members',
      icon: <ContactsOutlined />,
      id: 5,
      parent: 'ROOT'
    },
    {
      path: '/community/:communityId/admin/properties/*',
      title: 'Properties',
      icon: <BarsOutlined />,
      id: 6,
      parent: 'ROOT'
    },
    {
      path: '/community/:communityId/admin/service-tickets/*',
      title: 'Service Tickets',
      icon: <ScheduleOutlined />,
      id: 7,
      parent: 'ROOT'
    }
  ];

  return (
    <BlobToLocalStorage communityId={params.communityId}>
      <Routes>
        <Route path="" element={<SectionLayout pageLayouts={pageLayouts} />}>
          <Route path="/" element={<Home />} />
          <Route path="/settings/*" element={<Settings />} />
          <Route path="/site-editor/*" element={<SiteEditor />} />
          <Route path="/roles/*" element={<Roles />}  />
          <Route path="/members/*" element={<Members />} />
          <Route path="/properties/*" element={<Properties />} />
          <Route path="/service-tickets/*" element={<ServiceTickets />} />
        </Route>
      </Routes>
    </BlobToLocalStorage>
  );
};
