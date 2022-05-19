import {PageHeader, Typography, Steps} from 'antd'
import { useParams } from 'react-router-dom'
import { SubPageLayout } from '../sub-page-layout'
import { LoadingOutlined } from "@ant-design/icons";
import { CommunityPropertyListingsContainer } from '../components/community-property-listings-container';

const { Text } = Typography
const { Step } = Steps

export const CommunityPropertyListings: React.FC<any> = (props) => {
    const params = useParams();
    return (
      <SubPageLayout
      fixedHeader={false}
      header={
        <PageHeader 
          title="Property Listings"
        />}
      >
        <CommunityPropertyListingsContainer data={{ communityId: params.communityId ?? ''}}></CommunityPropertyListingsContainer>
        
      </SubPageLayout>
      
    )
  }