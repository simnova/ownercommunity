import { PageHeader } from '@ant-design/pro-layout';
import { Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { CommunityDetailContainer } from '../components/community-detail.container';
import { SubPageLayout } from '../sub-page-layout';

const { Text } = Typography;

export const Home: React.FC<any> = (props) => {
  const params = useParams();
  return (
    <SubPageLayout fixedHeader={false} header={<PageHeader title="Home" />}>
      <CommunityDetailContainer data={{ id: params.communityId }} />
    </SubPageLayout>
  );
};
