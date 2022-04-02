import React from 'react';
import { PageHeader } from 'antd';
import { SubPageLayout } from '../sub-page-layout';
import { MembersCreateContainer } from '../components/members-create-container';
import { useNavigate } from 'react-router-dom';

export const MembersCreate: React.FC<any> = (props) => {
  const navigate = useNavigate();
  return (
    <SubPageLayout
        fixedHeader={false}
        header={
          <PageHeader 
            title="Create Member" 
            onBack={() => navigate('../')} 
          />
        }
        >
        <MembersCreateContainer />
      </SubPageLayout>
  )  
}