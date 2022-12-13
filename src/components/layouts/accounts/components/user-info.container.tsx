
import { useQuery } from '@apollo/client';
import { UserInfo } from './user-info';
import { LoggedInUserContainerUserCurrentQueryDocument} from '../../../../generated';

export const UserInfoContainer: React.FC<any> = (props) => {

  const { loading, error, data} = useQuery(LoggedInUserContainerUserCurrentQueryDocument);
  
  if(error){
    return <>
      <div>Error :( {JSON.stringify(error)}</div>
    </>
  } 

  if(loading){
    return <>
      <div>Loading...</div>
    </>
  } 

  if (typeof data === 'undefined' || typeof data.userCurrent === 'undefined' || data.userCurrent === null ) {
    return <>
      <div>No Data...</div>
    </>
  }

  return (
    <div>
      <UserInfo data={{userCurrent:data.userCurrent}} />
    </div>
  )
  
}