import { Routes, Route } from 'react-router-dom';
import { SectionLayout } from './section-layout';

export const Staff: React.FC<any> = (_props) => {
  return (
    <Routes>
      <Route path="" element={<SectionLayout />}>
        <Route path="/" element={<div>This is the staff section</div>} />
      </Route>
    </Routes>
  )
};