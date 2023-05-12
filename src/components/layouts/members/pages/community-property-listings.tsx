import { PageHeader } from '@ant-design/pro-layout';
import { useParams } from 'react-router-dom';
import { SubPageLayout } from '../sub-page-layout';
import { CommunityPropertyListingsContainer } from '../components/community-property-listings.container';

export const CommunityPropertyListings: React.FC<any> = (props) => {
  const params = useParams();
  return (
    <SubPageLayout fixedHeader={false} header={<PageHeader title="Property Listings" />}>
      <CommunityPropertyListingsContainer
        data={{ communityId: params.communityId ?? '' }}
      ></CommunityPropertyListingsContainer>
    </SubPageLayout>
  );
};
