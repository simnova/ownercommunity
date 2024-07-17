import { FC, Key, useEffect, useState } from 'react';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import { PageLayoutProps } from '../../../admin';
import { SelectableList, SelectableListDataType } from '../../components/selectable-list';
import { RequestListPageLayout } from './request-list-page-layout';

const DummyActiveRequests: SelectableListDataType[] = [
  {
    key: 1,
    requestInitial: 'NO',
    title: `Notary Case`,
    timestamp: '2021-09-01T00:00:00Z',
    progress: 'Revision Requested'
  },
  {
    key: 2,
    requestInitial: 'ID',
    title: `Identity Verification`,
    timestamp: '2021-09-01T00:00:00Z',
    progress: 'Revision Submitted'
  }
];

const DummyArchivedRequests: SelectableListDataType[] = [
  {
    key: 1,
    requestInitial: 'NO',
    title: `Notary Case`,
    timestamp: '2021-09-01T00:00:00Z',
    progress: 'Decision Rendered'
  },
  {
    key: 2,
    requestInitial: 'ID',
    title: `Identity Verification`,
    timestamp: '2021-09-01T00:00:00Z',
    progress: 'Decision Rendered'
  }
];

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
  const [selectedActiveRequest, setSelectedActiveRequest] = useState<SelectableListDataType | undefined>();
  const [selectedArchivedRequest, setSelectedArchivedRequest] = useState<SelectableListDataType | undefined>();
  const selectedActiveRequestRouteMatch = useMatch('/ahp-proof-of-concepts/requests/active/:requestId/*');
  const selectedArchivedRequestRouteMatch = useMatch('/ahp-proof-of-concepts/requests/archived/:requestId');

  const rootRoute = useMatch('/ahp-proof-of-concepts/requests');

  // redirect to (default) active requests if root route is accessed
  useEffect(() => {
    if (rootRoute) {
      navigate('/ahp-proof-of-concepts/requests/active');
    }
  }, [rootRoute])

  // set selected request based on request type and request id
  useEffect(() => {
    setSelectedActiveRequest(undefined);
    setSelectedArchivedRequest(undefined);
    if (selectedActiveRequestRouteMatch) {
      setSelectedActiveRequest(
        DummyActiveRequests.find((r) => r.key.toString() === selectedActiveRequestRouteMatch.params['requestId'])
      );
      navigate(selectedActiveRequestRouteMatch.pathname);
    }
    if (selectedArchivedRequestRouteMatch) {
      setSelectedArchivedRequest(
        DummyArchivedRequests.find((r) => r.key.toString() === selectedArchivedRequestRouteMatch.params['requestId'])
      );
      navigate(selectedArchivedRequestRouteMatch.pathname);
    }
  }, [selectedActiveRequestRouteMatch, selectedArchivedRequestRouteMatch]);

  const onAnActiveRequestSelected = (selectedRowKey: Key) => {
    setSelectedActiveRequest(DummyActiveRequests.find((r) => r.key === selectedRowKey));
    navigate(`/ahp-proof-of-concepts/requests/active/${selectedRowKey}/chat`);
  };

  const onAnArchivedRequestSelected = (selectedRowKey: Key) => {
    setSelectedArchivedRequest(DummyArchivedRequests.find((r) => r.key === selectedRowKey));
    navigate(`/ahp-proof-of-concepts/requests/archived/${selectedRowKey}`);
  };

  return (
    <Routes>
      <Route path="" element={<RequestListPageLayout pageLayouts={pageLayouts} />}>
        <Route
          path="active/*"
          element={
            <SelectableList
              data={DummyActiveRequests}
              selectedRecord={selectedActiveRequest}
              onSelectChange={onAnActiveRequestSelected}
            />
          }
        />
        <Route
          path="archived/*"
          element={
            <SelectableList
              data={DummyArchivedRequests}
              selectedRecord={selectedArchivedRequest}
              onSelectChange={onAnArchivedRequestSelected}
            />
          }
        />
      </Route>
    </Routes>
  );
};
