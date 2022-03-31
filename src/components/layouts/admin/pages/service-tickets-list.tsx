import React from 'react';
import { PageHeader, Button } from 'antd';
import { SubPageLayout } from '../sub-page-layout';
import { useParams, useNavigate } from 'react-router-dom';
import { ServiceTicketsListContainer } from '../components/service-tickets-list-container'

export const ServiceTicketsList: React.FC<any> = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <SubPageLayout
      fixedHeader={false}
      header={
        <PageHeader 
          title="Service Tickets"
          extra={[
            <Button type="primary" onClick={() => navigate('new')}>Add New</Button>

          ]}
        />}
      >
        <ServiceTicketsListContainer data={{communityId:params.communityId}} />
    </SubPageLayout>
  )
}