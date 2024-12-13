import { PageHeader } from '@ant-design/pro-layout';
import { Tabs, theme } from 'antd';

import { Route, RouteObject, Routes, matchRoutes, useLocation, useNavigate, useParams, useResolvedPath } from "react-router-dom";
import { SiteEditorContainer } from "../components/site-editor.container";
import { SubPageLayout } from "../sub-page-layout";
import { SiteEditorFiles } from './site-editor-files';
import { SiteEditorPageEditor } from "./site-editor-page-editor";
import { SiteEditorPageTree as PageTree } from "./site-editor-page-tree";
import { Helmet } from 'react-helmet-async';
import { useMemo } from 'react';

const { TabPane } = Tabs;

export const SiteEditor: React.FC<any> = () => {
  const {
    token: {
      colorTextBase
    }
  }=theme.useToken()
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const pages = [
    {id:'page-tree', path:'page-tree', title:'Pages'},
    {id:'page-editor', path:'page-editor', title:'Editor'},
    {id:'files', path:'files', title:'Files'}
  ]

  const convertedRoutes = useMemo(() => pages.map((x) => {return {id: x.id, path: useResolvedPath(x.path).pathname} as RouteObject}), [pages]);
  const matchedPages = matchRoutes(convertedRoutes, location);
  const selectedPage = (matchedPages ? matchedPages.map((x:any) => x.route.id.toString()) : ['page-tree'])[0];

  return (
    <SubPageLayout
      fixedHeader={true}
      header={    
        <PageHeader
            className="site-page-header-responsive "
            title={
              <span style={{
                color: colorTextBase
              }}>Site Editor</span>
            }
            subTitle={
              <span style={{
                color: colorTextBase
              }}>Edit Your Site</span>
            }         
            footer={
              <Tabs activeKey={selectedPage} onChange={(key:string) => {navigate(`./${key}`) }}>
                {pages.map((x:any) => <TabPane key={x.id} tab={x.title}></TabPane>)}
              </Tabs>
            }
            extra={[
              <SiteEditorContainer data={{communityId:params.communityId ?? ''}} />
            ]}
          >
        </PageHeader>
      }
    >
    <Helmet>
        <title>Site Editor</title>
    </Helmet>        
      <Routes>
        <Route path="page-editor" element={<SiteEditorPageEditor />} />
        <Route path="files" element={<SiteEditorFiles />} />
        <Route path="*" element={<PageTree />} />
      </Routes>
    </SubPageLayout>
  )
}