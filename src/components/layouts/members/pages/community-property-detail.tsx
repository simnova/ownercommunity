import { PageHeader } from '@ant-design/pro-layout';
import { useNavigate, useParams } from "react-router-dom";
import { CommunityPropertyDetailContainer } from "../components/community-property-detail.container";
import { SubPageLayout } from '../sub-page-layout';

export const CommunityPropertyDetail: React.FC<any> = () => {
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