import { CommunityListContainer } from '../components/community-list.container';
import { Button, PageHeader, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SubPageLayout } from '../sub-page-layout';
import { UserInfoContainer } from '../components/user-info.container';

export const Home: React.FC<any> = (props) => {
  const { Title } = Typography;
  const navigate = useNavigate();
  return (
    <SubPageLayout fixedHeader={false} header={<PageHeader title="Your Communities" />}>
      <Title level={3}>Welcome ot Owner Community</Title>
      To join a community, you must provide the community manager with the following:
      <br />
      <br />
      <UserInfoContainer /><br/><br/>

      <Title level={3}>Create a New Community</Title>
      <Button
        type="primary"
        style={{ width: '400px' }}
        onClick={() => navigate('create-community')}
      >
        Create a Community...
      </Button>
      <br /> <Title level={3}>Select a Community</Title>
      <CommunityListContainer />
    </SubPageLayout>
  );
};
