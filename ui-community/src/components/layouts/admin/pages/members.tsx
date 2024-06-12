import { Route, Routes } from 'react-router-dom';
import { MembersDetail } from './members-detail';
import { MembersCreate } from './members-create';

import { MembersList } from './members-list';
import { Helmet } from 'react-helmet-async';

export const Members: React.FC<any> = () => {
  return (
  <>
    <Helmet>
        <title>Members</title>
    </Helmet>
    <Routes>
      <Route path="" element={<MembersList />} />
      <Route path="/create" element={<MembersCreate />} />
      <Route path="/:id/*" element={<MembersDetail />} />
    </Routes>
  </>
  )
}