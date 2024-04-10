import { Route, Routes } from 'react-router-dom';
import { PropertiesList } from './properties-list';
import { PropertiesDetail } from './properties-detail';

export const Properties: React.FC<any> = (_props) => {
  return (
    <Routes>
      <Route path="" element={<PropertiesList />} />
      <Route path="/:id/*" element={<PropertiesDetail />} />
    </Routes>
  )
}