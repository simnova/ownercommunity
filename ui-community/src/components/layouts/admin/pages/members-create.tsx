import { PageHeader } from '@ant-design/pro-layout';

import { useNavigate, useParams } from 'react-router-dom';
import { MembersCreateContainer } from '../components/members-create.container';
import { SubPageLayout } from '../sub-page-layout';

export const MembersCreate: React.FC<any> = () => {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <SubPageLayout
      fixedHeader={false}
      header={<PageHeader title="Create Member" onBack={() => navigate('../')} />}
    >
      <MembersCreateContainer data={{ communityId: params.communityId ?? '' }} />
    </SubPageLayout>
  );
};
