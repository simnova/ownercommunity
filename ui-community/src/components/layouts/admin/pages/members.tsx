import { Route, Routes } from 'react-router-dom';
import { MembersDetail } from './members-detail';
import { MembersCreate } from './members-create';

import { MembersList } from './members-list';

export const Members: React.FC<any> = () => {
  return (
    <Routes>
      <Route path="" element={<MembersList />} />
      <Route path="/create" element={<MembersCreate />} />
      <Route path="/:id/*" element={<MembersDetail />} />
    </Routes>
  )
}