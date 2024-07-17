import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { arePageLayoutsLoaded, usePageLayouts } from '../../editor/page-layout';
import CmsPage from './cms-page';
import { Header } from './components/header';
import { useCallback } from 'react';
import { AHPRootRouteLayer } from '../ahp-proof-of-concepts';

export const SectionLayout: React.FC<any> = () => {
  const [pageLayouts] = usePageLayouts();
  const navigate = useNavigate();

  if (!arePageLayoutsLoaded(pageLayouts)) {
    return <div>Site not found</div>;
  }

  const navigateToAhpProofOfConcept = useCallback(() => {  
    navigate(`/${AHPRootRouteLayer}`);  
  }, []); 

  return (
    <div>
      <Header />
      <Button type="primary" onClick={navigateToAhpProofOfConcept}>
        AHP Layout proof of concept
      </Button>
      <CmsPage />
    </div>
  );
};
