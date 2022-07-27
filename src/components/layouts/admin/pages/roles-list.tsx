import React from 'react';
import { PageHeader, Button } from 'antd';
import { SubPageLayout } from '../sub-page-layout';
import { useParams, useNavigate } from 'react-router-dom';
import { RolesListContainer } from '../components/roles-list.container';

export const RolesList: React.FC<any> = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <SubPageLayout
      fixedHeader={false}
      header={
        <PageHeader
          title="Roles"
          extra={[
            <Button type="primary" onClick={() => navigate('new')}>
              Add New
            </Button>
          ]}
        />
      }
    >
      <RolesListContainer data={{ communityId: params.communityId ?? '' }} />
    </SubPageLayout>
  );
};
