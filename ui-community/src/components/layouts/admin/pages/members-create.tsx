import { PageHeader } from '@ant-design/pro-layout';

import { useNavigate, useParams } from 'react-router-dom';
import { MembersCreateContainer } from '../components/members-create.container';
import { SubPageLayout } from '../sub-page-layout';
import { Helmet } from 'react-helmet-async';

export const MembersCreate: React.FC<any> = () => {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <SubPageLayout
      fixedHeader={false}
      header={<PageHeader title="Create Member" onBack={() => navigate('../')} />}
    >
        <Helmet>
          <title>Create Member</title>
        </Helmet>
      <MembersCreateContainer data={{ communityId: params.communityId ?? '' }} />
    </SubPageLayout>
  );
};
