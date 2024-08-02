import { PageHeader } from '@ant-design/pro-layout';

import { useNavigate, useParams } from 'react-router-dom';
import { ServiceTicketsDetailContainer } from '../components/service-tickets-detail.container';
import { SubPageLayout } from '../sub-page-layout';
import { Helmet } from 'react-helmet-async';

export const ServiceTicketsDetail: React.FC<any> = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <SubPageLayout header={<PageHeader title="ServiceTicket Detail" onBack={() => navigate(-1)} />}>
      <Helmet>
        <title>Service Ticket Detail</title>
      </Helmet>
      <ServiceTicketsDetailContainer
        key={params.id ?? ''}
        data={{ id: params.id ?? '', ticketType: params.ticketType ?? '', communityId: params.communityId ?? '' }}
      />
    </SubPageLayout>
  );
};
