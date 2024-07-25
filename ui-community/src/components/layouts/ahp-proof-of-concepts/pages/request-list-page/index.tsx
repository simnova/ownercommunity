import { FC, useEffect } from 'react';
import { Route, Routes, useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { PageLayoutProps } from '../../../admin';
import { ActiveCaseListContainer } from './components/active-case-list.container';
import { ArchivedCaseListContainer } from './components/archived-case-list.container';
import { CaseListPageLayout } from './request-list-page-layout';

export const AHPObjectStatusRouteLayer = {
  Active: 'active',
  Archived: 'archived'
};

interface RequestListPageProps {}

export const RequestListPage: FC<RequestListPageProps> = (_props) => {
  const navigate = useNavigate();

  const activeRoutePath = useResolvedPath(AHPObjectStatusRouteLayer.Active + '/*');
  const archivedRoutePath = useResolvedPath(AHPObjectStatusRouteLayer.Archived + '/*');

  // redirect to (default) active cases if cases route is accessed
  const rootRoutePath = useResolvedPath('');
  const match = useMatch(rootRoutePath.pathname);
  useEffect(() => {
    if (match) {
      navigate(AHPObjectStatusRouteLayer.Active);
    }
  }, [match]);

  const pageLayouts: PageLayoutProps[] = [
    {
      path: activeRoutePath.pathname,
      title: 'Active',
      icon: <></>,
      id: 'ROOT'
    },
    {
      path: archivedRoutePath.pathname,
      title: 'Archived',
      icon: <></>,
      id: '1',
      parent: 'ROOT'
    }
  ];

  return (
    <Routes>
      <Route path="" element={<CaseListPageLayout pageLayouts={pageLayouts} />}>
        <Route path={`${AHPObjectStatusRouteLayer.Active}/*`} element={<ActiveCaseListContainer />} />
        <Route path={`${AHPObjectStatusRouteLayer.Archived}/*`} element={<ArchivedCaseListContainer />} />
      </Route>
    </Routes>
  );
};
