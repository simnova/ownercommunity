import { PageHeader } from '@ant-design/pro-layout';
import { useParams } from 'react-router-dom';
import { SubPageLayout } from '../sub-page-layout';
import { CommunityPropertyListingsContainer } from '../components/community-property-listings.container';
import {
  theme
} from "antd"
export const CommunityPropertyListings: React.FC<any> = () => {
  const params = useParams();
  const {
    token: {
      colorTextBase
    }
  }=theme.useToken()
  return (
    <SubPageLayout fixedHeader={false} header={<PageHeader 
      title= {
        <span style={{
          color: colorTextBase
        }}>Property Listings</span>
      }
    />}>
      <CommunityPropertyListingsContainer
        data={{ communityId: params.communityId ?? '' }}
      ></CommunityPropertyListingsContainer>
    </SubPageLayout>
  );
};
