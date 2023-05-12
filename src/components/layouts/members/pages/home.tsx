import { PageHeader } from '@ant-design/pro-layout';
import { Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { SubPageLayout } from '../sub-page-layout';

const { Text } = Typography;

export const Home: React.FC<any> = (props) => {
  const params = useParams();
  return (
    <SubPageLayout fixedHeader={false} header={<PageHeader title="Home" />}>
      <Text> Community ID: {params.communityId}</Text>
      <Text> User ID: {params.userId}</Text>
    </SubPageLayout>
  );
};
