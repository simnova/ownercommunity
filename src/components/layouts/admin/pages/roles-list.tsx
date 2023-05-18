import React from 'react';
import { PageHeader } from '@ant-design/pro-layout';
import { Button , theme} from 'antd';
import { SubPageLayout } from '../sub-page-layout';
import { useParams, useNavigate } from 'react-router-dom';
import { RolesListContainer } from '../components/roles-list.container';

export const RolesList: React.FC<any> = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    token:{
      colorTextBase,
      colorBgContainer
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
          }}>Roles</span>
        }
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
