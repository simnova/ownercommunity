import { useQuery } from '@apollo/client';

import { LoggedInUserRootContainerUserCurrentQueryDocument } from '../../../../generated';
import { UserInfo } from './user-info';

export const UserInfoContainer: React.FC<any> = () => {

  const { loading, error, data} = useQuery(LoggedInUserRootContainerUserCurrentQueryDocument);
  
  if(error){
    return <div>Error : {JSON.stringify(error)}</div>
  } 

  if(loading){
    return <div>Loading...</div>
  } 

  if (typeof data === 'undefined' || typeof data.userCurrent === 'undefined' || data.userCurrent === null ) {
    return <div>No Data...</div>
  }

  return (
    <div>
      <UserInfo data={{userCurrent: data.userCurrent}} />
    </div>
  )
  
}