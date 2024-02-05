import { Button, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LocalSettingsKeys } from '../../../../constants';
import { Community } from '../../../../generated';

export interface CommunityListProps {
  data: {
    communities: Community[];
  };
}

export const CommunityList: React.FC<CommunityListProps> = (props) => {
  const navigate = useNavigate();
  
  return (
    <div>
      <h1>Navigate to a Community</h1>

      {props.data?.communities?.map((community: any) => (
        <div key={community.id}>
          <Row justify="center">
            <Col span={8} style={{ textAlign: 'center', borderRight: 'solid 1px' }}>
              <Button
                data-testid="community-list-button"
                style={{ width: '250px', marginBottom: '10px' }}
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
            { community.userIsAdmin && (
            <Col span={8} style={{ textAlign: 'center' }}>
              <Button
                data-testid="community-list-admin-button"
                style={{ width: '250px' }}
                onClick={() => navigate(`/community/${community.id}/admin`)}
              >
                {community.name} Admin Site
              </Button>
            </Col>
            )}
          </Row>
        </div>
      ))}
    </div>
  );
};
