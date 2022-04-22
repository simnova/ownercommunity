import React from "react";
import { usePageLayouts } from "../../editor/local-data";
import CmsPage from "./cms-page";
import { Header } from "./components/header";

export const Root: React.FC<any> = (_props) => {
  const [pageLayouts, setPageLayouts] = usePageLayouts();
  return (<>
    {pageLayouts[0]['loaded'] !== false? 
      <div>
        <Header />
        <CmsPage/>
      </div>
      :
      <div>Site not found</div>
    }
  </>)
}