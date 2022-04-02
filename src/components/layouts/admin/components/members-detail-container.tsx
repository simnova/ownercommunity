import { useMutation, useQuery } from '@apollo/client';
import { AdminMembersDetailContainerMemberDocument, AdminMembersDetailContainerRolesDocument, AdminMembersDetailContainerMemberUpdateDocument, MemberUpdateInput } from '../../../../generated';
import { MembersDetail} from './members-detail';
import PropTypes  from 'prop-types';
import { message,Skeleton } from 'antd';

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
  const { data: roleData, loading: roleLoading, error: roleError } = useQuery(AdminMembersDetailContainerRolesDocument);
  const [updateMember] = useMutation(AdminMembersDetailContainerMemberUpdateDocument);  
  const { data: memberData, loading: memberLoading, error: memberError } = useQuery(AdminMembersDetailContainerMemberDocument,{
      variables: {
        id: props.data.id
      }
    });

  const handleSave = async (values: MemberUpdateInput) => {
    try {
      await updateMember({
        variables: {
          input:values
        },
        
      });
      message.success("Saved");
    } catch (error) {
      message.error(`Error updating Member: ${JSON.stringify(error)}`);
    }

  }

  const content = () => {
    if(memberLoading || roleLoading) {
      return <div><Skeleton active /></div>
    } else if( memberError || roleError) {
      return <div>{JSON.stringify(memberError || roleError )}</div>
    } else if(memberData && memberData.member && roleData && roleData.roles) {
      var detailData = {
        member: memberData.member,
        roles: roleData.roles
      }
      return <MembersDetail data={detailData} onSave={handleSave} />
    } else {
      return <div>No data</div>
    }
  }

  return <>
    {content()}
  </>
  
}