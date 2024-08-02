import { Layout } from "antd";
import { Outlet } from 'react-router-dom';

export const SectionLayout: React.FC<any> = () => {
  return (
    <Layout className="site-layout" style={{ minHeight: '100vh' }}>
      <Outlet />
    </Layout>
  )
}