import { PageHeader } from '@ant-design/pro-layout';
import { Helmet } from 'react-helmet-async';
import { theme } from 'antd';
import { useParams } from 'react-router-dom';
import { CommunityDetailContainer } from '../components/community-detail.container';
import { SubPageLayout } from '../sub-page-layout';


export const Home: React.FC<any> = () => {
  const {
    token: {
      colorTextBase    
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
      <Helmet>
        <title>Home - Admin</title>
      </Helmet>
      <CommunityDetailContainer data={{ id: params.communityId }} />
    </SubPageLayout>
  );
};
