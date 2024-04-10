import { PageHeader } from '@ant-design/pro-layout';

import { useNavigate, useParams } from 'react-router-dom';
import { ServiceTicketsDetailContainer } from '../components/service-tickets-detail.container';
import { SubPageLayout } from '../sub-page-layout';

export const ServiceTicketsDetail: React.FC<any> = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <SubPageLayout
      header={
        <PageHeader
          title="ServiceTicket Detail"
          onBack={() => navigate(-1)}
          // extra={[
          //   <Button
          //     type="primary"
          //     onClick={() => {
          //       navigate('./delete');
          //     }}
          //   >
          //     Delete...
          //   </Button>
          // ]}
        />
      }
    >
      <ServiceTicketsDetailContainer key={params.id ?? ''} data={{ id: params.id ?? '' , communityId:params.communityId ?? '' }} />
    </SubPageLayout>
  );
};
