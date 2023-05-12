import { CommunityInfo } from './community-info';
import { CommunityListContainerCommunitiesFieldsFragmentDoc, CommunityListContainerCommunitiesQueryQuery } from '../../../../generated';
import { makeFragmentData } from '../../../../gql';
import { communityListContainerCommunitiesQuery$data } from './__generated__/communityListContainerCommunitiesQuery.graphql';

export interface CommunityListProps {
  data: communityListContainerCommunitiesQuery$data;
}

export const CommunityList: React.FC<CommunityListProps> = (props) => {
  
  return (
    <div>
      <h1>Navigate to a Community</h1>
      {console.log(props.data.communities)}

      {props.data.communities?.map((community,i,a) => (
        community ? <CommunityInfo community={props.data.communities}></CommunityInfo> : ""
      ))}
    </div>
  );
};
