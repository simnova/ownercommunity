import { IdcardOutlined, ProfileOutlined, TeamOutlined } from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-layout';

import { useNavigate } from 'react-router-dom';

import { SubPageLayout } from '../sub-page-layout';
import { MembersAccounts } from './members-accounts';
import { MembersGeneral } from './members-general';
import { MembersProfile } from './members-profile';
import { VerticalTabs,RouteDefinition } from '../../../shared/vertical-tabs'; 
import { Helmet } from 'react-helmet-async';


export const MembersDetail: React.FC<any> = () => {
  const navigate = useNavigate();

  const pages:RouteDefinition[] = [
    {id: "1", link:'', path: '', title:'General', icon:<ProfileOutlined />, element:<MembersGeneral />},
    {id: "2", link:'profile', path: 'profile/*', title:'Profile', icon:<IdcardOutlined />, element:<MembersProfile />},
    {id: "3", link:'accounts', path: 'accounts/*', title:'Accounts', icon:<TeamOutlined />, element:<MembersAccounts />},
  ]

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
        <VerticalTabs pages={pages} />
    </SubPageLayout>
  )
}