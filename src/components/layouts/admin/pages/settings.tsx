import { BookOutlined, ProfileOutlined, SafetyOutlined, SettingOutlined } from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-layout';
import { Col, Menu, Row, theme } from 'antd';

import { Link, Route, Routes, matchRoutes, useLocation } from 'react-router-dom';

import { SubPageLayout } from '../sub-page-layout';
import { SettingsGeneral } from './settings-general';
import { SettingsRoles } from './settings-roles';

export const Settings: React.FC<any> = () => {
  const {
    token: { colorTextBase }
  } = theme.useToken();
  const location = useLocation();

  const pages = [
    { id: "1", path: 'community/:communityId/admin/settings/', title: 'General', icon: <BookOutlined /> },
    { id: "2", path: 'community/:communityId/admin/settings/saml', title: 'Saml', icon: <SettingOutlined /> }
  ];

  const matchedPages = matchRoutes(pages, location);
  const matchedIds = matchedPages ? matchedPages.map((x: any) => x.route.id.toString()) : [];

  return (
    <SubPageLayout
      fixedHeader={false}
      header={
        <PageHeader
          title={
            <span
              style={{
                color: colorTextBase
              }}
            >
              Account Settings
            </span>
          }
        />
      }
    >
      <Row
        style={{
          color: colorTextBase
        }}
      >
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
        <Col span={18} style={{ paddingLeft: '24px' }}>
          <Routes>
            <Route path="" element={<SettingsGeneral />} />
            <Route path="/Saml" element={<SettingsRoles />} />
          </Routes>
        </Col>
      </Row>
    </SubPageLayout>
  );
};
