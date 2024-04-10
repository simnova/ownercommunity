import { Route, Routes } from 'react-router-dom';
import { CommunityPropertyDetail } from './community-property-detail';
import { CommunityPropertyListings } from './community-property-listings';

export const CommunityProperty: React.FC<any> = (_props) => {
  return (
    <Routes>
      <Route path="" element={<CommunityPropertyListings />} />
      <Route path="/:propertyId/*" element={<CommunityPropertyDetail />} />
    </Routes>
  );
};
