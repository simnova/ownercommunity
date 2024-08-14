import { FC, useEffect } from 'react';
import { Route, Routes, useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { RequestListPage } from './pages/request-list-page';
import ProSectionLayout from './pro-section-layout';
import { PageLayoutProps } from '../admin';
import { HomeOutlined, SettingOutlined } from '@ant-design/icons';


interface AHPProofOfConceptsProps {}

export const AHPProofOfConcepts: FC<AHPProofOfConceptsProps> = (_props) => {
  
  return (
    <Routes>
      <Route path="" element={<ProSectionLayout />}>
        <Route path={'cases/*'} element={<RequestListPage />} />
        <Route path={'settings/*'} element={<>Settings</>} />
      </Route>
    </Routes>
  );
};
