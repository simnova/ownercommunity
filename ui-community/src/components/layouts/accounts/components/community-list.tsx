import { Button, Typography, Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Community, Member } from '../../../../generated';

const { Title } = Typography;

export interface CommunityListProps {
  data: {
    communities: Community[];
    members: Member[][];
  };
}

export const CommunityList: React.FC<CommunityListProps> = (props) => {
  const navigate = useNavigate();
  let items = props.data?.communities?.map((community: any, i: number) => ({
    key: community.id,
    label: community.name,
    children: (
      <div>
        {props.data?.members[i]?.map((member: Member) => (
          <div className="flex flex-col gap-4">
            <Title level={5} style={{}}>
              {community.name + ' Login Portals'}
            </Title>
            <div className="flex flex-row gap-4 items-center">
              <Button
                type="default"
                key={member.id}
                data-testid="community-list-button"
                style={{ width: '200px', marginBottom: '10px' }}
                onClick={() => navigate(`/community/${community.id}/member/${member.id}`)}
              >
                Member Portal
              </Button>
              {member?.isAdmin && (
                <Button
                  type="default"
                  key={member.id + '-admin'}
                  data-testid="community-list-admin-button"
                  style={{ width: '200px', marginBottom: '10px' }}
                  onClick={() => navigate(`/community/${community.id}/admin/${member.id}`)}
                >
                  Admin Portal
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }));
  return (
    <div>
      <div className="flex justify-between">
        <h1>Navigate to a Community</h1>
        <Button type="primary" onClick={() => navigate('create-community')}>
          Create a Community
        </Button>
      </div>
      <div className="w-full p-5 mx-auto my-5 shadow-lg rounded-lg">
        {items.length > 0 ? <Tabs items={items} tabPosition="left" /> : <Title level={5} style={{display: 'flex', justifyContent: 'center'}}>You currently don't have any communities. Please create a community using the button on the right or join one.</Title>}
      </div>
    </div>
  );
};
