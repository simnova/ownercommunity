import { IdcardOutlined, ProfileOutlined, TeamOutlined } from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-layout';
import { Col, Menu, Row } from 'antd';

import { Link, Route, Routes, matchRoutes, useLocation, useNavigate, useResolvedPath } from 'react-router-dom';

import { SubPageLayout } from '../sub-page-layout';
import { MembersAccounts } from './members-accounts';
import { MembersGeneral } from './members-general';
import { MembersProfile } from './members-profile';
import { Helmet } from 'react-helmet-async';


export const MembersDetail: React.FC<any> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathLocations = {
    general: '',
    profile: 'profile/*',
    accounts: 'accounts/*'
  };

  const pages = [
    {id: "1", path: useResolvedPath(pathLocations.general).pathname, title:'General', icon:<ProfileOutlined />},
    {id: "2", path: useResolvedPath(pathLocations.profile).pathname, title:'Profile', icon:<IdcardOutlined />},
    {id: "3", path: useResolvedPath(pathLocations.accounts).pathname, title:'Accounts', icon:<TeamOutlined />},
  ]

  const matchedPages = matchRoutes(pages,location)
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
        <Helmet>
          <title>Member Detail</title>
        </Helmet>
        <Row wrap={false}>
          <Col flex="none">
          <Menu mode="inline" selectedKeys={matchedIds}>
            <Menu.Item key="1" icon={<ProfileOutlined />}>
              <Link to="">General</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<IdcardOutlined />}>
              <Link to="profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<TeamOutlined />}>
              <Link to="accounts">Accounts</Link>
            </Menu.Item>
          </Menu>
          </Col>
          <Col flex="auto" style={{paddingLeft:'24px'}}>
            <Routes>
              <Route path={pathLocations.general} element={<MembersGeneral />} />
              <Route path={pathLocations.profile} element={<MembersProfile />} />
              <Route path={pathLocations.accounts} element={<MembersAccounts />} />
            </Routes>
          </Col>
        </Row>
    </SubPageLayout>
  )
}