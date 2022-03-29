import { Routes, Route } from 'react-router-dom';
import { SectionLayout } from './section-layout';
import { Home } from './pages/home';
import { Settings } from './pages/settings';
import { SiteEditor } from './pages/site-editor';
import { Members } from './pages/members';
import { Properties } from './pages/properties';
import { WorkItems } from './pages/work-items';
import { HomeOutlined, ContactsOutlined, LayoutOutlined, SettingOutlined , BarsOutlined, ScheduleOutlined} from '@ant-design/icons';

export const Admin: React.FC<any> = (props) => {

  const pageLayouts = [
    {path : '/community/:communityId/admin', title : 'Home', icon : <HomeOutlined />, id:'ROOT'},
    {path : '/community/:communityId/admin/settings/*', title : 'Settings', icon : <SettingOutlined /> , id:2, parent: 'ROOT'},
    {path : '/community/:communityId/admin/site-editor/*', title : 'Site Editor', icon : <LayoutOutlined /> , id:3, parent: 'ROOT'},
    {path : '/community/:communityId/admin/members/*', title : 'Members', icon : <ContactsOutlined /> , id:4, parent: 'ROOT'},
    {path : '/community/:communityId/admin/properties/*', title : 'Properties', icon : <BarsOutlined /> , id:5, parent: 'ROOT'},
    {path : '/community/:communityId/admin/work-items/*', title : 'Work Items', icon : <ScheduleOutlined /> , id:6, parent: 'ROOT'},
  ]

  return(
    <Routes>
      <Route path="" element={<SectionLayout pageLayouts={pageLayouts} />}>
        <Route path="/" element={<Home />} />
        <Route path="/settings/*" element={<Settings />} />
        <Route path="/site-editor/*" element={<SiteEditor />} />

        <Route path="/members/*" element={<Members />} />
        <Route path="/properties/*" element={<Properties />} />
        <Route path="/work-items/*" element={<WorkItems />} />
      </Route>
    </Routes>
  )
}