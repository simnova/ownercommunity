import { PageHeader } from '@ant-design/pro-layout';
import { Button } from 'antd';

import { useNavigate, useParams } from 'react-router-dom';
import { RolesDetailAddContainer } from '../components/roles-detail-add.container';
import { RolesDetailContainer } from '../components/roles-detail.container';
import { SubPageLayout } from '../sub-page-layout';

export const RolesDetail: React.FC<any> = () => {
  const params = useParams();
  const navigate = useNavigate();

  if (params.id === 'new') {
    return (
      <SubPageLayout
        fixedHeader={false}
        header={<PageHeader title="Create Role" onBack={() => navigate(-1)} />}
      >
        <RolesDetailAddContainer data={{ communityId: params.communityId }} />
      </SubPageLayout>
    );
  }
  return (
    <SubPageLayout
      header={
        <PageHeader
          title="Role Detail"
          onBack={() => navigate(-1)}
          extra={[
            <Button
              type="primary"
              onClick={() => {
                navigate('./delete');
              }}
            >
              Delete...
            </Button>
          ]}
        />
      }
    >
      <RolesDetailContainer key={params.id ?? ''} data={{ id: params.id ?? '' }} />
    </SubPageLayout>
  );
};
