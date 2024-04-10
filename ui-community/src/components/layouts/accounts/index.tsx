import { Routes, Route, useParams } from 'react-router-dom';
import { SectionLayout } from './section-layout';
import { Home } from './pages/home';
import { CreateCommunity } from './pages/create-community';
import { BlobToLocalStorage } from '../../shared/blob-to-local-storage';

export const Accounts: React.FC<any> = (_props) => {
  const params = useParams();
  return (
    <BlobToLocalStorage communityId={params.communityId}>
      <Routes>
        <Route path="" element={<SectionLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="create-community" element={<CreateCommunity />} />
        </Route>
      </Routes>
    </BlobToLocalStorage>
  );
};
