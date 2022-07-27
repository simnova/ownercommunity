import React from 'react';
import { PageHeader } from 'antd';
import { SubPageLayout } from '../sub-page-layout';
import { MembersCreateContainer } from '../components/members-create.container';
import { useNavigate, useParams } from 'react-router-dom';

export const MembersCreate: React.FC<any> = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <SubPageLayout
      fixedHeader={false}
      header={<PageHeader title="Create Member" onBack={() => navigate('../')} />}
    >
      <MembersCreateContainer data={{ communityId: params.communityId ?? '' }} />
    </SubPageLayout>
  );
};
