import { Button, Divider, Layout, Tabs } from 'antd';
import { FC, Key, useEffect, useState } from 'react';
import { SelectableListDataType, SelectableList } from '../components/selectable-list';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;



interface RequestsPageLayoutProps {}
export const RequestsPageLayout: FC<RequestsPageLayoutProps> = (props) => {
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
        {/* <Tabs tabBarStyle={{ paddingLeft: '20px', marginBottom: '0' }} type="card" onChange={onRequestTypeChange} defaultActiveKey={params.requestType}>
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
        </Tabs> */}
        <Outlet />
      </Sider>
      {/* request details area */}
      <Content style={{ background: 'white', padding: '10px' }}>
        {/* <Outlet /> */}
        {/* {requestType === RequestType.ACTIVE && selectedActiveRequest && (
          <Tabs type="card">
            <Tabs.TabPane key={ActiveRequestTabName.CHAT} tab={ActiveRequestTabName.CHAT}>
              CHAT HISTORY for {selectedActiveRequest?.title}
            </Tabs.TabPane>
            <Tabs.TabPane key={ActiveRequestTabName.APPLICATION} tab={ActiveRequestTabName.APPLICATION}>
              APPLICATION for {selectedActiveRequest?.title}
            </Tabs.TabPane>
            <Tabs.TabPane key={ActiveRequestTabName.FILES} tab={ActiveRequestTabName.FILES}>
              FILES for {selectedActiveRequest?.title}
            </Tabs.TabPane>
            <Tabs.TabPane key={ActiveRequestTabName.TRANSACTIONS} tab={ActiveRequestTabName.TRANSACTIONS}>
              TRANSACTIONS for {selectedActiveRequest?.title}
            </Tabs.TabPane>
          </Tabs>
        )}
        {requestType === RequestType.ARCHIVED && selectedArchivedRequest && (
          <>Archived request for {selectedArchivedRequest?.title}</>
        )} */}
      </Content>
    </Layout>
  );
};
