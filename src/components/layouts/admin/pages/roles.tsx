import { Route, Routes } from 'react-router-dom';
import { RolesDetail } from './roles-detail';
import { RolesList } from './roles-list';

export const Roles: React.FC<any> = (props) => {
  return (
    <Routes>
      <Route path="" element={<RolesList />} />
      <Route path="/:id" element={<RolesDetail />} />
    </Routes>
  )
}