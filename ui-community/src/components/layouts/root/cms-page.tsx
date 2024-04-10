import { Editor, Frame } from '@craftjs/core';
import { matchRoutes, useLocation } from 'react-router-dom';
import * as CmsComponents from "../../editor/components/";
import { arePageLayoutsLoaded, usePageLayouts } from '../../editor/page-layout';

const CmsPage: React.FC<any> = () => {
  const [pageLayouts] = usePageLayouts();
  const location = useLocation();
  
  if(!arePageLayoutsLoaded(pageLayouts)) {
    return <>none</>
  }

  const matchedLayout:any = matchRoutes(pageLayouts,location);
  console.log('matchedLayout:',matchedLayout);

  if(!matchedLayout || matchedLayout.length === 0) {
    return <>none</>
  }

  return (
    <div key={matchedLayout[0].route.id} style={{margin:0, padding:0, backgroundColor:'#E8E8E8', minHeight:'calc(100vh - 50px)'}}>
      <Editor resolver={{...CmsComponents}} enabled={false} >
        <Frame data={matchedLayout[0].route.layout} />
      </Editor>
    </div>
  );
}

export default CmsPage;