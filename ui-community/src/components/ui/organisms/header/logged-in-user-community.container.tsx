import { useQuery } from '@apollo/client';
import { LoggedInUserCommunityContainerUserCurrentQueryDocument } from '../../../../generated';

import { useParams } from 'react-router-dom';
import { ComponentQueryLoader } from '../../molecules/component-query-loader';
import { LoggedInUser, LoggedInUserPropTypes } from '../../molecules/logged-in-user';
import { useAuth } from 'react-oidc-context';

interface HeaderPropTypes {
  autoLogin: boolean;
}

export const LoggedInUserCommunityContainer: React.FC<HeaderPropTypes> = () => {
  const auth = useAuth();
  const params = useParams();

  const { loading, error, data } = useQuery(LoggedInUserCommunityContainerUserCurrentQueryDocument, {
    variables: {
      communityId: params.communityId
    }
  });

  const handleLogout = async () => {
    await auth.removeUser()
    await auth.signoutRedirect({ post_logout_redirect_uri: window.location.origin });
  };

  const LoggedInCommunityContainer = () => {
    
    const userData: LoggedInUserPropTypes = {
      data: {
        isLoggedIn: true,
        firstName: data?.userCurrent?.firstName ?? '',
        lastName: data?.userCurrent?.lastName ?? '',
        notificationCount: 0,
        profileImage:
        data?.memberForCurrentUser?.profile?.avatarDocumentId ? `https://ownercommunity.blob.core.windows.net/${params.communityId}/${data.memberForCurrentUser.profile.avatarDocumentId}` :
          undefined
      }
    };
    console.log('LoggedInCommunityContainer', userData);
    return (
      <div className="text-right text-sky-400" style={{ flexGrow: '1' }}>
        <LoggedInUser key={data?.userCurrent?.id} data={userData.data} onLogoutClicked={handleLogout} />
      </div>
    );
  };

  return (
    <ComponentQueryLoader
      loading={loading}
      hasData={data?.userCurrent && data.memberForCurrentUser}
      hasDataComponent={<LoggedInCommunityContainer />}
      error={error}
      noDataComponent={<div>Nothing</div>}
    />
  );
};
