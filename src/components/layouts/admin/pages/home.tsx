import { UsernamePasswordClient } from "@azure/msal-common";
import { PageHeader, Typography, Descriptions } from "antd";
import { useParams } from "react-router-dom";
import { SubPageLayout } from "../sub-page-layout";

const { Text } = Typography;

export const Home: React.FC<any> = (props) => {
  const params = useParams();
  return (
    <SubPageLayout fixedHeader={false} header={<PageHeader title="Home" />}>
      <Descriptions column={1}>
        <Descriptions.Item label="Community ID">
          <Text strong>{params.communityId}</Text>
        </Descriptions.Item>
      </Descriptions>
    </SubPageLayout>
  );
};
