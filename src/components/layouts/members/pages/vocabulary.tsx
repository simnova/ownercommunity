import { PageHeader, Typography } from "antd";
import { SubPageLayout } from "../sub-page-layout";

const { Text } = Typography;

export const Vocabulary: React.FC<any> = (props) => {
  return (
    <SubPageLayout
      fixedHeader={false}
      header={<PageHeader title="Vocabulary" />}
    >
      <Text>Vocabulary</Text>
    </SubPageLayout>
  );
};
