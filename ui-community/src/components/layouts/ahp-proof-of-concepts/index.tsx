import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AHPPOCSectionLayout } from './section-layout';
import { HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { SelectableList } from './components/selectable-list';
import { AHPRequestsPage } from './pages/requests-page';

export interface PageLayoutProps {
  path: string;
  title: string;
  icon: React.JSX.Element;
  id: string | number;
  parent?: string;
}
const pageLayouts: PageLayoutProps[] = [
  { path: '/ahp-proof-of-concepts/requests', title: 'Requests', icon: <HomeOutlined />, id: 'ROOT' },
  {
    path: '/ahp-proof-of-concepts/settings',
    title: 'Settings',
    icon: <SettingOutlined />,
    id: '1',
    parent: 'ROOT'
  }
];
interface AHPProofOfConceptsProps {}
export const AHPProofOfConcepts: FC<AHPProofOfConceptsProps> = (props) => {
  return (
    <Routes>
      <Route path="" element={<AHPPOCSectionLayout pageLayouts={pageLayouts} />}>
        <Route path="requests" element={<AHPRequestsPage />} />
        <Route path="settings" element={<>Settings</>} />
      </Route>
    </Routes>
  );
};
