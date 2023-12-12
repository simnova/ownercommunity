import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';

import { LoggedInUserRootContainerUserCurrentQueryDocument } from '../../../../generated';

import { LocalSettingsKeys } from '../../../../constants';
import { useMsal } from '../../../shared/msal-react-lite';
import { ComponentQueryLoader } from '../../molecules/component-query-loader';
import { LoggedInUser, LoggedInUserPropTypes } from '../../molecules/logged-in-user';

const ComponentProps = {
  autoLogin: PropTypes.bool
};

interface ComponentPropInterface {
  autoLogin: boolean;
}

export type HeaderPropTypes = PropTypes.InferProps<typeof ComponentProps> & ComponentPropInterface;

export const LoggedInUserRootContainer: React.FC<HeaderPropTypes> = () => {
  const { logout } = useMsal();

  const { loading, error, data } = useQuery(LoggedInUserRootContainerUserCurrentQueryDocument);

  const handleLogout = async () => {
    await logout('account');
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
      hasData={data && data.userCurrent}
      hasDataComponent={<LoggedInRootContainer />}
      error={error}
      noDataComponent={<div>Nothing</div>}
    />
  );
};
