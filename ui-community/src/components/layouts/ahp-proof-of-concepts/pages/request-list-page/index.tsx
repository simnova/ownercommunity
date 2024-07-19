import { FC, useEffect } from 'react';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import { PageLayoutProps } from '../../../admin';
import { ActiveRequestListContainer } from './components/active-request-list.container';
import { ArchivedRequestListContainer } from './components/archived-request-list.container';
import { RequestListPageLayout } from './request-list-page-layout';
import { AHPObjectRouteLayer, AHPRootRouteLayer } from '../..';

export const AHPObjectStatusRouteLayer = {
  Active: 'active',
  Archived: 'archived'
};

interface RequestListPageProps {}

export const RequestListPage: FC<RequestListPageProps> = (_props) => {
  const navigate = useNavigate();

  const rootRoute = useMatch(`/${AHPRootRouteLayer}/${AHPObjectRouteLayer.Cases}`);

  // redirect to (default) active cases if cases route is accessed
  useEffect(() => {
    if (rootRoute) {
      navigate(AHPObjectStatusRouteLayer.Active);
    }
  }, [rootRoute]);

  const pageLayouts: PageLayoutProps[] = [
    {
      path: `/${AHPRootRouteLayer}/${AHPObjectRouteLayer.Cases}/${AHPObjectStatusRouteLayer.Active}/*`,
      title: 'Active',
      icon: <></>,
      id: 'ROOT'
    },
    {
      path: `/${AHPRootRouteLayer}/${AHPObjectRouteLayer.Cases}/${AHPObjectStatusRouteLayer.Archived}/*`,
      title: 'Archived',
      icon: <></>,
      id: '1',
      parent: 'ROOT'
    }
  ];

  return (
    <Routes>
      <Route path="" element={<RequestListPageLayout pageLayouts={pageLayouts} />}>
        <Route path={`${AHPObjectStatusRouteLayer.Active}/*`} element={<ActiveRequestListContainer />} />
        <Route path={`${AHPObjectStatusRouteLayer.Archived}/*`} element={<ArchivedRequestListContainer />} />
      </Route>
    </Routes>
  );
};
