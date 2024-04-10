import { Typography } from 'antd';
import { CurrentUser } from '../../../../generated';

export interface CommunityListProps {
  data: {
    userCurrent: CurrentUser;
  };
}

export const UserInfo: React.FC<CommunityListProps> = (props) => {
  return (
    <Typography.Paragraph data-testid="user-id">
      User ID: {props.data.userCurrent.id} <br />
    </Typography.Paragraph>
  );
};
