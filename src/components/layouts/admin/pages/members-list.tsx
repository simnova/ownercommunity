import React from 'react';
import { PageHeader } from '@ant-design/pro-layout';
import { Button, theme } from 'antd';
import { SubPageLayout } from '../sub-page-layout';
import { useParams, useNavigate } from 'react-router-dom';
import { MembersListContainer } from '../components/members-list.container';
import { UsergroupAddOutlined } from '@ant-design/icons';

export const MembersList: React.FC<any> = (props) => {
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
