import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

export const SectionLayout: React.FC<any> = (props) => {
  return(
    <Layout>
      <Header>Header</Header>
      <Layout hasSider={true}>
      </Layout>
      <Layout  style={{display:'flex',flexDirection:'column',flex:'1 auto', overflowY:'scroll', height:'calc(100vh - 64px)'}}>
         <h1>Accounts</h1>
        <Outlet/>
      </Layout>
    </Layout>
  )
}