import { Tabs } from 'antd';
import { FC, Key, useEffect, useState } from 'react';
import { SelectableList, SelectableListDataType } from '../components/selectable-list';
import { useNavigate, useParams } from 'react-router-dom';

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
interface RequestTypePageProps {}
export const RequestTypePage: FC<RequestTypePageProps> = (props) => {
  const params = useParams<{ requestType: string; requestId: string }>();

  const navigate = useNavigate();
  const [selectedActiveRequest, setSelectedActiveRequest] = useState<SelectableListDataType | undefined>();
  const [selectedArchivedRequest, setSelectedArchivedRequest] = useState<SelectableListDataType | undefined>();

  // set selected request based on request type and request id
  useEffect(() => {
    console.log(params);
    if (params.requestType?.toLowerCase() === RequestType.ACTIVE.key.toLowerCase()) {
      onActiveRequestSelected(Number(params.requestId));
    } else if (params.requestType?.toLowerCase() === RequestType.ARCHIVED.key.toLowerCase()) {
      setSelectedArchivedRequest(DummyArchivedRequests.find((r) => r.key === Number(params.requestId)));
    }
  }, []);

  const onActiveRequestSelected = (selectedRowKey: Key) => {
    setSelectedActiveRequest(DummyActiveRequests.find((r) => r.key === selectedRowKey));
    navigate(`/ahp-proof-of-concepts/requests/active/${selectedRowKey}`);
  };
  const onArchivedRequestSelected = (selectedRowKey: Key) => {
    setSelectedArchivedRequest(DummyActiveRequests.find((r) => r.key === selectedRowKey));
    navigate(`/ahp-proof-of-concepts/requests/archived/${selectedRowKey}`);
  };

  const onRequestTypeChange = (requestType: string) => {
    if (requestType === RequestType.ACTIVE.key) {
      navigate('/ahp-proof-of-concepts/requests/active');
    } else if (requestType === RequestType.ARCHIVED.key) {
      navigate('/ahp-proof-of-concepts/requests/archived');
    }
  };
  return (
    <Tabs
      tabBarStyle={{ paddingLeft: '20px', marginBottom: '0' }}
      type="card"
      onChange={onRequestTypeChange}
      defaultActiveKey={params.requestType}
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
  );
};
