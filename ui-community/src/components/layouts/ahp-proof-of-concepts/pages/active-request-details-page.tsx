import { Tabs } from 'antd';
import { FC } from 'react';

const ActiveRequestTabName = {
  CHAT: 'Chat',
  APPLICATION: 'Application',
  FILES: 'Files',
  TRANSACTIONS: 'Transactions'
};

interface ActiveRequestDetailsPageProps {}
export const ActiveRequestDetailsPage: FC<ActiveRequestDetailsPageProps> = (props) => {
  return (
    <>
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
    </>
  );
};
