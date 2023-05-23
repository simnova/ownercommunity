import { useMutation, useQuery } from '@apollo/client';
import { SharedMembersProfileContainerMemberUpdateDocument, MemberProfileInput, SharedMembersProfileContainerMemberDocument } from '../../../../generated';
import { message } from 'antd';
import { MemberProfileDetails } from './member-profile-details';
import { ComponentQueryLoader } from '../../../ui/molecules/component-query-loader';

interface MemberProfileDetailsContainerProps {
  data: {
    id: string;
  }
}

export const MemberProfileDetailsContainer: React.FC<MemberProfileDetailsContainerProps> = (props) => {
  const [updateMember] = useMutation(SharedMembersProfileContainerMemberUpdateDocument);  
  const { data: memberData, loading: memberLoading, error: memberError } = useQuery(SharedMembersProfileContainerMemberDocument,{
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

  return (
    <ComponentQueryLoader
      loading={memberLoading}
      hasData={memberData && memberData.member}
      hasDataComponent={<MemberProfileDetails data={memberData?.member?.profile} onSave={handleSave} />}
      error={memberError}
    />
  );
  
}