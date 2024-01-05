import React from 'react';
import { Routes, Route, Link, useLocation, matchRoutes } from 'react-router-dom';
import { PageHeader, } from '@ant-design/pro-layout';
import { Col, Menu, Row, Layout, Typography, theme } from 'antd';
import { BookOutlined, SettingOutlined, SafetyOutlined, ProfileOutlined } from '@ant-design/icons';

import { SettingsGeneral } from './settings-general';
import { SettingsRoles } from './settings-roles';
import { SubPageLayout } from '../sub-page-layout';

const { Header, Content } = Layout;
const {
  Title,
}=Typography
export const Settings: React.FC<any> = (props) => {
  const {
    token:{
      colorTextBase,
      colorBgContainer
    }
  }=theme.useToken()
  const location = useLocation();

  const pages = [
    {id:1, path:'community/:communityId/admin/settings/', title:'General', icon:<BookOutlined />},
    {id:2, path:'community/:communityId/admin/settings/saml', title:'Saml', icon:<SettingOutlined />},
  ]

  var matchedPages = matchRoutes(pages,location)
  const matchedIds = matchedPages ? matchedPages.map((x:any) => x.route.id.toString()) : [];

  return (
    <SubPageLayout
      fixedHeader={false}
      header={
        <PageHeader
          title={
            <span style={{
              color: colorTextBase
            }}>Account Settings</span>
          }
        />}
      >
        <Row style={{
          color:colorTextBase
        }}>
          <Col span={6}>
          <Menu mode="inline" selectedKeys={matchedIds}>
            <Menu.Item key="1" icon={<ProfileOutlined />}>
              <Link to="">General</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<SafetyOutlined />}>
              <Link to="saml">SAML</Link>
            </Menu.Item>
          </Menu>
          </Col>
          <Col span={18} style={{paddingLeft:'24px'}}>
            <Routes>
              <Route path="" element={<SettingsGeneral />} />
              <Route path="/Saml" element={<SettingsRoles />} />
            </Routes>
          </Col>
        </Row>
    </SubPageLayout>
  )
}