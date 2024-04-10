import { useParams } from 'react-router-dom';
import { LoggedInUserCommunityContainer } from './logged-in-user-community.container';
import { LoggedInUserRootContainer } from './logged-in-user-root.container';

interface ComponentPropInterface {
  autoLogin: boolean;
}

export const LoggedInUserContainer: React.FC<ComponentPropInterface> = (props) => {
  const params = useParams();

  return (
    <>
      {params.communityId ? (
        <LoggedInUserCommunityContainer autoLogin={props.autoLogin} />
      ) : (
        <LoggedInUserRootContainer autoLogin={props.autoLogin} />
      )}
    </>
  );
};
