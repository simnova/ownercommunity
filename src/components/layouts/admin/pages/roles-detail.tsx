import React from 'react';
import { PageHeader, Button } from 'antd';
import { SubPageLayout } from '../sub-page-layout';
import { useNavigate, useParams } from 'react-router-dom';
import { RolesDetailContainer } from '../components/roles-detail.container';
import { RolesDetailAddContainer } from '../components/roles-detail-add.container';

export const RolesDetail: React.FC<any> = (props) => {
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
