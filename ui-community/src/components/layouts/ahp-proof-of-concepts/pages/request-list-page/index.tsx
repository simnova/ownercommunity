import { FC, useEffect } from 'react';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import { PageLayoutProps } from '../../../admin';
import { ActiveRequestListContainer } from './components/active-request-list.container';
import { ArchivedRequestListContainer } from './components/archived-request-list.container';
import { RequestListPageLayout } from './request-list-page-layout';

const pageLayouts: PageLayoutProps[] = [
  { path: '/ahp-proof-of-concepts/requests/active/*', title: 'Active', icon: <></>, id: 'ROOT' },
  {
    path: '/ahp-proof-of-concepts/requests/archived/*',
    title: 'Archived',
    icon: <></>,
    id: '1',
    parent: 'ROOT'
  }
];

interface RequestListPageProps {}

export const RequestListPage: FC<RequestListPageProps> = (_props) => {
  const navigate = useNavigate();

  const rootRoute = useMatch('/ahp-proof-of-concepts/requests');
  // redirect to (default) active requests if root route is accessed
  useEffect(() => {
    if (rootRoute) {
      navigate('/ahp-proof-of-concepts/requests/active');
    }
  }, [rootRoute]);

  return (
    <Routes>
      <Route path="" element={<RequestListPageLayout pageLayouts={pageLayouts} />}>
        <Route path="active/*" element={<ActiveRequestListContainer />} />
        <Route path="archived/*" element={<ArchivedRequestListContainer />} />
      </Route>
    </Routes>
  );
};
