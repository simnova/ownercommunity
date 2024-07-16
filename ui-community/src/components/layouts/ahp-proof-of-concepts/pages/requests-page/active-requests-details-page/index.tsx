import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ActiveRequestDetailsPageLayout } from './active-request-details-page-layout';
import { PageLayoutProps } from '../../..';

const pageLayouts: PageLayoutProps[] = [
  { path: '/ahp-proof-of-concepts/requests/active/:requestId/chat', title: 'Chat', icon: <></>, id: 'ROOT' },
  {
    path: '/ahp-proof-of-concepts/requests/active/:requestId/application',
    title: 'Application',
    icon: <></>,
    id: 'application',
    parent: 'ROOT'
  },
  {
    path: '/ahp-proof-of-concepts/requests/active/:requestId/files',
    title: 'Files',
    icon: <></>,
    id: 'files',
    parent: 'ROOT'
  },
  {
    path: '/ahp-proof-of-concepts/requests/active/:requestId/transactions',
    title: 'Transactions',
    icon: <></>,
    id: 'transactions',
    parent: 'ROOT'
  }
];

interface ActiveRequestDetailsPageProps {}
export const ActiveRequestDetailsPage: FC<ActiveRequestDetailsPageProps> = (_props) => {
  return (
    <Routes>
      <Route path="" element={<ActiveRequestDetailsPageLayout pageLayouts={pageLayouts} />}>
        <Route path="chat" element={<>Chat</>} />
        <Route path="application" element={<>Application</>} />
        <Route path="files" element={<>Files</>} />
        <Route path="transactions" element={<>Transactions</>} />
      </Route>
    </Routes>
  );
};
