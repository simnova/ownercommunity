
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { useParams } from 'react-router-dom';

interface CardProps {
  profile: {
    name: string;
    email: string;
    bio: string;
    avatarDocumentId: string;
    interests: string[];
    showProfile: boolean;
    showEmail: boolean;
    showLocation: boolean;
    showInterests: boolean;
    showProperties: boolean;
  };
}

export const NeighborsCard: React.FC<CardProps> = (props) => {
  const { communityId } = useParams();

  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1BA8F0',
        alignItems: 'center',
        textAlign: 'center',
        width: '240px',
        margin: '2%',
        borderRadius: '15px'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {props.profile.avatarDocumentId ? (
          <Avatar
            size={48}
            src={`https://ownercommunity.blob.core.windows.net/${communityId}/${props.profile.avatarDocumentId}`}
          />
        ) : (
          <Avatar size={48} icon={<UserOutlined />} />
        )}
        {props.profile.name && (
          <h3 style={{ fontWeight: '600', fontSize: '20px', margin: '0' }}>{props.profile.name}</h3>
        )}
        {props.profile.showEmail && (
          <a href={`mailto:${props.profile.email}`} style={{ color: '#333aaa', fontSize: '0.85em' }}>
            {props.profile.email}
          </a>
        )}
      </div>
      <div style={{ marginTop: '20px' }}>
        {props.profile.showLocation && <p style={{ fontSize: '0.8em' }}>{props.profile.bio}</p>}
      </div>
      {props.profile.showInterests && (
        <div style={{ textAlign: 'left', width: '200px', marginRight: '15px' }}>
          <h4 style={{ fontWeight: '600', margin: '0' }}>Interests:</h4>
          {props.profile.interests.map((interest) => {
            return (
              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: '#666',
                  borderRadius: '5px',
                  padding: '2.5px 5px',
                  fontSize: '10px',
                  color: '#fff'
                }}
              >
                {interest}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};
