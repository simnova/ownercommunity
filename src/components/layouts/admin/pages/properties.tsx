import { Route, Routes } from 'react-router-dom';
import { PropertiesList } from './properties-list';
import { PropertiesAdd } from './properties-add';
import { PropertiesDetail } from './properties-detail';

export const Properties: React.FC<any> = () => {
  return (
    <Routes>
      <Route path="" element={<PropertiesList />} />
      <Route path="/new" element={<PropertiesAdd />} />
      <Route path="/:id/*" element={<PropertiesDetail />} />
    </Routes>
  )
}