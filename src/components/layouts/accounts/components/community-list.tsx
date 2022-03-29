import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { CommunityListContainerCommunitiesFieldsFragment} from '../../../../generated';

export interface CommunityListProps {
  data: {
    communities: {
      id: string;
      name: string;
    }[];
  }
}

export const CommunityList: React.FC<any> = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Navigate to a Community</h1>

      {props.data.communities.map((community:any) => ( 
        <div key={community.id}>
          <Button onClick={() => navigate(`/community/${community.id}/members`)}>{community.name} Member Site</Button>
          <Button onClick={() => navigate(`/community/${community.id}/admin`)}>{community.name} Admin Site</Button>
        </div>
      ))}
    </div>
  )
}