import { Routes, Route } from 'react-router-dom';
import { SectionLayoutContainer } from './section-layout.container';

export const Staff: React.FC<any> = (_props) => {
  return (
    <Routes>
      <Route path="" element={<SectionLayoutContainer />}>
        <Route path="/" element={<div>This is the staff section</div>} />
      </Route>
    </Routes>
  )
};