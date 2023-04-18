import { useQuery } from "@apollo/client";
import { AdminMembersAccountsListContainerMemberDocument } from "../../../../generated";
import { MembersAccountsList} from "./members-accounts-list";
import { Skeleton } from "antd";
import PropTypes  from 'prop-types';

const ComponentPropTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired
  }),
}

interface ComponentPropInterface {
  data: {
    id: string;
  }
}

export type MembersAccountsListContainerPropTypes = PropTypes.InferProps<typeof ComponentPropTypes> & ComponentPropInterface;



export const MembersAccountsListContainer: React.FC<MembersAccountsListContainerPropTypes> = (props) => {
  const { data: memberData, loading: memberLoading, error: memberError } = useQuery(AdminMembersAccountsListContainerMemberDocument,{
    variables: {
      id: props.data.id
    }
  });

  console.log(memberData)

  if(memberLoading) {
    return <div><Skeleton active /></div>
  }
  if(memberError) {
    return <div>{JSON.stringify(memberError)}</div>
  }
  if(memberData && memberData.member ) {    
    return <MembersAccountsList data={memberData.member.accounts} />
  } else {
    return <div>No Data...</div>
  }
}