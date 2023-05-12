import { graphql } from 'babel-plugin-relay/macro';
import { userInfoCurrentUserFields$key } from "./__generated__/userInfoCurrentUserFields.graphql";
import { useFragment } from 'react-relay';
import { UserInfoContainerCurrentUserFieldsFragmentDoc } from '../../../../generated';


const DataFragment = graphql`
  fragment userInfoCurrentUserFields on CurrentUser {
    id
  }
`

export interface CommunityListProps {
  userCurrent: userInfoCurrentUserFields$key;
}

export const UserInfo: React.FC<any> = (props) => {
  const data = useFragment(DataFragment, props.userCurrent)
  console.log(data)
  return (
    <>
      User ID: {data.id} <br />
    </>
  );
};
