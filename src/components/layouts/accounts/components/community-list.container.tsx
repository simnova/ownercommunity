
import { useQuery } from '@apollo/client';
import { CommunityList } from './community-list';
import { CommunityListContainerCommunitiesQueryDocument } from '../../../../generated';
import { graphql } from 'babel-plugin-relay/macro';
import { loadQuery, useLazyLoadQuery, usePreloadedQuery, useRelayEnvironment } from 'react-relay';
import { communityListContainerCommunitiesQuery } from './__generated__/communityListContainerCommunitiesQuery.graphql';

// type CommunityFragment = FragmentType<typeof CommunityListContainerCommunitiesFieldsFragmentDoc>
const q = graphql`
  query communityListContainerCommunitiesQuery {
    communities {
      ...communityInfoCommunityFields
    }
  }
`

export const CommunityListContainer: React.FC<any> = (props) => {
  const qref = loadQuery<communityListContainerCommunitiesQuery>( useRelayEnvironment(), q, {} )

  // const { loading, error, data} = useQuery(CommunityListContainerCommunitiesQueryDocument);
  const data =  usePreloadedQuery<communityListContainerCommunitiesQuery>(q, qref)
  console.log(data)
  const error = false
  const loading = false
  
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

  console.log(data)
  if (typeof data === 'undefined' || typeof data.communities === 'undefined' || data.communities === null ) {
    return <>
      <div>No Data...</div>
    </>
  }

  return (
    <div>
      <CommunityList data={data} />
    </div>
  )
  
}