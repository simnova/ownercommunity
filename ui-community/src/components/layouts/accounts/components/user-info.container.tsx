import { useQuery } from '@apollo/client';

import { AccountsUserInfoContainerUserCurrentDocument, User } from '../../../../generated';
import { UserInfo } from './user-info';

export const UserInfoContainer: React.FC<any> = () => {

  const { loading, error, data} = useQuery(AccountsUserInfoContainerUserCurrentDocument);
  
  if(error){
    return <div>Error : {JSON.stringify(error)}</div>
  } 

  if(loading){
    return <div>Loading...</div>
  } 

  if (!data?.userCurrent) {
    return <div>No Data...</div>
  }

  return (
    <div>
      <UserInfo data={{userCurrent: data.userCurrent as User}} />
    </div>
  )
  
}
