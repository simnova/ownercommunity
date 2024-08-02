import { PageHeader } from '@ant-design/pro-layout';
import { SubPageLayout } from '../sub-page-layout';
import { ServiceTicketsCreateContainer } from '../components/service-tickets-create.container';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export const ServiceTicketsCreate: React.FC<any> = (_props) => {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <SubPageLayout
      fixedHeader={false}
      header={<PageHeader title="Create Service Ticket" onBack={() => navigate('../')} />}
    >
      <Helmet>
        <title>Create Service Ticket</title>
      </Helmet>
      <ServiceTicketsCreateContainer
        data={{ communityId: params.communityId ?? '', memberId: params.memberId ?? '' }}
      />
    </SubPageLayout>
  );
};
