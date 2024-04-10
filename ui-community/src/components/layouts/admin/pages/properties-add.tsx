import { PageHeader } from '@ant-design/pro-layout';

import { useNavigate, useParams } from 'react-router-dom';
import { PropertiesAddContainer } from '../components/properties-add.container';
import { SubPageLayout } from '../sub-page-layout';

export const PropertiesAdd: React.FC<any> = () => {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <SubPageLayout
      fixedHeader={false}
      header={<PageHeader title="Add Property" onBack={() => navigate('../')} />}
    >
      <PropertiesAddContainer data={{ communityId: params.communityId ?? '' }} />
    </SubPageLayout>
  );
};
