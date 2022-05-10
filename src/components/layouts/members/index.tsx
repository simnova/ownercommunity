import { Routes, Route } from "react-router-dom";
import { SectionLayout } from "./section-layout";
import { Home } from "./pages/home";
import {
  HomeOutlined,
  DribbbleOutlined,
  ReadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Vocabulary } from "./pages/vocabulary";
import { Neighbors } from "./pages/neighbors";

const pageLayouts = [
  {
    path: "/community/:communityId/members",
    title: "Home",
    icon: <HomeOutlined />,
    id: "ROOT",
  },
  {
    path: "/community/:communityId/members/test1/*",
    title: "Basketball",
    icon: <DribbbleOutlined />,
    id: 2,
    parent: "ROOT",
  },
  {
    path: "/community/:communityId/members/vocabulary/*",
    title: "Vocabulary",
    icon: <ReadOutlined />,
    id: 3,
    parent: "ROOT",
  },
  {
    path: "/community/:communityId/members/neighbors/*",
    title: "Neighbors",
    icon: <UserOutlined />,
    id: 4,
    parent: "ROOT",
  },
];

export const Members: React.FC<any> = (props) => {
  return (
    <Routes>
      <Route path="" element={<SectionLayout pageLayouts={pageLayouts} />}>
        <Route path="/" element={<Home />} />
        <Route path="/test1" element={<Home />} />
        <Route path="/vocabulary/*" element={<Vocabulary />} />
        <Route path="/neighbors/*" element={<Neighbors />} />
      </Route>
    </Routes>
  );
};
