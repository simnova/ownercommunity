import { FC, useEffect } from 'react';
import { Route, Routes, useMatch, useNavigate, useParams } from 'react-router-dom';
import { AHPObjectIDRouteLayer } from '..';
import { AHPObjectStatusRouteLayer } from '../..';
import { AHPObjectRouteLayer, AHPRootRouteLayer } from '../../../..';
import { PageLayoutProps } from '../../../../../shared/components/menu-component';
import { ActiveRequestDetailsPageLayout } from './active-request-details-page-layout';

interface ActiveRequestDetailsPageProps {}
export const ActiveRequestDetailsPage: FC<ActiveRequestDetailsPageProps> = (_props) => {
  const navigate = useNavigate();
const params = useParams()


  const match = useMatch(`/${AHPRootRouteLayer}/${AHPObjectRouteLayer.Cases}/${AHPObjectStatusRouteLayer.Active}/:${AHPObjectIDRouteLayer.CaseId}`);

  // redirect to (default) Chat if a case is selected
  useEffect(() => {
    if (match) {
      navigate('chat');
    }
  }, [match]);
  
  const pageLayouts: PageLayoutProps[] = [
    {
      path: `/${AHPRootRouteLayer}/${AHPObjectRouteLayer.Cases}/${AHPObjectStatusRouteLayer.Active}/:${AHPObjectIDRouteLayer.CaseId}/chat`,
      title: 'Chat',
      icon: <></>,
      id: 'ROOT'
    },
    {
      path: `/${AHPRootRouteLayer}/${AHPObjectRouteLayer.Cases}/${AHPObjectStatusRouteLayer.Active}/:${AHPObjectIDRouteLayer.CaseId}/application`,
      title: 'Application',
      icon: <></>,
      id: 'application',
      parent: 'ROOT'
    },
    {
      path: `/${AHPRootRouteLayer}/${AHPObjectRouteLayer.Cases}/${AHPObjectStatusRouteLayer.Active}/:${AHPObjectIDRouteLayer.CaseId}/files`,
      title: 'Files',
      icon: <></>,
      id: 'files',
      parent: 'ROOT'
    },
    {
      path: `/${AHPRootRouteLayer}/${AHPObjectRouteLayer.Cases}/${AHPObjectStatusRouteLayer.Active}/:${AHPObjectIDRouteLayer.CaseId}/transactions`,
      title: 'Transactions',
      icon: <></>,
      id: 'transactions',
      parent: 'ROOT'
    }
  ];

  return (
    <Routes>
      <Route path="" element={<ActiveRequestDetailsPageLayout pageLayouts={pageLayouts} />}>
        <Route path="chat" element={<>Chat for case id {params[AHPObjectIDRouteLayer.CaseId]}</>} />
        <Route path="application" element={<>Application  for case id {params[AHPObjectIDRouteLayer.CaseId]}</>} />
        <Route path="files" element={<>Files  for case id {params[AHPObjectIDRouteLayer.CaseId]}</>} />
        <Route path="transactions" element={<>Transactions  for case id {params[AHPObjectIDRouteLayer.CaseId]}</>} />
      </Route>
    </Routes>
  );
};
