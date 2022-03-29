import React from 'react';
import { PageHeader } from 'antd';
import { SubPageLayout } from '../sub-page-layout';
import { useParams } from 'react-router-dom';
//import { ListingCreateContainer } from '../components/listing-create-container';
import { MembersDetailContainer } from '../components/members-detail-container';
//import { ListingDraftPhotosEditContainer } from '../components/listing-draft-photos-edit-container';

export const MembersDetail: React.FC<any> = (props) => {
  const params = useParams();
  
  if(params.id === 'new') {
    return (
      <SubPageLayout
        fixedHeader={false}
        header={
          <PageHeader 
            title="Create Member" 
            onBack={() => window.history.back()} 
          />
        }
        >
       
      </SubPageLayout>
    )
  }
  return (
    <SubPageLayout header={<PageHeader title="Member Detail"  onBack={() => window.history.back()} />}>
      <MembersDetailContainer data={{id:params.id ?? ''}} />
    </SubPageLayout>
  )
}