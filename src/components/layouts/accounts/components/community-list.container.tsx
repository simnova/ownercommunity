
import { useQuery } from '@apollo/client';
import { CommunityList } from './community-list';
import { CommunityListContainerCommunitiesQueryDocument, CommunityListContainerCommunitiesFieldsFragment } from '../../../../generated';

export const CommunityListContainer: React.FC<any> = (props) => {

  const { loading, error, data} = useQuery(CommunityListContainerCommunitiesQueryDocument);
  
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

  if (typeof data === 'undefined' || typeof data.communities === 'undefined' || data.communities === null ) {
    return <>
      <div>No Data...</div>
    </>
  }

  return (
    <div>
      <CommunityList data={{communities: data.communities}} />
    </div>
  )
  
}