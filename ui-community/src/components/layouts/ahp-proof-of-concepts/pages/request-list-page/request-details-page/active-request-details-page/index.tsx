import { FC, useEffect } from 'react';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import { ActiveRequestDetailsPageLayout } from './active-request-details-page-layout';
import { PageLayoutProps } from '../../../../../shared/components/menu-component';
import { AHPFirstRouteLayer, AHPRootRouteLayer } from '../../../..';
import { AHPSecondRouteLayer } from '../..';

interface ActiveRequestDetailsPageProps {}
export const ActiveRequestDetailsPage: FC<ActiveRequestDetailsPageProps> = (_props) => {

  const navigate = useNavigate();

  const match = useMatch(`/${AHPRootRouteLayer}/${AHPFirstRouteLayer.Cases}/${AHPSecondRouteLayer.Active}/:requestId`);

  // redirect to (default) Chat if a case is selected
  useEffect(() => {
    if (match) {
      navigate('chat');
    }
  }, [match]);
  
  const pageLayouts: PageLayoutProps[] = [
    {
      path: `/${AHPRootRouteLayer}/${AHPFirstRouteLayer.Cases}/${AHPSecondRouteLayer.Active}/:requestId/chat`,
      title: 'Chat',
      icon: <></>,
      id: 'ROOT'
    },
    {
      path: `/${AHPRootRouteLayer}/${AHPFirstRouteLayer.Cases}/${AHPSecondRouteLayer.Active}/:requestId/application`,
      title: 'Application',
      icon: <></>,
      id: 'application',
      parent: 'ROOT'
    },
    {
      path: `/${AHPRootRouteLayer}/${AHPFirstRouteLayer.Cases}/${AHPSecondRouteLayer.Active}/:requestId/files`,
      title: 'Files',
      icon: <></>,
      id: 'files',
      parent: 'ROOT'
    },
    {
      path: `/${AHPRootRouteLayer}/${AHPFirstRouteLayer.Cases}/${AHPSecondRouteLayer.Active}/:requestId/transactions`,
      title: 'Transactions',
      icon: <></>,
      id: 'transactions',
      parent: 'ROOT'
    }
  ];

  return (
    <Routes>
      <Route path="" element={<ActiveRequestDetailsPageLayout pageLayouts={pageLayouts} />}>
        <Route path="chat" element={<>Chat</>} />
        <Route path="application" element={<>Application</>} />
        <Route path="files" element={<>Files</>} />
        <Route path="transactions" element={<>Transactions</>} />
      </Route>
    </Routes>
  );
};
