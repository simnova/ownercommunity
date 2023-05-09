import React from 'react';
import { PageHeader } from '@ant-design/pro-layout';
import { SubPageLayout } from '../sub-page-layout';
import { useParams } from 'react-router-dom';
import { PropertiesListContainer } from '../components/properties-list.container';

export const PropertiesList: React.FC<any> = (_props) => {
  const params = useParams();
  return (
    <SubPageLayout
      fixedHeader={false}
      header={
        <PageHeader 
          title="Properties"
        />}
      >
        <PropertiesListContainer data={{communityId:params.communityId}} />
    </SubPageLayout>
  )
}