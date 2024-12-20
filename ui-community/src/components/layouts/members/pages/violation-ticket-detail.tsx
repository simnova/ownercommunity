import { PageHeader } from '@ant-design/pro-layout';

import { useNavigate, useParams } from 'react-router-dom';

import { SubPageLayout } from '../sub-page-layout';
import { ViolationTicketsDetailContainer } from '../components/violation-tickets-detail.container';
import AddPaymentMethodModalContainer from '../components/add-payment-method-modal.container';

export const ViolationTicketsDetail: React.FC<any> = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <SubPageLayout header={<PageHeader title="Violation Ticket Detail" onBack={() => navigate(-1)} />}>
      <ViolationTicketsDetailContainer
        key={params.id ?? ''} 
        data={{ id: params.id ?? '', ticketType: params.ticketType ?? '', communityId: params.communityId ?? '', memberId: params.memberId  ?? '' }}
      />
      <AddPaymentMethodModalContainer />
    </SubPageLayout>
  );
};
