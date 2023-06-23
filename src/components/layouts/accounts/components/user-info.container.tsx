import { useQuery } from '@apollo/client';
import { UserInfo } from './user-info';
import { LoggedInUserRootContainerUserCurrentQueryDocument} from '../../../../generated';
import React from 'react';

export const UserInfoContainer: React.FC<any> = (props) => {

  const { loading, error, data} = useQuery(LoggedInUserRootContainerUserCurrentQueryDocument);
  
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
      <UserInfo userCurrent={{userCurrent: data.userCurrent}} />
    </div>
  )
  
}