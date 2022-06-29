import { Routes, Route, useParams } from 'react-router-dom';
import { SectionLayout } from './section-layout';
import { Home } from './pages/home';
import {
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  BarsOutlined,
  ScheduleOutlined,
  ShopOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { MemberProfile } from './pages/member-profile';
import { Neighbors } from './pages/neighbors';
import { Properties } from './pages/properties';
import { BlobToLocalStorage } from '../../shared/blob-to-local-storage';
import { ServiceTickets } from './pages/service-tickets';
import { CommunityProperty } from './pages/community-property';
import { PropertiesSearch } from './pages/properties-search';

const pageLayouts = [
  {
    path: '/community/:communityId/member/:userId',
    title: 'Home',
    icon: <HomeOutlined />,
    id: 'ROOT'
  },
  {
    path: '/community/:communityId/member/:userId/profile/*',
    title: 'Profile Settings',
    icon: <UserOutlined />,
    id: 2,
    parent: 'ROOT'
  },
  {
    path: '/community/:communityId/member/:userId/properties/*',
    title: 'Properties',
    icon: <BarsOutlined />,
    id: 3,
    parent: 'ROOT'
  },
  {
    path: '/community/:communityId/member/:userId/service-tickets/*',
    title: 'Service Tickets',
    icon: <ScheduleOutlined />,
    id: 4,
    parent: 'ROOT'
  },
  {
    path: '/community/:communityId/member/:userId/listings/*',
    title: 'Listings',
    icon: <ShopOutlined />,
    id: 5,
    parent: 'ROOT'
  },
  {
    path: '/community/:communityId/member/:userId/neighbors/*',
    title: 'Neighbors',
    icon: <TeamOutlined />,
    id: 6,
    parent: 'ROOT'
  },
  {
    path: '/community/:communityId/member/:userId/propertiesSearch',
    title: 'Property Search',
    icon: <SearchOutlined />,
    id: 7,
    parent: 'ROOT'
  }
];

export const Members: React.FC<any> = (_props) => {
  const params = useParams();
  return (
    <BlobToLocalStorage communityId={params.communityId}>
      <Routes>
        <Route path="" element={<SectionLayout pageLayouts={pageLayouts} />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<MemberProfile />} />
          <Route path="/listings/*" element={<CommunityProperty />} />
          <Route path="/neighbors/*" element={<Neighbors />} />
          <Route path="/properties/*" element={<Properties />} />
          <Route path="/service-tickets/*" element={<ServiceTickets />} />
          <Route path="/propertiesSearch/*" element={<PropertiesSearch />} />
        </Route>
      </Routes>
    </BlobToLocalStorage>
  );
};
