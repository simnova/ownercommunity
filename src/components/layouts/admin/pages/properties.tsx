import { Route, Routes } from 'react-router-dom';
import { PropertiesList } from './properties-list';

export const Properties: React.FC<any> = (props) => {
  return (
    <Routes>
      <Route path="" element={<PropertiesList />} />
  
    </Routes>
  )
}