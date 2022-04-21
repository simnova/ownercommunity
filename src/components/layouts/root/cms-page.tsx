import React from "react";
import {Link, matchRoutes,useLocation} from "react-router-dom"
import {usePageLayouts} from "../../editor/local-data";
import { Editor, Frame, useEditor } from '@craftjs/core';
import { TextThing } from "../../editor/components/text-thing";


import { TextComponent } from "../../editor/components/text-component";
import { CountryInfo } from "../../editor/components/country-info";
import { CountryInfo2 } from "../../editor/components/country-info2";
import { Container } from "../../editor/page/container";
import { Breadcrumbs } from "../../editor/components/breadcrumbs";
import {MenuComponent} from "../../editor/components/menu-component";

import { CmsPageFrame } from "../../editor/cms-page-frame";


const CmsPage: React.FC = (props) => {
  const [pageLayouts, setPageLayouts] = usePageLayouts();
  const location = useLocation();
  
  const matchedLayout:any = matchRoutes(pageLayouts,location);
  console.log(matchedLayout);

  var pageLayout
    return <>
    {(pageLayouts && matchedLayout && matchedLayout.length > 0) ? 
    <div key={matchedLayout[0].route.id} style={{margin:0, padding:0, backgroundColor:'#E8E8E8', minHeight:'calc(100vh - 50px)'}}>
      <Editor resolver={{TextComponent, TextThing, CountryInfo, CountryInfo2, Container,Breadcrumbs,MenuComponent}} >
        <CmsPageFrame layout={matchedLayout[0].route.layout} />
      </Editor>
    </div>
    : 'none'}
    </>
}
export default CmsPage;
