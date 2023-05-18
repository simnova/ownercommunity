import { PageHeader } from '@ant-design/pro-layout';
import { useNavigate } from 'react-router-dom';
import { CommunityCreateContainer } from '../components/community-create.container';
import { SubPageLayout } from '../sub-page-layout';
import { Typography, theme } from 'antd';
export const CreateCommunity: React.FC<any> = (_props) => {
const {
  token:{
    colorTextBase, colorBgContainer
  }
}=theme.useToken()
  const { Title } = Typography;
  const navigate = useNavigate();
  return (
    <SubPageLayout
      fixedHeader={false}
      header={<PageHeader title="Create a Community" onBack={() => navigate('../')} />}
    >
      <div className={' w-full p-5 mx-auto my-5 shadow-lg rounded-lg border border-1'} style={{
        backgroundColor:colorBgContainer,
        color:colorTextBase
      }}>
        <Title level={3}>Creating your Community</Title>
        <p>
          Getting started with your community is only a few clicks away.
          <br />
          Once you create it here you'll see it in the list of communities you have access to. <br />
          You will have access to both the member side and the admin side of your community. <br />
          Start by creating a name for your community, you can always change it later, you may want to make the name
          descriptive to avoid confusion with other communities with the same or similar names.
        </p>
      </div>

      <CommunityCreateContainer />
    </SubPageLayout>
  );
};
