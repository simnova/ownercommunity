import { useMutation, useQuery } from '@apollo/client';
import { Skeleton, message } from 'antd';
import PropTypes from 'prop-types';
import {
    AdminMembersDetailContainerMemberDocument,
    AdminMembersDetailContainerMemberUpdateDocument,
    AdminMembersDetailContainerRolesDocument,
    MemberUpdateInput
} from '../../../../generated';
import { MembersDetail } from './members-detail';

const ComponentPropTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    communityId: PropTypes.string.isRequired
  })
};

interface ComponentPropInterface {
  data: {
    id: string;
    communityId: string;
  };
}

export type MembersDetailContainerPropTypes = PropTypes.InferProps<typeof ComponentPropTypes> &
  ComponentPropInterface;

export const MembersDetailContainer: React.FC<MembersDetailContainerPropTypes> = (props) => {
  const {
    data: roleData,
    loading: roleLoading,
    error: roleError
  } = useQuery(AdminMembersDetailContainerRolesDocument, {
    variables: { communityId: props.data.communityId }
  });
  const [updateMember] = useMutation(AdminMembersDetailContainerMemberUpdateDocument);
  const {
    data: memberData,
    loading: memberLoading,
    error: memberError
  } = useQuery(AdminMembersDetailContainerMemberDocument, {
    variables: {
      id: props.data.id
    }
  });

  const handleSave = async (values: MemberUpdateInput) => {
    try {
      await updateMember({
        variables: {
          input: values
        }
      }).then((res) => {
        if (res.data?.memberUpdate.status.success) {
          message.success('Saved');
        } else {
          message.error(`Error updating Member: ${res.data?.memberUpdate.status.errorMessage}`);
        }
      });
    } catch (error) {
      message.error(`Error updating Member: ${JSON.stringify(error)}`);
    }
  };

  const content = () => {
    if (memberLoading || roleLoading) {
      return (
        <div>
          <Skeleton active />
        </div>
      );
    } else if (memberError || roleError) {
      return <div>{JSON.stringify(memberError ?? roleError)}</div>;
    } else if (memberData?.member && roleData?.rolesByCommunityId) {
      const detailData = {
        member: memberData.member,
        roles: roleData.rolesByCommunityId
      };
      return <MembersDetail data={detailData} onSave={handleSave} />;
    } else {
      return <div>No data</div>;
    }
  };

  return <>{content()}</>;
};
