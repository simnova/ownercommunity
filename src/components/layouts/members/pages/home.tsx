import { PageHeader } from '@ant-design/pro-layout';
import { Typography,theme } from 'antd';
import { useParams } from 'react-router-dom';
import { SubPageLayout } from '../sub-page-layout';

const { Paragraph } = Typography;

export const Home: React.FC<any> = () => {
  const {
    token: {
      colorTextBase
    }
  }=theme.useToken()
  const params = useParams();
  return (
    <SubPageLayout fixedHeader={false} header={<PageHeader title={
      <span style={{
        color: colorTextBase
      }}>Home</span>
    } />}>
      <Paragraph> Community ID: {params.communityId}</Paragraph>
      <Paragraph> User ID: {params.userId}</Paragraph>
    </SubPageLayout>
  );
};
