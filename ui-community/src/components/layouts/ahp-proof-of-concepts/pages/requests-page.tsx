import { Button, Divider, Layout, Tabs } from 'antd';
import { FC, useState } from 'react';
import { SelectableListDataType, SelectableList } from '../components/selectable-list';

const { Header, Content, Footer, Sider } = Layout;

const RequestType = {
  ACTIVE: 'Active',
  ARCHIVED: 'Archived'
};

const ActiveRequestTabName = {
  CHAT: 'Chat',
  APPLICATION: 'Application',
  FILES: 'Files',
  TRANSACTIONS: 'Transactions'
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

interface AHPRequestsPageProps {}
export const AHPRequestsPage: FC<AHPRequestsPageProps> = (props) => {
  const [requestType, setRequestType] = useState(RequestType.ACTIVE);
  const onRequestTypeChanged = (key: string) => {
    setRequestType(key);
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
        <Tabs tabBarStyle={{ paddingLeft: '20px', marginBottom: '0' }} type="card" onChange={onRequestTypeChanged}>
          <Tabs.TabPane key={RequestType.ACTIVE} tab={RequestType.ACTIVE}>
            <SelectableList showSelectionColumn={false} selectionType="single" data={DummyActiveRequests} />
          </Tabs.TabPane>
          <Tabs.TabPane key={RequestType.ARCHIVED} tab={RequestType.ARCHIVED}></Tabs.TabPane>
        </Tabs>
      </Sider>
      {/* request details area */}
      <Content style={{background:"white", padding:"10px"}}>
        {requestType === RequestType.ACTIVE ? (
          <Tabs type="card">
            <Tabs.TabPane key={ActiveRequestTabName.CHAT} tab={ActiveRequestTabName.CHAT}>
              CHAT HISTORY
            </Tabs.TabPane>
            <Tabs.TabPane key={ActiveRequestTabName.APPLICATION} tab={ActiveRequestTabName.APPLICATION}>
              APPLICATION
            </Tabs.TabPane>
            <Tabs.TabPane key={ActiveRequestTabName.FILES} tab={ActiveRequestTabName.FILES}>
              FILES
            </Tabs.TabPane>
            <Tabs.TabPane key={ActiveRequestTabName.TRANSACTIONS} tab={ActiveRequestTabName.TRANSACTIONS}>
              TRANSACTIONS
            </Tabs.TabPane>
          </Tabs>
        ) : (
          <>Archived requests</>
        )}
      </Content>
    </Layout>
  );
};
