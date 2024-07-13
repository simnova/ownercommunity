import { Tabs } from 'antd';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

const ActiveRequestTabName = {
  CHAT: 'Chat',
  APPLICATION: 'Application',
  FILES: 'Files',
  TRANSACTIONS: 'Transactions'
};

interface ActiveRequestDetailsPageProps {}
export const ActiveRequestDetailsPage: FC<ActiveRequestDetailsPageProps> = (props) => {
  const params = useParams();
  return (
    <>
      <Tabs type="card">
        <Tabs.TabPane key={ActiveRequestTabName.CHAT} tab={ActiveRequestTabName.CHAT}>
          CHAT HISTORY for request id: {params.requestId}
        </Tabs.TabPane>
        <Tabs.TabPane key={ActiveRequestTabName.APPLICATION} tab={ActiveRequestTabName.APPLICATION}>
          APPLICATION for request id: {params.requestId}
        </Tabs.TabPane>
        <Tabs.TabPane key={ActiveRequestTabName.FILES} tab={ActiveRequestTabName.FILES}>
          FILES for request id: {params.requestId}
        </Tabs.TabPane>
        <Tabs.TabPane key={ActiveRequestTabName.TRANSACTIONS} tab={ActiveRequestTabName.TRANSACTIONS}>
          TRANSACTIONS for request id: {params.requestId}
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};
