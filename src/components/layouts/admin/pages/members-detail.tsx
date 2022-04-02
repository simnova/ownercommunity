import React from 'react';
import { Routes, Route, Link, useLocation, matchRoutes, useNavigate } from 'react-router-dom';
import { Col, Menu, Row,  Layout, PageHeader } from 'antd';
import { BookOutlined, SettingOutlined, SafetyOutlined, ProfileOutlined } from '@ant-design/icons';

import { MembersGeneral } from './members-general';
import { MembersProfile } from './members-profile';
import { MembersAccounts } from './members-accounts';
import { SubPageLayout } from '../sub-page-layout';

const { Header, Content } = Layout;

export const MembersDetail: React.FC<any> = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const pages = [
    {id:1, path:'community/:communityId/admin/members/:id/', title:'General', icon:<BookOutlined />},
    {id:2, path:'community/:communityId/admin/members/:id/profile', title:'Profile', icon:<SettingOutlined />},
    {id:3, path:'community/:communityId/admin/members/:id/accounts', title:'Accounts', icon:<SettingOutlined />},
  ]

  var matchedPages = matchRoutes(pages,location)
  const matchedIds = matchedPages ? matchedPages.map((x:any) => x.route.id.toString()) : [];

  return (
    <SubPageLayout
      fixedHeader={false}
      header={
        <PageHeader 
          title="Member Detail"
          onBack={() => navigate('../')}
        />}
      >
        <Row>
          <Col span={6}>
          <Menu mode="inline" selectedKeys={matchedIds}>
            <Menu.Item key="1" icon={<ProfileOutlined />}>
              <Link to="">General</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<SafetyOutlined />}>
              <Link to="profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<SafetyOutlined />}>
              <Link to="accounts">Accounts</Link>
            </Menu.Item>
          </Menu>
          </Col>
          <Col span={18} style={{paddingLeft:'24px'}}>
            <Routes>
              <Route path="" element={<MembersGeneral />} />
              <Route path="/profile/*" element={<MembersProfile />} />
              <Route path="/accounts/*" element={<MembersAccounts />} />
            </Routes>
          </Col>
        </Row>
    </SubPageLayout>
  )
}