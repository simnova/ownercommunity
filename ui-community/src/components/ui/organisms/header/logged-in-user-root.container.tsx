import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';

import { LoggedInUserRootContainerUserCurrentQueryDocument } from '../../../../generated';

import { LocalSettingsKeys } from '../../../../constants';
import { ComponentQueryLoader } from '../../molecules/component-query-loader';
import { LoggedInUser, LoggedInUserPropTypes } from '../../molecules/logged-in-user';
import { useAuth } from 'react-oidc-context';

const ComponentProps = {
  autoLogin: PropTypes.bool
};

interface ComponentPropInterface {
  autoLogin: boolean;
}

export type HeaderPropTypes = PropTypes.InferProps<typeof ComponentProps> & ComponentPropInterface;

export const LoggedInUserRootContainer: React.FC<HeaderPropTypes> = () => {
  const auth = useAuth();

  const { loading, error, data } = useQuery(LoggedInUserRootContainerUserCurrentQueryDocument);

  const handleLogout = async () => {
    await auth.removeUser();
    await auth.signoutRedirect({ post_logout_redirect_uri: window.location.origin });
  };

  const LoggedInRootContainer = () => {
    localStorage.setItem(LocalSettingsKeys.UserId, data?.userCurrent?.id);
    const userData: LoggedInUserPropTypes = {
      data: {
        isLoggedIn: true,
        firstName: data?.userCurrent?.firstName ?? '',
        lastName: data?.userCurrent?.lastName ?? '',
        notificationCount: 0
      }
    };
    return (
      <div className="text-right text-sky-400  flex-grow">
        <LoggedInUser key={data?.userCurrent?.id} data={userData.data} onLogoutClicked={handleLogout} />
      </div>
    );
  };

  return (
    <ComponentQueryLoader
      loading={loading}
      hasData={data?.userCurrent}
      hasDataComponent={<LoggedInRootContainer />}
      error={error}
      noDataComponent={<div>Nothing</div>}
    />
  );
};
