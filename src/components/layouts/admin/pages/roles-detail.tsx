import React from 'react';
import { PageHeader } from 'antd';
import { SubPageLayout } from '../sub-page-layout';
import { useParams } from 'react-router-dom';
import { RolesDetailContainer } from '../components/roles-detail-container';
import { RolesDetailAddContainer } from '../components/roles-detail-add-container';


export const RolesDetail: React.FC<any> = (props) => {
  const params = useParams();
  
  if(params.id === 'new') {
    return (
      <SubPageLayout
        fixedHeader={false}
        header={
          <PageHeader 
            title="Create Role" 
            onBack={() => window.history.back()} 
          />
        }
        >
       <RolesDetailAddContainer />
      </SubPageLayout>
    )
  }
  return (
    <SubPageLayout header={<PageHeader title="Role Detail"  onBack={() => window.history.back()} />}>
      <RolesDetailContainer key={params.id ?? ''} data={{id:params.id ?? ''}} />
    </SubPageLayout>
  )
}