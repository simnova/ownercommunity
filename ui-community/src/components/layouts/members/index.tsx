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
  SearchOutlined,
  WalletOutlined
} from '@ant-design/icons';
import { MemberProfile } from './pages/member-profile';
import { Neighbors } from './pages/neighbors';
import { Properties } from './pages/properties';
import { BlobToLocalStorage } from '../../shared/blob-to-local-storage';
import { ServiceTickets } from './pages/service-tickets';
import { CommunityProperty } from './pages/community-property';
import { PropertiesSearch } from './pages/properties-search';
import { PageLayoutProps } from '../admin';
import { Member } from '../../../generated';
import { Payment } from './pages/payment';

export const Members: React.FC<any> = (_props) => {

const pathLocations = {
  home: '',
  profile: 'profile/*',
  properties: 'properties/*',
  serviceTickets: 'service-tickets/*',
  listings: 'listings/*',
  neighbors: 'neighbors/*',
  propertiesSearch: 'propertiesSearch/*',
  payment: 'payment/*'
};


const pageLayouts: PageLayoutProps[] = [
  {
    path: pathLocations.home,
    title: 'Home',
    icon: <HomeOutlined />,
    id: 'ROOT'
  },
  {
    path: pathLocations.profile,
    title: 'Profile Settings',
    icon: <UserOutlined />,
    id: 2,
    parent: 'ROOT'
  },
  {
    path: pathLocations.properties,
    title: 'Properties',
    icon: <BarsOutlined />,
    id: 3,
    parent: 'ROOT'
  },
  {
    path: pathLocations.serviceTickets,
    title: 'Tickets',
    icon: <ScheduleOutlined />,
    id: 4,
    parent: 'ROOT',
    hasPermissions: (member: Member) =>
      (member?.role?.permissions?.serviceTicketPermissions?.canCreateTickets ||
        member?.role?.permissions?.serviceTicketPermissions?.canWorkOnTickets ||
        member?.role?.permissions?.serviceTicketPermissions?.canAssignTickets) ??
      false
  },
  {
    path: pathLocations.listings,
    title: 'Listings',
    icon: <ShopOutlined />,
    id: 5,
    parent: 'ROOT'
  },
  {
    path: pathLocations.neighbors,
    title: 'Neighbors',
    icon: <TeamOutlined />,
    id: 6,
    parent: 'ROOT'
  },
  {
    path: pathLocations.propertiesSearch,
    title: 'Property Search',
    icon: <SearchOutlined />,
    id: 7,
    parent: 'ROOT'
  },
  {
    path: pathLocations.payment,
    title: 'Payment',
    icon: <WalletOutlined />,
    id: 8,
    parent: 'ROOT'
  }
];


  const params = useParams();
  return (
    <BlobToLocalStorage communityId={params.communityId}>
      <Routes>
        <Route path="" element={<SectionLayout pageLayouts={pageLayouts} />}>
          <Route path={pathLocations.home} element={<Home />} />
          <Route path={pathLocations.profile} element={<MemberProfile />} />
          <Route path={pathLocations.listings} element={<CommunityProperty />} />
          <Route path={pathLocations.neighbors} element={<Neighbors />} />
          <Route path={pathLocations.properties} element={<Properties />} />
          <Route path={pathLocations.serviceTickets} element={<ServiceTickets />} />
          <Route path={pathLocations.propertiesSearch} element={<PropertiesSearch />} />
          <Route path={pathLocations.payment} element={<Payment />} />
        </Route>
      </Routes>
    </BlobToLocalStorage>
  );
};
