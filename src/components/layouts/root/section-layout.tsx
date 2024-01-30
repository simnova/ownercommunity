import { arePageLayoutsLoaded, usePageLayouts } from '../../editor/local-data';
import CmsPage from './cms-page';
import { Header } from './components/header';

export const SectionLayout: React.FC<any> = () => {
  const [pageLayouts] = usePageLayouts();

  if(!arePageLayoutsLoaded(pageLayouts)) {
    return <div>Site not found</div>
  }

  return (
    <div>
      <Header />
      <CmsPage />
    </div>
  );
};