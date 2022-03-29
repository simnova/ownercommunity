import { useMutation, useQuery } from "@apollo/client";
import {  AdminMembersDetailContainerMemberDocument } from "../../../../generated";
import { MembersDetail} from "./members-detail";
import PropTypes  from "prop-types";
import { message,Skeleton } from "antd";
import { SubPageLayout } from "../sub-page-layout";

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

export type MembersDetailContainerPropTypes = PropTypes.InferProps<typeof ComponentPropTypes> & ComponentPropInterface;

export const MembersDetailContainer: React.FC<MembersDetailContainerPropTypes> = (props) => {
  //const [updateAccout, { data, loading, error }] = useMutation(MemberSettingsGeneralContainerUpdateMemberDocument);  
  const { data: memberData, loading: memberLoading, error: memberError } = useQuery(AdminMembersDetailContainerMemberDocument,{
      variables: {
        id: props.data.id
      }
    });
/*
  const handleSave = async (values: MemberUpdateInput) => {
    values.id = memberData!.memberGetByHandle!.id;
    try {
      await updateAccout({
        variables: {
          input:values
        },
        refetchQueries: [
          {
            query: MemberSettingsGeneralContainerMemberGetByHandleDocument,
            variables: {
              handle: props.data.handle
            }
          }
        ]
      });
      message.success("Saved");
    } catch (error) {
      message.error(`Error updating user: ${JSON.stringify(error)}`);
    }

  }
*/
  const content = () => {
    if(memberLoading) {
      return <div><Skeleton active /></div>
    } else if( memberError) {
      return <div>{}{memberError}</div>
    } else if(memberData && memberData.member) {
      return <MembersDetail data={memberData.member} />
    } else {
      return <div>No Data...</div>
    }
  }

  return <>
    {content()}
  </>
  
}