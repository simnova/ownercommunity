import { Route, Routes, useNavigate } from "react-router-dom"
import PageEditor from "../../../page-editor"
import { PageTree } from "../../../page-tree"
import { PageHeader, Tabs, Button, Statistic, Descriptions, Layout } from 'antd';
import { SubPageLayout } from "../sub-page-layout";

const { TabPane } = Tabs;
const { Header, Content,Footer } = Layout;


export const SiteEditor: React.FC<any> = (props) => {
  const overFlow =  props.fixedHeader ? 'scroll' : 'unset';
  const navigate = useNavigate();

  const handleTabChange = (key: string) => {
    console.log(key)
    navigate(`./${key}`)
  }

  return (

<SubPageLayout
        fixedHeader={true}
        header={
        
          <PageHeader
              className="site-page-header-responsive"
              title="Site Editor"
              subTitle="Edit your site"
              extra={[
                <Button key="3">Operation</Button>,
                <Button key="2">Operation</Button>,
                <Button key="1" type="primary">
                  Primary
                </Button>,
              ]}
              footer={
                <Tabs defaultActiveKey="pageTree" onChange={handleTabChange}>
                  <TabPane tab="Pages" key="pageTree" />
                  <TabPane tab="Editor" key="pageEditor" />
                </Tabs>
              }
            >
            

        </PageHeader>
        
        }
      >
        
        <Routes>
          <Route path="pageEditor" element={<PageEditor />} />
          <Route path="*" element={<PageTree />} />
        </Routes>


      </SubPageLayout>




      


  )
}