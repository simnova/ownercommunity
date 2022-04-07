import React from 'react';
import { PageHeader, Button } from 'antd';
import { SubPageLayout } from '../sub-page-layout';
import { SubPageEmptyLayout } from '../sub-page-empty-layout';
import { useNavigate, useParams } from 'react-router-dom';
import { ServiceTicketsDetailContainer } from '../components/service-tickets-detail-container';


export const ServiceTicketsDetail: React.FC<any> = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  
  
  return (
    <SubPageEmptyLayout 
      header={
        <PageHeader 
          title="ServiceTicket Detail"  
          onBack={() => navigate(-1)}
          extra={[
            <Button type="primary" onClick={() => {navigate('./delete')}}>Delete...</Button>

          ]}
          />
      }>
      <ServiceTicketsDetailContainer key={params.id ?? ''} data={{id:params.id ?? ''}} />
    </SubPageEmptyLayout>
  )
}