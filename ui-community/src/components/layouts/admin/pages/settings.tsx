import { BookOutlined, SettingOutlined } from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-layout';
import { theme } from 'antd';


import { SubPageLayout } from '../sub-page-layout';
import { SettingsGeneral } from './settings-general';
import { SettingsRoles } from './settings-roles';
import { Helmet } from 'react-helmet-async';
import { VerticalTabs,RouteDefinition } from '../../../shared/vertical-tabs'; 

export const Settings: React.FC<any> = () => {
  const {
    token: { colorTextBase }
  } = theme.useToken();



  const pages:RouteDefinition[] = [
    { id: "1", link:'', path: '', title: 'General', icon: <BookOutlined />, element: <SettingsGeneral /> },
    { id: "2", link:'saml', path: 'saml', title: 'Saml', icon: <SettingOutlined />, element: <SettingsRoles /> },
  ];


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
      <VerticalTabs pages={pages} />
    </SubPageLayout>
  );
};
