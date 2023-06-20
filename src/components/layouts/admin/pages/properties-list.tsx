import React from 'react';
import { PageHeader } from '@ant-design/pro-layout';
import { Button, theme } from 'antd';
import { SubPageLayout } from '../sub-page-layout';
import { useParams, useNavigate } from 'react-router-dom';
import { PropertiesListContainer } from '../components/properties-list.container'

export const PropertiesList: React.FC<any> = (props) => {
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
          }}>Properties</span>
        }
          extra={[
            <Button type="primary" onClick={() => navigate('new')}>Add New</Button>
          ]}
        />}
      >
        <PropertiesListContainer data={{communityId:params.communityId}} />
    </SubPageLayout>
  )
}