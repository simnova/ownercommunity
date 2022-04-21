import { Routes, Route } from "react-router-dom";
import { SectionLayout } from "./section-layout";
import { Home } from "./pages/home";
import { HomeOutlined, BarsOutlined } from "@ant-design/icons";

const pageLayouts = [
  {
    path: "/community/:communityId/members",
    title: "Home",
    icon: <HomeOutlined />,
    id: "ROOT",
  },
  // {
  //   path: "/community/:communityId/members/properties/*",
  //   title: "Properties",
  //   icon: <BarsOutlined />,
  //   id: 6,
  //   parent: "ROOT",
  // },
];

export const Members: React.FC<any> = (props) => {
  return (
    <Routes>
      <Route path="" element={<SectionLayout pageLayouts={pageLayouts} />}>
        <Route path="/" element={<Home />} />
        {/* <Route path="/properties/*" element={<Properties />} /> */}
      </Route>
    </Routes>
  );
};
