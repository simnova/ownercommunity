import { Route, Routes } from 'react-router-dom';
import { MembersDetail } from './members-detail';
import { MembersList } from './members-list';

export const Members: React.FC<any> = (props) => {
  return (
    <Routes>
      <Route path="" element={<MembersList />} />
      <Route path="/:id" element={<MembersDetail />} />
    </Routes>
  )
}