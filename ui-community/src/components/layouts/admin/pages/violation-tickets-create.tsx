import { PageHeader } from '@ant-design/pro-layout';

import { useNavigate, useParams } from 'react-router-dom';
import { SubPageLayout } from '../sub-page-layout';
import { ViolationTicketsCreateContainer } from '../components/violation-tickets-create.container';

export const ViolationTicketsCreate: React.FC<any> = () => {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <SubPageLayout
      fixedHeader={false}
      header={<PageHeader title="Create Violation Ticket" onBack={() => navigate('../')} />}
    >
      <ViolationTicketsCreateContainer data={{ communityId: params.communityId ?? '' }} />
    </SubPageLayout>
  );
};
