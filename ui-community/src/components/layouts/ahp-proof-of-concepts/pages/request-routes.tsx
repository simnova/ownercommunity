import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequestTypePage } from './request-type-page';
import { RequestsPageLayout } from './requests-page-layout';

interface RequestRoutesProps {}
export const RequestRoutes: FC<RequestRoutesProps> = (props) => {
  return (
    <Routes>
      <Route path="" element={<RequestsPageLayout />}>
        <Route path="" element={<RequestTypePage />} />
        
        {/* <Route path=":requestType/:requestId" element={<></>} /> */}
      </Route>
    </Routes>
  );
};
