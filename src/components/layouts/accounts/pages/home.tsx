import { CommunityListContainer } from '../components/community-list-container';
import { Button, PageHeader, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SubPageLayout } from '../sub-page-layout';

export const Home: React.FC<any> = (props) => {
  const { Title } = Typography;
  const navigate = useNavigate();
  return (
    <SubPageLayout fixedHeader={false} header={<PageHeader title="Your Communities" />}>
      <Title level={3}>Select a Community</Title>
      <CommunityListContainer />
      <br/>
      <Title level={3}>Create a New Community</Title>
      <Button type='primary' style={{width:'400px'}} onClick={() => navigate('create-community')}>Create a Community...</Button>
  </SubPageLayout>
  )
}