import { Route, Routes, useParams } from 'react-router-dom';
import { BlobToLocalStorage } from '../../shared/blob-to-local-storage';
import { SectionLayoutContainer } from './section-layout.container';
import { AdminPage } from './pages/admin-page';
import { Member } from '../../../generated';

export interface PageLayoutProps {
  path: string;
  title: string;
  icon: React.JSX.Element;
  id: string | number;
  parent?: string;
  hasPermissions?: (member: Member) => boolean;
}

export const Admin: React.FC<any> = (_props) => {
  const params = useParams();

  return (
    <BlobToLocalStorage communityId={params.communityId}>
      <Routes>
        <Route path="*" element={<SectionLayoutContainer />}>
          <Route path="*" element={<AdminPage />} />
        </Route>
      </Routes>
    </BlobToLocalStorage>
  );
};
