import { useParams } from "react-router-dom";
import { PageHeader, Typography } from 'antd';
import { SubPageLayout } from '../sub-page-layout';

const { Text } = Typography;



export const CommunityPropertyDetail: React.FC<any> = (props) => {
    const params = useParams();
    return (
      <SubPageLayout
      fixedHeader={false}
      header={
        <PageHeader 
          title="Property Details"
        />}
      >
        <Text> Property ID: {params.propertyId}</Text>

      </SubPageLayout>
      
    )
  }