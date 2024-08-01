import { PageHeader } from '@ant-design/pro-layout';
import { Typography, theme } from 'antd';

import { useParams } from 'react-router-dom';
import { MemberProfileContainer } from '../../shared/components/member-profile.container';
import { SubPageLayout } from '../sub-page-layout';
import { Helmet } from 'react-helmet-async';

const { Text } = Typography;

export const MemberProfile: React.FC<any> = () => {
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
              Member Settings
            </span>
          }
        />
      }
    >
      <Helmet>
        <title>Member Settings</title>
      </Helmet>
      <Text strong>Member Details</Text>

      <MemberProfileContainer data={{ communityId: params.communityId ?? '' }} />
    </SubPageLayout>
  );
};
