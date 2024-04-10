
import { PageHeader } from '@ant-design/pro-layout';
import { SubPageLayout } from '../sub-page-layout';
import { useNavigate, useParams } from 'react-router-dom';
import { ServiceTicketsDetailContainer } from '../components/service-tickets-detail.container';

export const ServiceTicketsDetail: React.FC<any> = (_props) => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <SubPageLayout
      header={
        <PageHeader
          title="ServiceTicket Detail"
          onBack={() => navigate(-1)}
        />
      }
    >
      <ServiceTicketsDetailContainer key={params.id ?? ''} data={{ id: params.id ?? '', communityId:params.communityId ?? '' }} />
    </SubPageLayout>
  );
};