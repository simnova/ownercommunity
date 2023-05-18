import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { LoggedInUserContainerUserCurrentQueryDocument } from '../../../../generated';

import { LoggedInUser, LoggedInUserPropTypes } from '../../molecules/logged-in-user';
import { useMsal } from '../../../shared/msal-react-lite';
import { LocalSettingsKeys } from '../../../../constants';
import { useParams } from 'react-router-dom';

const ComponentProps = {
  autoLogin: PropTypes.bool
};

interface ComponentPropInterface {
  autoLogin: boolean;
}

export type HeaderPropTypes = PropTypes.InferProps<typeof ComponentProps> & ComponentPropInterface;

export const LoggedInUserContainer: React.FC<HeaderPropTypes> = (props) => {
  const { getIsLoggedIn, login, logout, registerCallback, getSilentAuthResult } = useMsal();
  const { communityId } = useParams();

  const { loading, error, data } = useQuery(LoggedInUserContainerUserCurrentQueryDocument, {
    variables: {
      communityId: communityId,
    }
  });

  const handleLogout = async () => {
    await logout('account');
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error : {JSON.stringify(error)}</div>;
  }
  if (data && data.userCurrent) {
    const userData: LoggedInUserPropTypes = {
      data: {
        isLoggedIn: true,
        firstName: data.userCurrent.firstName ?? '',
        lastName: data.userCurrent.lastName ?? '',
        notificationCount: 0,
        profileImage: data.memberForCurrentUser?.profile?.avatarDocumentId ?? undefined,
      }
    };
    return (
      <div className="text-right text-sky-400" style={{ flexGrow: '1' }}>
        <LoggedInUser
          key={data.userCurrent.id}
          data={userData.data}
          onLogoutClicked={handleLogout}
        />
      </div>
    );
  }
  //catch-all return
  return (
    <>
      <div>Nothing</div>
    </>
  );
};
