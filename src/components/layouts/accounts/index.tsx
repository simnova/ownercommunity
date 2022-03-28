import { Routes, Route } from 'react-router-dom';
import { SectionLayout } from './section-layout';
import { Home } from './pages/home';
import { CreateCommunity } from './pages/create-community';

export const Accounts: React.FC<any> = (props) => {
  return(
    <Routes>
      <Route path="" element={<SectionLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="create-community" element={<CreateCommunity />} />
      </Route>
    </Routes>
  )
}