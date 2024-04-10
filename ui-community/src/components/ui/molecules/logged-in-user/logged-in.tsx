import { Avatar, Button, Image } from 'antd';
import PropTypes from 'prop-types';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const ComponentProps = {
  data: PropTypes.shape({
    profileImage: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    notificationCount: PropTypes.number
  }),
  onLogoutClicked: PropTypes.func
};

interface ComponentPropInterface {
  data: {
    profileImage?: string;
    firstName: string;
    lastName: string;
    notificationCount: number;
  };
  onLogoutClicked: () => void;
}

export type LoggedInPropTypes = PropTypes.InferProps<typeof ComponentProps> & ComponentPropInterface;

export const LoggedIn: FC<any> = (props) => {
  const initials = (props.data.firstName.charAt(0) + props.data.lastName.charAt(0)).toUpperCase();
  const profileImage = props.data.profileImage ? <Image src={props.data.profileImage} fallback={`https://ui-avatars.com/api/?name=${props.data.firstName}+${props.data.lastName}`}/> : <Image src={`https://ui-avatars.com/api/?name=${props.data.firstName}+${props.data.lastName}`} />
  return <div className='ml-3'>
    <Avatar src={profileImage} style={{backgroundColor: '#87d068'}}>{initials}</Avatar><span
    className='mr-3'>{' '}{props.data.firstName} {props.data.lastName}{' '}</span>

    <Button onClick={props.onLogoutClicked}>Log Out</Button>
    <span className='mx-3'>
    <Link to="/community/accounts">My Community(s)</Link>
    </span>

  </div>
}
