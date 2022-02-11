import React from "react";
import {Link, matchRoutes,useLocation} from "react-router-dom"
import {usePageLayouts} from "./editor/local-data";
import { Editor, Frame, useEditor } from '@craftjs/core';
import { TextThing } from "./editor/text-thing";


import { TextComponent } from "./text-component";
import { CountryInfo } from "./country-info";
import { CountryInfo2 } from "./country-info2";
import { Container } from "./editor/container";
import { Breadcrumbs } from "./editor/components/breadcrumbs";
import {MenuComponent} from "./editor/components/menu-component";

import { CmsPageFrame } from "./editor/cms-page-frame";


const CmsPage: React.FC = (props) => {
  const [pageLayouts, setPageLayouts] = usePageLayouts();
  const location = useLocation();
  console.log(pageLayouts);
  const matchedLayout:any = matchRoutes(pageLayouts,location);

  var pageLayout
    return <>
    {(matchedLayout && matchedLayout.length > 0) ? 
      <Editor resolver={{TextComponent, TextThing, CountryInfo, CountryInfo2, Container,Breadcrumbs,MenuComponent}} >
        <CmsPageFrame layout={matchedLayout[0].route.layout} />
      </Editor>
    : 'none'}:

    </>
}
export default CmsPage;
