import { PageHeader } from '@ant-design/pro-layout';

import { useNavigate, useParams } from 'react-router-dom';
import { ServiceTicketsCreateContainer } from '../components/service-tickets-create.container';
import { SubPageLayout } from '../sub-page-layout';

export const ServiceTicketsCreate: React.FC<any> = () => {
  const navigate = useNavigate();
  const params = useParams();
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
        <ServiceTicketsCreateContainer data={{communityId: params.communityId ?? ""}}/>
      </SubPageLayout>
  )  
}