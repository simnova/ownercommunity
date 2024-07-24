import { FC, useEffect } from 'react';
import { Route, Routes, useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { AHPObjectRouteLayer, AHPRootRouteLayer } from '../..';
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

  const activeRoutes = useResolvedPath(AHPObjectStatusRouteLayer.Active + '/*');
  const archivedRoutes = useResolvedPath(AHPObjectStatusRouteLayer.Archived + '/*');

  const rootRoute = useMatch(`/${AHPRootRouteLayer}/${AHPObjectRouteLayer.Cases}`);

  // redirect to (default) active cases if cases route is accessed
  useEffect(() => {
    if (rootRoute) {
      navigate(AHPObjectStatusRouteLayer.Active);
    }
  }, [rootRoute]);

  const pageLayouts: PageLayoutProps[] = [
    {
      path: activeRoutes.pathname,
      title: 'Active',
      icon: <></>,
      id: 'ROOT'
    },
    {
      path: archivedRoutes.pathname,
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
