import { PageHeader } from '@ant-design/pro-layout';
import { Typography } from "antd";
import { SubPageLayout } from "../sub-page-layout";

const { Text } = Typography;

export const Vocabulary: React.FC<any> = () => {
  return (
    <SubPageLayout
      fixedHeader={false}
      header={<PageHeader title="Vocabulary" />}
    >
      <Text>Vocabulary</Text>
    </SubPageLayout>
  );
};
