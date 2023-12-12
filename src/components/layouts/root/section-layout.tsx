import { usePageLayouts } from '../../editor/local-data';
import CmsPage from './cms-page';
import { Header } from './components/header';

export const SectionLayout: React.FC<any> = (_props) => {
  const [pageLayouts] = usePageLayouts();
  return (
    <>
      {pageLayouts[0]['loaded'] !== false ? (
        <div>
          <Header />
          <CmsPage />
        </div>
      ) : (
        <div>Site not found</div>
      )}
    </>
  );
};
