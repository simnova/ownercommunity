import { FC, useEffect } from 'react';
import { Route, Routes, useMatch, useNavigate, useParams, useResolvedPath } from 'react-router-dom';
import { AHPObjectIDRouteLayer } from '..';
import { PageLayoutProps } from '../../../../../shared/components/menu-component';
import { ActiveCaseDetailsPageLayout } from './active-case-details-page-layout';
import { AdminChatMessagesContainer } from './active-case/admin/admin-chat-messages.container';

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
  const chatRoutePath = useResolvedPath(AHPActiveCaseDetailsLayer.Chat);
  const applicationRoutePath = useResolvedPath(AHPActiveCaseDetailsLayer.Application);
  const filesRoutePath = useResolvedPath(AHPActiveCaseDetailsLayer.Files);
  const transactionsRoutePath = useResolvedPath(AHPActiveCaseDetailsLayer.Transactions);

  // redirect to (default) Chat if a case is selected
  const rootRoutePath = useResolvedPath('');
  const match = useMatch(rootRoutePath.pathname);
  useEffect(() => {
    if (match) {
      navigate(AHPActiveCaseDetailsLayer.Chat);
    }
  }, [match]);

  const pageLayouts: PageLayoutProps[] = [
    {
      path: chatRoutePath.pathname,
      title: 'Chat',
      icon: <></>,
      id: 'ROOT'
    },
    {
      path: applicationRoutePath.pathname,
      title: 'Application',
      icon: <></>,
      id: AHPActiveCaseDetailsLayer.Application,
      parent: 'ROOT'
    },
    {
      path: filesRoutePath.pathname,
      title: 'Files',
      icon: <></>,
      id: 'files',
      parent: 'ROOT'
    },
    {
      path: transactionsRoutePath.pathname,
      title: 'Transactions',
      icon: <></>,
      id: AHPActiveCaseDetailsLayer.Transactions,
      parent: 'ROOT'
    }
  ];

  return (
    <Routes>
      <Route path="" element={<ActiveCaseDetailsPageLayout pageLayouts={pageLayouts} />}>
        <Route path="chat" element={<AdminChatMessagesContainer />} />
        <Route path="application" element={<>Application for case id {params[AHPObjectIDRouteLayer.CaseId]}</>} />
        <Route path="files" element={<>Files for case id {params[AHPObjectIDRouteLayer.CaseId]}</>} />
        <Route path="transactions" element={<>Transactions for case id {params[AHPObjectIDRouteLayer.CaseId]}</>} />
      </Route>
    </Routes>
  );
};
