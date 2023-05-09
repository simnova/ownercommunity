import React from 'react';
import { Route, Routes, useLocation, useNavigate, useParams, useResolvedPath, matchRoutes } from "react-router-dom"
import SiteEditorPageEditor from "./site-editor-page-editor"
import { SiteEditorFiles } from './site-editor-files';
import { PageTree } from "./site-editor-page-tree"
import { PageHeader } from '@ant-design/pro-layout';
import { Tabs } from 'antd';
import { SubPageLayout } from "../sub-page-layout";
import { SiteEditorContainer } from "../components/site-editor.container";

const { TabPane } = Tabs;

export const SiteEditor: React.FC<any> = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const pages = [
    {id:'page-tree', path:useResolvedPath('page-tree').pathname, title:'Pages'},
    {id:'page-editor', path:useResolvedPath('page-editor').pathname, title:'Editor'},
    {id:'files', path:useResolvedPath('files').pathname, title:'Files'}
  ]

  var matchedPages = matchRoutes(pages,location)
  const selectedPage = (matchedPages ? matchedPages.map((x:any) => x.route.id.toString()) : ['page-tree'])[0];

  return (
    <SubPageLayout
      fixedHeader={true}
      header={    
        <PageHeader
            className="site-page-header-responsive"
            title="Site Editor"
            subTitle="Edit your site"          
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
      <Routes>
        <Route path="page-editor" element={<SiteEditorPageEditor />} />
        <Route path="files" element={<SiteEditorFiles />} />
        <Route path="*" element={<PageTree />} />
      </Routes>
    </SubPageLayout>
  )
}