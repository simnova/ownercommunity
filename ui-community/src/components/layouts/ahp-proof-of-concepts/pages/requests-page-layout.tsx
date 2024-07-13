import { Button, Divider, Layout, Tabs } from 'antd';
import { FC, Key, useEffect, useState } from 'react';
import { Outlet, useMatch, useNavigate, useParams } from 'react-router-dom';
import { SelectableListDataType, SelectableList } from '../components/selectable-list';

const { Header, Content, Footer, Sider } = Layout;
const RequestType = {
  ACTIVE: { key: 'active', value: 'Active' },
  ARCHIVED: { key: 'archived', value: 'Archived' }
};

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
interface RequestsPageLayoutProps {}
export const RequestsPageLayout: FC<RequestsPageLayoutProps> = (props) => {
  const activeRequestRouteMatch = useMatch('/ahp-proof-of-concepts/requests/active/*');
  const archivedRequestRouteMatch = useMatch('/ahp-proof-of-concepts/requests/archived/*');

  const navigate = useNavigate();
  const [selectedActiveRequest, setSelectedActiveRequest] = useState<SelectableListDataType | undefined>();
  const [selectedArchivedRequest, setSelectedArchivedRequest] = useState<SelectableListDataType | undefined>();

  // set selected request based on request type and request id
  useEffect(() => {
    console.log('activeRequestRouteMatch', activeRequestRouteMatch);
    console.log('archivedRequestRouteMatch', archivedRequestRouteMatch);
    if (activeRequestRouteMatch && activeRequestRouteMatch.params['*']) {
      onActiveRequestSelected(Number(activeRequestRouteMatch.params['*']));
    } else if (archivedRequestRouteMatch && archivedRequestRouteMatch.params['*']) {
      onArchivedRequestSelected(Number(archivedRequestRouteMatch.params['*']));
    }
  }, []);

  const onActiveRequestSelected = (selectedRowKey: Key) => {
    setSelectedActiveRequest(DummyActiveRequests.find((r) => r.key === selectedRowKey));
    navigate(`/ahp-proof-of-concepts/requests/active/${selectedRowKey}`);
  };
  const onArchivedRequestSelected = (selectedRowKey: Key) => {
    setSelectedArchivedRequest(DummyArchivedRequests.find((r) => r.key === selectedRowKey));
    navigate(`/ahp-proof-of-concepts/requests/archived/${selectedRowKey}`);
  };

  const onRequestTypeChange = (requestType: string) => {
    setSelectedActiveRequest(undefined);
    setSelectedArchivedRequest(undefined);
    if (requestType === RequestType.ACTIVE.key) {
      navigate('/ahp-proof-of-concepts/requests/active');
    } else if (requestType === RequestType.ARCHIVED.key) {
      navigate('/ahp-proof-of-concepts/requests/archived');
    }
  };
  return (
    <Layout style={{ minHeight: '100%' }} hasSider>
      {/* make new requests and request list area */}
      <Sider
        width={300}
        style={{ borderRight: '1px solid black', borderBottom: '1px solid black', textAlign: 'center' }}
        theme="light"
      >
        <Button type="primary" style={{ margin: '20px 0 5px' }}>
          New Request
        </Button>
        <Divider style={{ margin: '15px 0 10px 0' }} />
        <Tabs
          tabBarStyle={{ paddingLeft: '20px', marginBottom: '0' }}
          type="card"
          onChange={onRequestTypeChange}
          defaultActiveKey={activeRequestRouteMatch ? RequestType.ACTIVE.key : RequestType.ARCHIVED.key}
        >
          <Tabs.TabPane key={RequestType.ACTIVE.key} tab={RequestType.ACTIVE.value}>
            <SelectableList
              data={DummyActiveRequests}
              selectedRecord={selectedActiveRequest}
              onSelectChange={onActiveRequestSelected}
            />
          </Tabs.TabPane>
          <Tabs.TabPane key={RequestType.ARCHIVED.key} tab={RequestType.ARCHIVED.value}>
            <SelectableList
              data={DummyArchivedRequests}
              selectedRecord={selectedArchivedRequest}
              onSelectChange={onArchivedRequestSelected}
            />
          </Tabs.TabPane>
        </Tabs>
      </Sider>
      {/* request details area */}
      <Content style={{ background: 'white', padding: '10px' }}>
        <Outlet />
      </Content>
    </Layout>
  );
};
