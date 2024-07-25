import { FC, useEffect } from 'react';
import { Route, Routes, useMatch, useNavigate, useParams, useResolvedPath } from 'react-router-dom';
import { AHPObjectIDRouteLayer } from '..';
import { AHPObjectStatusRouteLayer } from '../..';
import { AHPObjectRouteLayer, AHPRootRouteLayer } from '../../../..';
import { PageLayoutProps } from '../../../../../shared/components/menu-component';
import { ActiveCaseDetailsPageLayout } from './active-case-details-page-layout';
import { ActiveCaseChatPage } from './active-case/active-case-chat-page';

export const AHPActiveCaseDetailsLayer = {
  Chat: 'chat',
  Application: 'application',
  Files: 'files',
  Transactions: 'transactions'
};

interface ActiveCaseDetailsPageProps {}
export const ActiveCaseDetailsPage: FC<ActiveCaseDetailsPageProps> = (_props) => {
  const navigate = useNavigate();
  const params = useParams();
  const chatRoute = useResolvedPath(AHPActiveCaseDetailsLayer.Chat);
  const applicationRoute = useResolvedPath(AHPActiveCaseDetailsLayer.Application);
  const filesRoute = useResolvedPath(AHPActiveCaseDetailsLayer.Files);
  const transactionsRoute = useResolvedPath(AHPActiveCaseDetailsLayer.Transactions);

  const match = useMatch(
    `/${AHPRootRouteLayer}/${AHPObjectRouteLayer.Cases}/${AHPObjectStatusRouteLayer.Active}/:${AHPObjectIDRouteLayer.CaseId}`
  );

  // redirect to (default) Chat if a case is selected
  useEffect(() => {
    if (match) {
      navigate(AHPActiveCaseDetailsLayer.Chat);
    }
  }, [match]);

  const pageLayouts: PageLayoutProps[] = [
    {
      path: chatRoute.pathname,
      title: 'Chat',
      icon: <></>,
      id: 'ROOT'
    },
    {
      path: applicationRoute.pathname,
      title: 'Application',
      icon: <></>,
      id: AHPActiveCaseDetailsLayer.Application,
      parent: 'ROOT'
    },
    {
      path: filesRoute.pathname,
      title: 'Files',
      icon: <></>,
      id: 'files',
      parent: 'ROOT'
    },
    {
      path: transactionsRoute.pathname,
      title: 'Transactions',
      icon: <></>,
      id: AHPActiveCaseDetailsLayer.Transactions,
      parent: 'ROOT'
    }
  ];

  return (
    <Routes>
      <Route path="" element={<ActiveCaseDetailsPageLayout pageLayouts={pageLayouts} />}>
        <Route path="chat" element={<ActiveCaseChatPage />} />
        <Route path="application" element={<>Application for case id {params[AHPObjectIDRouteLayer.CaseId]}</>} />
        <Route path="files" element={<>Files for case id {params[AHPObjectIDRouteLayer.CaseId]}</>} />
        <Route path="transactions" element={<>Transactions for case id {params[AHPObjectIDRouteLayer.CaseId]}</>} />
      </Route>
    </Routes>
  );
};
