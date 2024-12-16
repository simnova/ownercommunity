import { BookOutlined, SettingOutlined } from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-layout';
import { Col, Grid, Menu, Row, theme } from 'antd';

import { SubPageLayout } from '../sub-page-layout';
import { SettingsGeneral } from './settings-general';
import { SettingsRoles } from './settings-roles';
import { Helmet } from 'react-helmet-async';
import { VerticalTabs, RouteDefinition } from '../../../shared/vertical-tabs';
import { Link, Navigate, Route, Routes } from 'react-router-dom';

export const Settings: React.FC<any> = () => {
  const {
    token: { colorTextBase }
  } = theme.useToken();

  const pages: RouteDefinition[] = [
    { id: '1', link: 'general', path: 'general', title: 'General', icon: <BookOutlined />, element: <SettingsGeneral /> },
    { id: '2', link: 'saml', path: 'saml', title: 'Saml', icon: <SettingOutlined />, element: <SettingsRoles /> }
  ];

  const screens = Grid.useBreakpoint();
  const isMobile = screens.xs;

  const profileNavigationMenu = pages.map((page) => ({
    key: page.id,
    label: <Link to={page.path.replace('/*', '')}>{page.title}</Link>
  }));

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
      <Helmet>
        <title>Admin Settings</title>
      </Helmet>
      {isMobile ? (
        <Col>
          <Row>
            <Menu className="w-11/12" items={profileNavigationMenu} mode="horizontal" style={{ borderColor: '#3f4373' }} />
          </Row>
          <Row style={{ width: '100%', padding: '24px 0px 0px 24px' }}>
            <Routes>
              <Route path="/" element={<Navigate to="general" replace />} />
              {pages.map((page) => (
                <Route key={page.id} path={page.path} element={page.element} />
              ))}
            </Routes>
          </Row>
        </Col>
      ) : (
        <VerticalTabs pages={pages} />
      )}
    </SubPageLayout>
  );
};
