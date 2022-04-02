import { useMutation, useQuery } from "@apollo/client";
import { AdminMembersCreateContainerMemberCreateDocument, AdminMembersListContainerMembersDocument, MemberCreateInput } from "../../../../generated";
import { message, Skeleton } from "antd";
import { MembersCreate } from "./members-create";
import { useNavigate } from "react-router-dom";


export const MembersCreateContainer: React.FC<any> = (props) => {
  const navigate = useNavigate();
  const [memberCreate, {data:createData, loading:createLoading, error:createError }] = useMutation(AdminMembersCreateContainerMemberCreateDocument,{

    update(cache, { data }) { // update the list with the new item
      const newMember = data?.memberCreate.member;
      const members = cache.readQuery({ query: AdminMembersListContainerMembersDocument })?.members;
      if(newMember && members) {
        cache.writeQuery({
          query: AdminMembersListContainerMembersDocument,
          data: {
            members: [...members, newMember]
          }
        })
      }
    }
    
  });  

  const defaultValues: MemberCreateInput = {
    memberName: ''  
  }

  const handleSave = async (values: MemberCreateInput) => {
    try {
      var newMember = await memberCreate({
        variables: {
          input: values
        }      
      });
      message.success("Member Created");
      navigate(`../${newMember.data?.memberCreate.member?.id}`, { replace: true });
      
    } catch (error) {
      message.error(`Error creating Member: ${JSON.stringify(error)}`);
    }
  }

  return <MembersCreate onSave={handleSave} onUpdate={{}} data={defaultValues} />
}