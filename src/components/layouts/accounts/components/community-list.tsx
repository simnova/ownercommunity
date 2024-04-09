import { Button, Col, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LocalSettingsKeys } from '../../../../constants';
import { Community, Member, Role } from '../../../../generated';

const { Title } = Typography;

export interface CommunityListProps {
  data: {
    communities: Community[];
    members: Member[][];
  };
}

const isMemberAdmin = (member: Member): boolean => {
  const role = member.role;
  if (role == null || role == undefined) {
    return false;
  }
  return role.permissions.communityPermissions.canManageRolesAndPermissions || 
        role.permissions.communityPermissions.canManageCommunitySettings || 
        role.permissions.communityPermissions.canManageSiteContent || 
        role.permissions.communityPermissions.canManageMembers || 
        role.permissions.propertyPermissions.canManageProperties ||
        role.permissions.serviceTicketPermissions.canManageTickets ||
        role.permissions.serviceTicketPermissions.canAssignTickets ||
        role.permissions.serviceTicketPermissions.canWorkOnTickets;
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
                    if (isMemberAdmin(member)) {
                        return (
                            <Button
                                key={member.id}
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
