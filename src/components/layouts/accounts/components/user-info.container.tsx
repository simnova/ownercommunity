import { UserInfo } from './user-info';
import { graphql } from 'babel-plugin-relay/macro';
import { loadQuery, useLazyLoadQuery, usePreloadedQuery, useRelayEnvironment } from 'react-relay';
import { userInfoContainerUserCurrentQuery } from './__generated__/userInfoContainerUserCurrentQuery.graphql';
import React from 'react';

const q = graphql`
  query userInfoContainerUserCurrentQuery {
    userCurrent {
      ...userInfoCurrentUserFields
    }
  }
`


export const UserInfoContainer: React.FC<any> = (props) => {
  const qref = loadQuery<userInfoContainerUserCurrentQuery>(
    useRelayEnvironment(),
    q,
    {}
  )

  // const { loading, error, data} = useQuery(LoggedInUserContainerUserCurrentQueryDocument);
  const data = usePreloadedQuery<userInfoContainerUserCurrentQuery>(q, qref)
  console.log("user info", data)
  const loading = false
  const error = false
  
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
      <UserInfo userCurrent={data.userCurrent} />
    </div>
  )
  
}