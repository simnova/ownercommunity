import React from 'react';
import { PageHeader } from 'antd';
import { SubPageLayout } from '../sub-page-layout';
import { ServiceTicketsCreateContainer } from '../components/service-tickets-create-container';
import { useNavigate } from 'react-router-dom';

export const ServiceTicketsCreate: React.FC<any> = (props) => {
  const navigate = useNavigate();
  return (
    <SubPageLayout
        fixedHeader={false}
        header={
          <PageHeader 
            title="Create Service Ticket"
            onBack={() => navigate('../')} 
          />
        }
        >
        <ServiceTicketsCreateContainer />
      </SubPageLayout>
  )  
}