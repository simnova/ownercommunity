import { useMutation, useQuery } from "@apollo/client";
import { Skeleton, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { AdminMembersAccountsEditContainerMemberAccountEditDocument, AdminMembersAccountsEditContainerMemberAccountRemoveDocument, AdminMembersAccountsEditContainerMemberDocument, MemberAccountEditInput } from "../../../../generated";
import { MembersAccountsEdit } from "./members-accounts-edit";

export interface MembersAccountsEditContainerProps  {
  data: {
    memberId:string
  }
}

export const MembersAccountsEditContainer: React.FC<MembersAccountsEditContainerProps> = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const [memberAccountEdit] = useMutation(AdminMembersAccountsEditContainerMemberAccountEditDocument);
  const [memberAccountRemove] = useMutation(AdminMembersAccountsEditContainerMemberAccountRemoveDocument);


  const { data: memberData, loading: memberLoading, error: memberError } = useQuery(AdminMembersAccountsEditContainerMemberDocument,{
    variables: {
      id: props.data.memberId
    }
  });

  const handleRemove = async() => {
    try {

      await memberAccountRemove({
        variables: {
          input: {
            memberId : props.data.memberId,
            accountId : params.accountId
          }
        }      
      });
      message.success("Member Account Remove");
      navigate(`../`); 
    } catch (error) {
      message.error(`Error Removing Member Account: ${JSON.stringify(error)}`);
    }

  }

  const handleSave = async (values: MemberAccountEditInput) => {
    try {
      values.memberId = props.data.memberId;
      values.accountId = params.accountId;
      await memberAccountEdit({
        variables: {
          input: values
        }      
      });
      message.success("Member Account Updated");
      navigate(`../`); 
    } catch (error) {
      message.error(`Error Updating Member Account: ${JSON.stringify(error)}`);
    }
  }

  if(memberLoading) {
    return <div><Skeleton active /></div>
  }
  if(memberError) {
    return <div>{JSON.stringify(memberError)}</div>
  }
  if(memberData?.member?.accounts && memberData?.member?.accounts.length > 0 ) {
    const accountToEdit = memberData.member.accounts.find(x => x?.id === params.accountId);

    if(accountToEdit) {
      const defaultValues: MemberAccountEditInput = {
        memberId: props.data.memberId,
        accountId: params.accountId,
        firstName: accountToEdit.firstName,
        lastName: accountToEdit.lastName,
      }
      return <MembersAccountsEdit onSave={handleSave} onRemove={handleRemove} data={defaultValues} />
    }else{
      return <div>Account not found for {params.accountId}</div>
    }
  }
  
  return <div>No Data...</div>
}