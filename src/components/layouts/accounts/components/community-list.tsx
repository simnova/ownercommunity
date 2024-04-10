import { Button, Col, Row, Typography } from 'antd';
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
  
  return (
    <div>
      <h1>Navigate to a Community</h1>

      {props.data?.communities?.map((community: any, i: number) => (
        <div key={community.id} style={{ padding: "20px"}}>
          <Row justify="center">
            <Col span={16} style={{ textAlign: 'left' }}>
              <Title level={2}>{community.name}</Title>
            </Col>
          </Row>
          <Row justify="center">
            <Col span={8} style={{ textAlign: 'center' }}>
              <div style={{ backgroundColor: 'lightblue', padding: '10px', margin: "0 50px", borderRadius: "5px" }}>
                <Title level={4} style={{ padding: "5px 0" }}>Member Portal</Title>
                {props.data?.members[i]?.map((member: Member) => 
                    <Button
                        key={member.id}
                        data-testid="community-list-button"
                        style={{ width: '200px', marginBottom: '10px' }}
                        onClick={() =>
                            navigate(
                                `/community/${community.id}/member/${member.id}`
                            )
                        }
                    >
                        {member.memberName}
                    </Button>
                )}
              </div>
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
              <div style={{ backgroundColor: '#3a59e0', padding: '10px', margin: "0 50px", borderRadius: "5px" }}>
                <Title level={4} style={{ padding: "5px 0" }}>Admin Portal</Title>
                {props.data?.members[i]?.map((member: Member) => {
                    if (member?.community?.userIsAdmin) {
                        return (
                            <Button
                                key={member.id + '-admin'}
                                data-testid="community-list-admin-button"
                                style={{ width: '200px', marginBottom: '10px' }}
                                onClick={() =>
                                    navigate(
                                        `/community/${community.id}/admin/${member.id}`
                                    )
                                }
                            >
                                {member.memberName}
                            </Button>
                        )
                    } else {
                        return <></>;
                    }
                })}
              </div>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
};
