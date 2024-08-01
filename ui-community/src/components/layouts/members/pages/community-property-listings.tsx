import { PageHeader } from '@ant-design/pro-layout';
import { useParams } from 'react-router-dom';
import { SubPageLayout } from '../sub-page-layout';
import { CommunityPropertyListingsContainer } from '../components/community-property-listings.container';
import { theme } from 'antd';
import { Helmet } from 'react-helmet-async';
export const CommunityPropertyListings: React.FC<any> = () => {
  const params = useParams();
  const {
    token: { colorTextBase }
  } = theme.useToken();
  return (
    <SubPageLayout
      fixedHeader={false}
      header={
        <PageHeader
          title={
            <span
              style={{
                color: colorTextBase
              }}
            >
              Property Listings
            </span>
          }
        />
      }
    >
      <Helmet>
        <title>Property Listings</title>
      </Helmet>
      <CommunityPropertyListingsContainer
        data={{ communityId: params.communityId ?? '' }}
      ></CommunityPropertyListingsContainer>
    </SubPageLayout>
  );
};
