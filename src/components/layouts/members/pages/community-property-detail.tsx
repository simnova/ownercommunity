import { useNavigate, useNavigationType, useParams } from "react-router-dom";
import { PageHeader, Typography } from 'antd';
import { SubPageLayout } from '../sub-page-layout';
import { CommunityPropertyDetailContainer } from "../components/community-property-detail.container";

export const CommunityPropertyDetail: React.FC<any> = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    return (
      <SubPageLayout
      fixedHeader={false}
      header={
        <PageHeader 
          title="Property Details"
          onBack={() => navigate(-1)}
        />}
      >
          
        <CommunityPropertyDetailContainer data={params}></CommunityPropertyDetailContainer>

      </SubPageLayout>
      
    )
  }