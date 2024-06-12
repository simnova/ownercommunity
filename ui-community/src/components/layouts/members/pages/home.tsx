import { PageHeader } from '@ant-design/pro-layout';
import { Typography, theme } from 'antd';
import { useParams } from 'react-router-dom';
import { SubPageLayout } from '../sub-page-layout';
import { Helmet } from 'react-helmet-async';

const { Paragraph } = Typography;

export const Home: React.FC<any> = () => {
  const {
    token: { colorTextBase }
  } = theme.useToken();
  const params = useParams();
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
              Home
            </span>
          }
        />
      }
    >
      <Helmet>
        <title>Home - Member</title>
      </Helmet>
      <Paragraph> Community ID: {params.communityId}</Paragraph>
      <Paragraph> Member ID: {params.memberId}</Paragraph>
    </SubPageLayout>
  );
};
