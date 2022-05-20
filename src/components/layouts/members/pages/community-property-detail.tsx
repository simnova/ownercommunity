import { useNavigate, useNavigationType, useParams } from "react-router-dom";
import { PageHeader, Typography } from 'antd';
import { SubPageLayout } from '../sub-page-layout';

const { Text } = Typography;



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
        <Text> Property ID: {params.propertyId}</Text>
        <Text> Implement me!</Text>

      </SubPageLayout>
      
    )
  }