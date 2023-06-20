import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { LoggedInUserCommunityContainerUserCurrentQueryDocument } from '../../../../generated';

import { LoggedInUser, LoggedInUserPropTypes } from '../../molecules/logged-in-user';
import { useMsal } from '../../../shared/msal-react-lite';
import { useParams } from 'react-router-dom';
import { ComponentQueryLoader } from '../../molecules/component-query-loader';

interface HeaderPropTypes {
  autoLogin: boolean;
}

export const LoggedInUserCommunityContainer: React.FC<HeaderPropTypes> = (props) => {
  const { getIsLoggedIn, login, logout, registerCallback, getSilentAuthResult } = useMsal();
  const params = useParams();

  const { loading, error, data } = useQuery(LoggedInUserCommunityContainerUserCurrentQueryDocument, {
    variables: {
      communityId: params.communityId
    }
  });

  const handleLogout = async () => {
    await logout('account');
  };


  const LoggedInCommunityContainer = () => {
    const userData: LoggedInUserPropTypes = {
      data: {
        isLoggedIn: true,
        firstName: data?.userCurrent?.firstName ?? '',
        lastName: data?.userCurrent?.lastName ?? '',
        notificationCount: 0,
        profileImage:
          `https://ownercommunity.blob.core.windows.net/${params.communityId}/${data?.memberForCurrentUser?.profile?.avatarDocumentId}` ??
          undefined
      }
    };
    return (
      <div className="text-right text-sky-400" style={{ flexGrow: '1' }}>
        <LoggedInUser key={data?.userCurrent?.id} data={userData.data} onLogoutClicked={handleLogout} />
      </div>
    );
  };

  return (
    <ComponentQueryLoader
      loading={loading}
      hasData={data && data.userCurrent && data.memberForCurrentUser}
      hasDataComponent={<LoggedInCommunityContainer />}
      error={error}
      noDataComponent={<div>Nothing</div>}
    />
  );
};
