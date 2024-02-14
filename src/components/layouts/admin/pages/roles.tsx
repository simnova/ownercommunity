import { Route, Routes } from 'react-router-dom';
import { RolesDelete } from './roles-delete';
import { RolesDetail } from './roles-detail';
import { RolesList } from './roles-list';

export const Roles: React.FC<any> = () => {
  return (
    <Routes>
      <Route path="" element={<RolesList />}  />
      <Route path="/:id" element={<RolesDetail />} />
      <Route path="/:id/delete" element={<RolesDelete />} />
    </Routes>
  )
}