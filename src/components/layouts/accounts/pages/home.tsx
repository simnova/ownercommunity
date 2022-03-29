import { CommunityListContainer } from '../components/community-list-container';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC<any> = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home</h1>
      <CommunityListContainer />


      <br/>
      <Button type='primary' onClick={() => navigate('create-community')}>Create a Community</Button>
    </div>
  )
}