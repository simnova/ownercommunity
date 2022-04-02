import React from 'react';
import { PageHeader, Button } from 'antd';
import { SubPageLayout } from '../sub-page-layout';
import { useParams, useNavigate } from 'react-router-dom';
import { MembersListContainer } from '../components/members-list-container'

export const MembersList: React.FC<any> = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <SubPageLayout
      fixedHeader={false}
      header={
        <PageHeader 
          title="Members" 
          extra={[
            <Button type="primary" onClick={() => navigate('create')}>Create Member</Button>
          ]}
        />}
      >
        <MembersListContainer data={{communityId:params.communityId}} />
    </SubPageLayout>
  )
}