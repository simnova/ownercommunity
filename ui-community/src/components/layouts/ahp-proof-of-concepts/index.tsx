import { HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequestsPage } from './pages/requests-page';
import { AHPPOCSectionLayout } from './section-layout';

export interface PageLayoutProps {
  path: string;
  title: string;
  icon: React.JSX.Element;
  id: string | number;
  parent?: string;
}
const pageLayouts: PageLayoutProps[] = [
  { path: '/ahp-proof-of-concepts/requests/*', title: 'Requests', icon: <HomeOutlined />, id: 'ROOT' },
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
        <Route path="requests/*" element={<RequestsPage />} />
        <Route path="settings" element={<>Settings</>} />
      </Route>
    </Routes>
  );
};
