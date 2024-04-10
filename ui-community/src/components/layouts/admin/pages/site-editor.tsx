import { PageHeader } from '@ant-design/pro-layout';
import { Tabs, theme } from 'antd';

import { Route, Routes, matchRoutes, useLocation, useNavigate, useParams, useResolvedPath } from "react-router-dom";
import { SiteEditorContainer } from "../components/site-editor.container";
import { SubPageLayout } from "../sub-page-layout";
import { SiteEditorFiles } from './site-editor-files';
import SiteEditorPageEditor from "./site-editor-page-editor";
import { PageTree } from "./site-editor-page-tree";

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
    {id:'page-tree', path:useResolvedPath('page-tree').pathname, title:'Pages'},
    {id:'page-editor', path:useResolvedPath('page-editor').pathname, title:'Editor'},
    {id:'files', path:useResolvedPath('files').pathname, title:'Files'}
  ]

  const matchedPages = matchRoutes(pages, location);
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
      <Routes>
        <Route path="page-editor" element={<SiteEditorPageEditor />} />
        <Route path="files" element={<SiteEditorFiles />} />
        <Route path="*" element={<PageTree />} />
      </Routes>
    </SubPageLayout>
  )
}