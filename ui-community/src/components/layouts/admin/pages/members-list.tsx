import { UsergroupAddOutlined } from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-layout';
import { Button, theme } from 'antd';

import { useNavigate, useParams } from 'react-router-dom';
import { MembersListContainer } from '../components/members-list.container';
import { SubPageLayout } from '../sub-page-layout';

export const MembersList: React.FC<any> = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    token: {
      colorTextBase
    }
  }=theme.useToken()
  return (
    <SubPageLayout
      fixedHeader={false}
      header={
        <PageHeader
        title={
          <span style={{
            color: colorTextBase
          }}>Members</span>
        }
          extra={[
            <Button
              type="primary"
              onClick={() => navigate('create')}
              icon={<UsergroupAddOutlined />}
            >
              Create Member
            </Button>
          ]}
        />
      }
    >
      <MembersListContainer data={{ communityId: params.communityId ?? '' }} />
    </SubPageLayout>
  );
};
