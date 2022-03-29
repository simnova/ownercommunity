import { useQuery } from "@apollo/client";
import { AdminMembersListContainerMembersByCommunityIdDocument } from "../../../../generated";
import { MembersList} from "./members-list";
import { Skeleton } from "antd";

export const MembersListContainer: React.FC<any> = (props) => {
  const { data: memberData, loading: memberLoading, error: memberError } = useQuery(AdminMembersListContainerMembersByCommunityIdDocument,{
    variables: {
      communityId: props.data.communityId
    }
  });

  if(memberLoading) {
    return <div><Skeleton active /></div>
  }
  if(memberError) {
    return <div>{JSON.stringify(memberError)}</div>
  }
  if(memberData ) {    
    return <MembersList data={memberData.membersByCommunityId} />
  } else {
    return <div>No Data...</div>
  }
}