import { PageHeader } from '@ant-design/pro-layout';
import { Typography, theme } from 'antd';
import { useParams } from 'react-router-dom';
import { CommunityDetailContainer } from '../components/community-detail.container';
import { SubPageLayout } from '../sub-page-layout';

const { Text } = Typography;

export const Home: React.FC<any> = (props) => {
  const {
    token:{
      colorTextBase,
      colorBgContainer
    }
  }=theme.useToken()
  const params = useParams();
  return (
    <SubPageLayout fixedHeader={false} header={<PageHeader  
    
      title= {
        <span style={{
          color: colorTextBase
        }}>Home</span>
      }
    />}>
      <CommunityDetailContainer data={{ id: params.communityId }} />
    </SubPageLayout>
  );
};
