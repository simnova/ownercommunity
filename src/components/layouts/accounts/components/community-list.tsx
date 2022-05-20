import { useNavigate } from 'react-router-dom';
import { Button, Row, Col } from 'antd';
import { LocalSettingsKeys } from '../../../../constants';

export interface CommunityListProps {
  data: {
    communities: {
      id: string;
      name: string;
    }[];
  };
}

export const CommunityList: React.FC<any> = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Navigate to a Community</h1>

      {props.data.communities.map((community: any) => (
        <div key={community.id}>
          <Row justify="center">
            <Col span={8} style={{ textAlign: 'center', borderRight: 'solid 1px' }}>
              <Button
                style={{ width: '250px' }}
                onClick={() =>
                  navigate(
                    `/community/${community.id}/member/${localStorage.getItem(
                      LocalSettingsKeys.UserId
                    )}`
                  )
                }
              >
                {community.name} Member Site
              </Button>
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
              <Button
                style={{ width: '250px' }}
                onClick={() => navigate(`/community/${community.id}/admin`)}
              >
                {community.name} Admin Site
              </Button>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
};
