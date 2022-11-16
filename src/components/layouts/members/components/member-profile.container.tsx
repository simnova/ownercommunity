import { useMutation, useQuery } from '@apollo/client';
import { AdminMembersProfileContainerMemberDocument, AdminMembersProfileContainerMemberUpdateDocument, CurrentMemberProfileByCommunityIdDocument, MemberProfileInput, MemberProfileUpdateInput, MembersProfileContainerMemberUpdateDocument } from '../../../../generated';
import { MemberProfile } from './member-profile';
import PropTypes  from 'prop-types';
import { message,Skeleton } from 'antd';

const ComponentPropTypes = {
  data: PropTypes.shape({
    communityId: PropTypes.string.isRequired
  }),
}

interface ComponentPropInterface {
  data: {
    communityId: string;
  }
}

export type MembersProfileContainerPropTypes = PropTypes.InferProps<typeof ComponentPropTypes> & ComponentPropInterface;

export const MembersProfileContainer: React.FC<MembersProfileContainerPropTypes> = (props) => {
  const [updateMember] = useMutation(MembersProfileContainerMemberUpdateDocument);  
  const { data: memberData, loading: memberLoading, error: memberError } = useQuery(CurrentMemberProfileByCommunityIdDocument,{
    variables: {
      communityId: props.data.communityId
    }
  });

  const memberId = memberData?.memberForCurrentUser?.id;
  const handleSave = async (values: MemberProfileInput) => {
    try {

      var result = await updateMember({
        variables: {
          input: {
            memberId: memberId,
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
    } else if(memberData && memberData.memberForCurrentUser ) {
      return <MemberProfile data={memberData.memberForCurrentUser.profile} onSave={handleSave} />
    } else {
      return <div>No data</div>
    }
  }

  return <>
    {content()}
  </>
  
}

