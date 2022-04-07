import { Routes, Route, useParams } from 'react-router-dom';
import { SectionLayout } from './section-layout';
import { Home } from './pages/home';
import { Settings } from './pages/settings';
import { SiteEditor } from './pages/site-editor';
import { Roles } from './pages/roles';
import { Members } from './pages/members';
import { Properties } from './pages/properties';
import { ServiceTickets } from './pages/service-tickets';
import { HomeOutlined, ContactsOutlined, SettingOutlined, LayoutOutlined, SafetyOutlined , BarsOutlined, ScheduleOutlined} from '@ant-design/icons';
import useLocalStorageState from 'use-local-storage-state';

export const Admin: React.FC<any> = (props) => {
  const params = useParams();

  const [commmunity, setCommunity] = useLocalStorageState('community', params.communityId)

  const pageLayouts = [
    {path : '/community/:communityId/admin', title : 'Home', icon : <HomeOutlined />, id:'ROOT'},
    {path : '/community/:communityId/admin/settings/*', title : 'Settings', icon : <SettingOutlined /> , id:2, parent: 'ROOT'},
    {path : '/community/:communityId/admin/site-editor/*', title : 'Site Editor', icon : <LayoutOutlined /> , id:3, parent: 'ROOT'},
    {path : '/community/:communityId/admin/roles/*', title : 'Roles', icon : <SafetyOutlined /> , id:4, parent: 'ROOT'},
    {path : '/community/:communityId/admin/members/*', title : 'Members', icon : <ContactsOutlined /> , id:5, parent: 'ROOT'},
    {path : '/community/:communityId/admin/properties/*', title : 'Properties', icon : <BarsOutlined /> , id:6, parent: 'ROOT'},
    {path : '/community/:communityId/admin/service-tickets/*', title : 'Service Tickets', icon : <ScheduleOutlined /> , id:7, parent: 'ROOT'},
  ]

  return(
    <Routes>
      <Route path="" element={<SectionLayout pageLayouts={pageLayouts} />}>
        <Route path="/" element={<Home />} />
        <Route path="/settings/*" element={<Settings />} />
        <Route path="/site-editor/*" element={<SiteEditor />} />
        <Route path="/roles/*" element={<Roles />} />
        <Route path="/members/*" element={<Members />} />
        <Route path="/properties/*" element={<Properties />} />
        <Route path="/service-tickets/*" element={<ServiceTickets />} />
      </Route>
    </Routes>
  )
}