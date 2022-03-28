import { Routes, Route } from 'react-router-dom';
import { SectionLayout } from './section-layout';
import { Home } from './pages/home';

export const Members: React.FC<any> = (props) => {
  return(
    <Routes>
      <Route path="" element={<SectionLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  )
}