import { CommunityListContainer } from '../components/community-list.container';
import { Button, Typography, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SubPageLayout } from '../sub-page-layout';
import { UserInfoContainer } from '../components/user-info.container';
const { Title } = Typography;

export const Home: React.FC<any> = () => {
 const {
  token:{
    colorTextBase
  }
 }=theme.useToken()
  const navigate = useNavigate();
  
  return (
    <SubPageLayout fixedHeader={false} header={<Title level={3} style={{
      color:colorTextBase,
      marginLeft: '35px',
    }
    }>
      Your Community
    </Title>}>
      <Title level={3}>Welcome to Owner Community</Title>
      To join a community, you must provide the community manager with the following:
      <br />
      <br />
      <UserInfoContainer />
      <br />
      <br />
      <Title level={3}>Create a New Community</Title>
      <Button type="primary" style={{ width: '400px' }} onClick={() => navigate('create-community')}>
        Create a Community...
      </Button>
      <br /> <Title level={3}>Select a Community</Title>
      <CommunityListContainer />
    </SubPageLayout>
  );
};
