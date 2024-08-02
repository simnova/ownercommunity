import { Typography } from 'antd';
import { User } from '../../../../generated';

export interface CommunityListProps {
  data: {
    userCurrent: User;
  };
}

export const UserInfo: React.FC<CommunityListProps> = (props) => {
  return (
    <Typography.Paragraph data-testid="user-id">
      User ID: {props.data.userCurrent.id} <br />
    </Typography.Paragraph>
  );
};
