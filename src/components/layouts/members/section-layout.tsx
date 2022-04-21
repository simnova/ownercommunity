import { Outlet } from "react-router-dom";
import { Dropdown, Layout } from "antd";
import { LoggedInUserContainer } from "../../ui/organisms/header/logged-in-user-container";
import { MenuComponent } from "../admin/components/menu-component";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CommunityMenu } from "../admin/components/community-menu";

const { Footer, Sider, Header } = Layout;
export const SectionLayout: React.FC<any> = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout
      className="site-layout"
      style={{ minHeight: "100vh" }}
      id="member-site-layout"
    >
      <Header>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex" }} className="allowBoxShadow">
            <Dropdown overlay={<CommunityMenu />} placement="bottomLeft">
              <a
                className="ant-dropdown-link"
                style={{ minHeight: "50px" }}
                href="#"
              >
                Communities <DownOutlined />
              </a>
            </Dropdown>
          </div>

          <div
            className="text-right bg-black text-sky-400"
            style={{ flexGrow: "1" }}
          >
            <LoggedInUserContainer autoLogin={true} />
          </div>
        </div>
      </Header>
      <Layout hasSider>
        <Sider
          theme="light"
          className="site-layout-background"
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
          style={{
            overflow: "auto",
            height: "calc(100vh - 64px)",
            position: "relative",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="logo" />

          <MenuComponent
            pageLayouts={props.pageLayouts}
            theme="light"
            mode="inline"
          />
        </Sider>

        <Layout
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "1 auto",
            overflowY: "scroll",
            height: "calc(100vh - 64px)",
          }}
        >
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};
