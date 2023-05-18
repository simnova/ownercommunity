import { useMutation, useQuery } from '@apollo/client';
import { AdminMembersProfileContainerMemberDocument, AdminMembersProfileContainerMemberUpdateDocument, MemberProfileInput, MemberProfileUpdateInput } from '../../../../generated';
import PropTypes  from 'prop-types';
import { message,Skeleton } from 'antd';
import { MembersProfile } from '../../shared/components/members-profile';

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

export type MembersProfileContainerPropTypes = PropTypes.InferProps<typeof ComponentPropTypes> & ComponentPropInterface;

export const MembersProfileContainer: React.FC<MembersProfileContainerPropTypes> = (props) => {
  const [updateMember] = useMutation(AdminMembersProfileContainerMemberUpdateDocument);  
  const { data: memberData, loading: memberLoading, error: memberError } = useQuery(AdminMembersProfileContainerMemberDocument,{
    variables: {
      id: props.data.id
    }
  });

  const handleSave = async (values: MemberProfileInput) => {
    try {
      
      var result = await updateMember({
        variables: {
          input: {
            memberId: props.data.id,
            profile:values
          } 
        },
      });
      if(result.data?.memberProfileUpdate.status.success){
        message.success("Saved");
      }else {
        message.error(`Error updating Member: ${result.data?.memberProfileUpdate.status.errorMessage}`);
      }
    } catch (error) {
      message.error(`Error updating Member: ${JSON.stringify(error)}`);
    }
  }

  const content = () => {
    if(memberLoading ) {
      return <div><Skeleton active /></div>
    } else if( memberError ) {
      return <div>{JSON.stringify(memberError  )}</div>
    } else if(memberData && memberData.member ) {
      return <MembersProfile data={memberData.member.profile} onSave={handleSave} />
    } else {
      return <div>No data</div>
    }
  }

  return <>
    {content()}
  </>
  
}