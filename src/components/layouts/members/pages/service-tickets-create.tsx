
import { PageHeader } from '@ant-design/pro-layout';
import { SubPageLayout } from '../sub-page-layout';
import { ServiceTicketsCreateContainer } from '../components/service-tickets-create.container';
import { useNavigate, useParams } from 'react-router-dom';

export const ServiceTicketsCreate: React.FC<any> = (_props) => {
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