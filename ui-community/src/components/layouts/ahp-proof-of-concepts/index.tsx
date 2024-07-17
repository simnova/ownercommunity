import { HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { FC, useEffect } from 'react';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import { PageLayoutProps } from '../shared/components/menu-component';
import { RequestListPage } from './pages/request-list-page';
import { AHPPOCSectionLayout } from './section-layout';


export const AHPRootRouteLayer = 'ahp-proof-of-concepts';
export const AHPFirstRouteLayer = {
  Cases: 'cases',
  Settings: 'settings'
};

interface AHPProofOfConceptsProps {}
export const AHPProofOfConcepts: FC<AHPProofOfConceptsProps> = (_props) => {
  const navigate = useNavigate();
  const match = useMatch(`/${AHPRootRouteLayer}`)

  // redirect to (default) cases if root route is accessed
  useEffect(() => {
    if (match) {
      navigate(AHPFirstRouteLayer.Cases)
    }
  }, [match])
  

  const pageLayouts: PageLayoutProps[] = [
    {
      path: `/${AHPRootRouteLayer}/${AHPFirstRouteLayer.Cases}/*`,
      title: 'Cases',
      icon: <HomeOutlined />,
      id: 'ROOT'
    },
    {
      path: `/${AHPRootRouteLayer}/${AHPFirstRouteLayer.Settings}`,
      title: 'Settings',
      icon: <SettingOutlined />,
      id: '1',
      parent: 'ROOT'
    }
  ];

  return (
    <Routes>
      <Route path="" element={<AHPPOCSectionLayout pageLayouts={pageLayouts} />}>
        <Route path={`${AHPFirstRouteLayer.Cases}/*`} element={<RequestListPage />} />
        <Route path={`${AHPFirstRouteLayer.Settings}`} element={<>Settings</>} />
      </Route>
    </Routes>
  );
};
