import { PageHeader } from '@ant-design/pro-layout';
import { Button, theme } from 'antd';

import { useNavigate, useParams } from 'react-router-dom';
import { RolesListContainer } from '../components/roles-list.container';
import { SubPageLayout } from '../sub-page-layout';

export const RolesList: React.FC<any> = () => {
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
          }} data-testid="roles-span">Roles</span>
        }
          extra={[
            <Button type="primary" onClick={() => navigate('new')}>
              Add New Role
            </Button>
          ]}
        />
      }
    >
      <RolesListContainer data={{ communityId: params.communityId ?? '' }} />
    </SubPageLayout>
  );
};
