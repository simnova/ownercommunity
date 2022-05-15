import React from 'react';
import { PageHeader, Button } from 'antd';
import { SubPageLayout } from '../sub-page-layout';
import { useParams, useNavigate } from 'react-router-dom';
import { PropertiesListContainer } from '../components/properties-list-container'

export const PropertiesList: React.FC<any> = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <SubPageLayout
      fixedHeader={false}
      header={
        <PageHeader 
          title="Properties"
          extra={[
            <Button type="primary" onClick={() => navigate('new')}>Add New</Button>
          ]}
        />}
      >
        <PropertiesListContainer data={{communityId:params.communityId}} />
    </SubPageLayout>
  )
}