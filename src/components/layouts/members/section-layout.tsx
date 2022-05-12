import { Outlet, useParams, useNavigate } from "react-router-dom";
import { Dropdown, Layout, Space } from "antd";
import { LoggedInUserContainer } from "../../ui/organisms/header/logged-in-user-container";
import { MenuComponent } from "../admin/components/menu-component";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CommunityMenu } from "../members/components/community-menu";
import { LocalSettingsKeys, handleToggler } from "../../../constants";
import { useQuery } from "@apollo/client";
import { MemberSiteCurrentMemberHasAdminRoleDocument } from "../../../generated";

const { Footer, Sider, Header } = Layout;
export const SectionLayout: React.FC<any> = (props) => {

  const sidebarCollapsed = localStorage.getItem(LocalSettingsKeys.SidebarCollapsed);
  const [isExpanded, setIsExpanded] = useState(sidebarCollapsed ? false : true);
  const { communityId } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(MemberSiteCurrentMemberHasAdminRoleDocument, {
    variables: {
      communityId: communityId
    }
  });

  const adminLink = () => {
    if (data && data.memberForCurrentUser && data.memberForCurrentUser.role?.roleName.toLowerCase() === 'admin') {
      return (
        <a
          className="allowBoxShadow"
          onClick={() => navigate(`/community/${communityId}/admin`)}
        >
          View Admin Site
        </a>
      )
    }
  }

  // const handleToggler = () => {
  //   if (isExpanded) {
  //     setIsExpanded(false);
  //     localStorage.setItem(LocalSettingsKeys.SidebarCollapsed, 'true');
  //     return;
  //   }
  //   setIsExpanded(true);
  //   localStorage.removeItem(LocalSettingsKeys.SidebarCollapsed);
  // };

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
          {adminLink()}

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
          collapsed={!isExpanded}
          onCollapse={() => handleToggler(isExpanded, setIsExpanded)}
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
