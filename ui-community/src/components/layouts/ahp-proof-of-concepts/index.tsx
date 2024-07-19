import { HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { FC, useEffect } from 'react';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import { PageLayoutProps } from '../shared/components/menu-component';
import { RequestListPage } from './pages/request-list-page';
import { AHPPOCSectionLayout } from './section-layout';

export const AHPRootRouteLayer = 'ahp-proof-of-concepts';
export const AHPObjectRouteLayer = {
  Cases: 'cases',
  Settings: 'settings'
};

interface AHPProofOfConceptsProps {}
export const AHPProofOfConcepts: FC<AHPProofOfConceptsProps> = (_props) => {
  const navigate = useNavigate();
  const match = useMatch(`/${AHPRootRouteLayer}`);

  // redirect to (default) cases if root route is accessed
  useEffect(() => {
    if (match) {
      navigate(AHPObjectRouteLayer.Cases);
    }
  }, [match]);

  const pageLayouts: PageLayoutProps[] = [
    {
      path: `/${AHPRootRouteLayer}/${AHPObjectRouteLayer.Cases}/*`,
      title: 'Cases',
      icon: <HomeOutlined />,
      id: 'ROOT'
    },
    {
      path: `/${AHPRootRouteLayer}/${AHPObjectRouteLayer.Settings}`,
      title: 'Settings',
      icon: <SettingOutlined />,
      id: '1',
      parent: 'ROOT'
    }
  ];

  return (
    <Routes>
      <Route path="" element={<AHPPOCSectionLayout pageLayouts={pageLayouts} />}>
        <Route path={`${AHPObjectRouteLayer.Cases}/*`} element={<RequestListPage />} />
        <Route path={`${AHPObjectRouteLayer.Settings}`} element={<>Settings</>} />
      </Route>
    </Routes>
  );
};
