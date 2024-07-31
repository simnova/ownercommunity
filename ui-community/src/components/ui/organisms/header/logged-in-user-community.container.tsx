import { useLazyQuery } from '@apollo/client';
import { LoggedInUserCommunityContainerUserCurrentQueryDocument, LoggedInUserCommunityContainerUserCurrentQueryQuery } from '../../../../generated';

import { useParams } from 'react-router-dom';
import { ComponentQueryLoader } from '../../molecules/component-query-loader';
import { LoggedInUser, LoggedInUserPropTypes } from '../../molecules/logged-in-user';
import { useAuth } from 'react-oidc-context';
import { useEffect, useState } from 'react';
import { Skeleton } from 'antd';

interface HeaderPropTypes {
  autoLogin: boolean;
}

export const LoggedInUserCommunityContainer: React.FC<HeaderPropTypes> = () => {
  const auth = useAuth();
  const params = useParams();

  const [memberQuery] = useLazyQuery(LoggedInUserCommunityContainerUserCurrentQueryDocument);
  const [data, setData] = useState<LoggedInUserCommunityContainerUserCurrentQueryQuery|null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: dataTemp,
          loading: loadingTemp,
          error: errorTemp
        } = await memberQuery();
        setData(dataTemp as LoggedInUserCommunityContainerUserCurrentQueryQuery);
        setError(loadingTemp);
        setLoading(errorTemp);
      } catch (e) {
        console.error('Error getting data in logged in user component: ', e);
      }
    };
    getData();
  }, [params]);

  const handleLogout = async () => {
    await auth.removeUser();
    await auth.signoutRedirect({ post_logout_redirect_uri: window.location.origin });
  };

  const LoggedInCommunityContainer = () => {
    const userData: LoggedInUserPropTypes = {
      data: {
        isLoggedIn: true,
        firstName: data?.userCurrent?.personalInformation?.identityDetails?.restOfName ?? '',
        lastName: data?.userCurrent?.personalInformation?.identityDetails?.lastName ?? '',
        notificationCount: 0,
        profileImage: data?.memberForCurrentUser?.profile?.avatarDocumentId
          ? `https://ownercommunity.blob.core.windows.net/${params.communityId}/${data.memberForCurrentUser.profile.avatarDocumentId}`
          : undefined
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
      noDataComponent={<Skeleton loading/>}
    />
  );
};
