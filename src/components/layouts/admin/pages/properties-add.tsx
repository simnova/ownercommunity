import React from 'react';
import { PageHeader } from 'antd';
import { SubPageLayout } from '../sub-page-layout';
import { PropertiesAddContainer } from '../components/properties-add-container';
import { useNavigate } from 'react-router-dom';

export const PropertiesAdd: React.FC<any> = (props) => {
  const navigate = useNavigate();
  return (
    <SubPageLayout
        fixedHeader={false}
        header={
          <PageHeader 
            title="Add Property"
            onBack={() => navigate('../')} 
          />
        }
        >
        <PropertiesAddContainer />
      </SubPageLayout>
  )  
}