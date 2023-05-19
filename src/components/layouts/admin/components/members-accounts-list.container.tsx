import { useQuery } from "@apollo/client";
import { AdminMembersAccountsListContainerMemberDocument } from "../../../../generated";
import { MembersAccountsList} from "./members-accounts-list";
import PropTypes  from 'prop-types';
import { ComponentQueryLoader } from "../../../ui/molecules/component-query-loader";

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

  return (
    <ComponentQueryLoader
      loading={memberLoading}
      hasData={memberData && memberData.member}
      hasDataComponent={<MembersAccountsList data={memberData?.member?.accounts} />}
      error={memberError}
    />
  );  

};