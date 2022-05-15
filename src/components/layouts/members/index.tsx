import { Routes, Route, useParams } from 'react-router-dom';
import { SectionLayout } from './section-layout';
import { Home } from './pages/home';
import {
  HomeOutlined,
  ReadOutlined,
  UserOutlined,
  TeamOutlined,
  BarsOutlined,
} from '@ant-design/icons';
import { MemberProfile } from './pages/member-profile';
import { Vocabulary } from './pages/vocabulary';
import { Neighbors } from './pages/neighbors';
import { Properties } from './pages/properties';
import { BlobToLocalStorage } from '../../shared/blob-to-local-storage';


const pageLayouts = [
  {
    path: '/community/:communityId/member/:userId',
    title: 'Home',
    icon: <HomeOutlined />,
    id: 'ROOT',
  },
  {
    path: '/community/:communityId/member/:userId/profile/*',
    title: 'Profile Settings',
    icon: <UserOutlined />,
    id: 2,
    parent: 'ROOT',
  },
  {
    path: '/community/:communityId/member/:userId/properties/*',
    title: 'Properties',
    icon: <BarsOutlined />,
    id: 3,
    parent: 'ROOT'
  },
  {
    path: '/community/:communityId/member/:userId/vocabulary/*',
    title: 'Vocabulary',
    icon: <ReadOutlined />,
    id: 4,
    parent: 'ROOT',
  },
  {
    path: '/community/:communityId/member/:userId/neighbors/*',
    title: 'Neighbors',
    icon: <TeamOutlined />,
    id: 5,
    parent: 'ROOT',
  },
];

export const Members: React.FC<any> = (props) => {
  const params = useParams();
  return (
    <BlobToLocalStorage communityId={params.communityId}>
      <Routes>
        <Route path='' element={<SectionLayout pageLayouts={pageLayouts} />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<MemberProfile />} />
          <Route path='/vocabulary/*' element={<Vocabulary />} />
          <Route path='/neighbors/*' element={<Neighbors />} />
          <Route path='/properties/*' element={<Properties />} />
        </Route>
      </Routes>
    </BlobToLocalStorage>
  );
};
