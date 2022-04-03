import { useMutation,useLazyQuery } from "@apollo/client";
import { AdminMembersAccountsAddContainerMemberAccountAddDocument, MemberAccountAddInput, AdminMembersAccountsAddContainerMemberForUserDocument } from "../../../../generated";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { MembersAccountsAdd } from "./members-accounts-add";


export interface MembersAccountsAddContainerProps  {
  data: {
    id:string
  }
}

export const MembersAccountsAddContainer: React.FC<MembersAccountsAddContainerProps> = (props) => {
  const navigate = useNavigate();
  const [memberAccountAdd] = useMutation(AdminMembersAccountsAddContainerMemberAccountAddDocument); 
  const [loadUser] = useLazyQuery(AdminMembersAccountsAddContainerMemberForUserDocument);

  const defaultValues: MemberAccountAddInput = {
    memberId: props.data.id,
    account: {
      firstName: "",
      lastName: "",
      user:""
    }
  }

  const handleCheckUserId = async (userId: string) : Promise<{success:boolean, errorMessage:string}> => {
    var user = await loadUser({variables: {userId}});
    if(user.data && user.data.memberForUser){
      return {success:false, errorMessage:`User already exists as a Member as ${user.data.memberForUser.memberName} `}
    }
    return {success:true, errorMessage:""}
  }
    

  const handleSave = async (values: MemberAccountAddInput) => {
    try {
      values.memberId = props.data.id;
      await memberAccountAdd({
        variables: {
          input: values
        }      
      });
      message.success("Member Account Added");
      navigate(`../`); 
    } catch (error) {
      message.error(`Error Adding Member Account: ${JSON.stringify(error)}`);
    }
  }

  return <MembersAccountsAdd onSave={handleSave} onCheckUserId={handleCheckUserId} data={defaultValues} />
}