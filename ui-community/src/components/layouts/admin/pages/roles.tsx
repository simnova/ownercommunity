import { Route, Routes } from 'react-router-dom';
import { RolesDelete } from './roles-delete';
import { RolesDetail } from './roles-detail';
import { RolesList } from './roles-list';
import { Helmet } from 'react-helmet-async';

export const Roles: React.FC<any> = () => {
  return (
    <>
    <Helmet>
        <title>Roles</title>
    </Helmet>
    <Routes>
      <Route path="" element={<RolesList />}  />
      <Route path="/:id" element={<RolesDetail />} />
      <Route path="/:id/delete" element={<RolesDelete />} />
    </Routes>
    </>
  )
}