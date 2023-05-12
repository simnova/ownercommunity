
import { useQuery } from '@apollo/client';
import { CommunityList } from './community-list';
import { CommunityListContainerCommunitiesQueryDocument } from '../../../../generated';
import graphql from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay';

// type CommunityFragment = FragmentType<typeof CommunityListContainerCommunitiesFieldsFragmentDoc>
const q = graphql`
  query communityListContainerCommunitiesQuery {
    communities {
      ...communityInfoCommunityFields
    }
  }
`

export const CommunityListContainer: React.FC<any> = (props) => {

  // const { loading, error, data} = useQuery(CommunityListContainerCommunitiesQueryDocument);
  const data =  useLazyLoadQuery(q, {})
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