import { CommunityInfo } from './community-info';
import { CommunityListContainerCommunitiesFieldsFragmentDoc, CommunityListContainerCommunitiesQueryQuery } from '../../../../generated';
import { makeFragmentData } from '../../../../gql';

// type CommunityFragment = FragmentType<typeof CommunityListContainerCommunitiesFieldsFragmentDoc>
export interface CommunityListProps {
  data: CommunityListContainerCommunitiesQueryQuery;
}

export const CommunityList: React.FC<CommunityListProps> = (props) => {
  
  return (
    <div>
      <h1>Navigate to a Community</h1>
      {console.log(props.data.communities)}

      {props.data.communities?.map((community,i,a) => (
        community ? <CommunityInfo community={makeFragmentData(community, CommunityListContainerCommunitiesFieldsFragmentDoc)}></CommunityInfo> : ""
      ))}
    </div>
  );
};
