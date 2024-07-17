import { FC, useEffect } from 'react';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import { PageLayoutProps } from '../../../admin';
import { ActiveRequestListContainer } from './components/active-request-list.container';
import { ArchivedRequestListContainer } from './components/archived-request-list.container';
import { RequestListPageLayout } from './request-list-page-layout';
import { AHPFirstRouteLayer, AHPRootRouteLayer } from '../..';

export const AHPSecondRouteLayer = {
  Active: 'active',
  Archived: 'archived'
};

interface RequestListPageProps {}

export const RequestListPage: FC<RequestListPageProps> = (_props) => {
  const navigate = useNavigate();

  const rootRoute = useMatch(`/${AHPRootRouteLayer}/${AHPFirstRouteLayer.Cases}`);

  // redirect to (default) active cases if cases route is accessed
  useEffect(() => {
    if (rootRoute) {
      navigate('active');
    }
  }, [rootRoute]);

  const pageLayouts: PageLayoutProps[] = [
    {
      path: `/${AHPRootRouteLayer}/${AHPFirstRouteLayer.Cases}/${AHPSecondRouteLayer.Active}/*`,
      title: 'Active',
      icon: <></>,
      id: 'ROOT'
    },
    {
      path: `/${AHPRootRouteLayer}/${AHPFirstRouteLayer.Cases}/${AHPSecondRouteLayer.Archived}/*`,
      title: 'Archived',
      icon: <></>,
      id: '1',
      parent: 'ROOT'
    }
  ];

  return (
    <Routes>
      <Route path="" element={<RequestListPageLayout pageLayouts={pageLayouts} />}>
        <Route path="active/*" element={<ActiveRequestListContainer />} />
        <Route path="archived/*" element={<ArchivedRequestListContainer />} />
      </Route>
    </Routes>
  );
};
