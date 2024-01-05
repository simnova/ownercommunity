import React from 'react';
import { matchRoutes,useLocation } from 'react-router-dom';
import { usePageLayouts } from '../../editor/local-data';
import { Editor, Frame } from '@craftjs/core';

import * as CmsComponents from "../../editor/components/";
import { CmsPageFrame } from "../../editor/cms-page-frame";


const CmsPage: React.FC<any> = () => {
  const [pageLayouts] = usePageLayouts();
  const location = useLocation();
  
  const matchedLayout:any = matchRoutes(pageLayouts,location);
  console.log("Printing now")
  console.log('matchedLayout:',matchedLayout);

  return <>
    {(pageLayouts && matchedLayout && matchedLayout.length > 0) ? 
    <div key={matchedLayout[0].route.id} style={{margin:0, padding:0, backgroundColor:'#E8E8E8', minHeight:'calc(100vh - 50px)'}}>
      <Editor resolver={{...CmsComponents}} enabled={false} >
        <Frame data={matchedLayout[0].route.layout} />
      </Editor>
    </div>
    : 'none'}
    </>
}
export default CmsPage;