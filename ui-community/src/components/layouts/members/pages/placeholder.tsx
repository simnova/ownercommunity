import { PageHeader } from '@ant-design/pro-layout';
import { Typography, Steps } from 'antd';
import { useParams } from 'react-router-dom';
import { SubPageLayout } from '../sub-page-layout';
import { LoadingOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Step } = Steps;

export const Placeholder: React.FC<any> = () => {
  const params = useParams();
  return (
    <SubPageLayout fixedHeader={false} header={<PageHeader title="Placeholder" />}>
      <Text> Community ID: {params.communityId}</Text>
      <Steps current={0} size="small" direction="vertical">
        <Step title={'First'} />
        <Step title={'Second'} description="Loading" icon={<LoadingOutlined />} />
      </Steps>
    </SubPageLayout>
  );
};
