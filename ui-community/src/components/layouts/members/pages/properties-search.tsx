import { Route, Routes } from 'react-router-dom';
import { PropertiesDetail } from './properties-detail';
import { PropertiesListSearch } from './properties-list-search';

export const PropertiesSearch: React.FC<any> = (_props) => {
  return (
    <Routes>
      <Route path="" element={<PropertiesListSearch />} />
      <Route path="/:id/*" element={<PropertiesDetail />} />
    </Routes>
  );
};
