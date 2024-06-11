import { CommunityListContainer } from '../components/community-list.container';
import { Typography } from 'antd';
import { SubPageLayout } from '../sub-page-layout';
import { UserInfoContainer } from '../components/user-info.container';
import { Helmet } from 'react-helmet-async';
const { Title } = Typography;

export const Home: React.FC<any> = () => {
  return (
    <SubPageLayout
      fixedHeader={false}
      header={
        <></>
      }
    >
      <Helmet>
        <title>Owner Community Home</title>
      </Helmet>
      <Title level={3}>Welcome to Owner Community</Title>
      To join a community, you must provide the community manager with the following:
      <br />
      <br />
      <UserInfoContainer />
      <br />
      <br />
      <CommunityListContainer />
    </SubPageLayout>
  );
};
