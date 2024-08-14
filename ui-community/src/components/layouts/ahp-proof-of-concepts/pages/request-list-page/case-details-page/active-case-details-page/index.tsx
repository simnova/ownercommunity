import { FC, useEffect } from 'react';
import { Route, Routes, useMatch, useNavigate, useParams, useResolvedPath } from 'react-router-dom';
import { PageLayoutProps } from '../../../../../shared/components/menu-component';
import { ActiveCaseDetailsPageLayout } from './active-case-details-page-layout';

interface ActiveCaseDetailsPageProps {}
export const ActiveCaseDetailsPage: FC<ActiveCaseDetailsPageProps> = (_props) => {
  const navigate = useNavigate();
  const params = useParams();
  const chatRoutePath = useResolvedPath('chat');
  const applicationRoutePath = useResolvedPath('application');
  const filesRoutePath = useResolvedPath('files');
  const transactionsRoutePath = useResolvedPath('transactions');

  // redirect to (default) Chat if a case is selected
  const rootRoutePath = useResolvedPath('');
  const match = useMatch(rootRoutePath.pathname);
  useEffect(() => {
    if (match) {
      navigate('chat');
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
      id: 'application',
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
      id: 'transactions',
      parent: 'ROOT'
    }
  ];

  return (
    <Routes>
      <Route path="" element={<ActiveCaseDetailsPageLayout pageLayouts={pageLayouts} />}>
        <Route path="chat" element={<></>} />
        <Route path="application" element={<>Application for case id {params['caseId']}</>} />
        <Route path="files" element={<>Files for case id {params['caseId']}</>} />
        <Route path="transactions" element={<>Transactions for case id {params['caseId']}</>} />
      </Route>
    </Routes>
  );
};
