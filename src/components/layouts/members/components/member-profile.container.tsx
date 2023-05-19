import { useMutation, useQuery } from '@apollo/client';
import {
  CurrentMemberProfileByCommunityIdDocument,
  MemberProfileInput,
  MembersProfileContainerMemberUpdateDocument
} from '../../../../generated';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { MembersProfile } from '../../shared/components/members-profile';
import { ComponentQueryLoader } from '../../../ui/molecules/component-query-loader';

const ComponentPropTypes = {
  data: PropTypes.shape({
    communityId: PropTypes.string.isRequired
  })
};

interface ComponentPropInterface {
  data: {
    communityId: string;
  };
}

export type MembersProfileContainerPropTypes = PropTypes.InferProps<typeof ComponentPropTypes> & ComponentPropInterface;

export const MembersProfileContainer: React.FC<MembersProfileContainerPropTypes> = (props) => {
  const [updateMember] = useMutation(MembersProfileContainerMemberUpdateDocument);
  const {
    data: memberData,
    loading: memberLoading,
    error: memberError
  } = useQuery(CurrentMemberProfileByCommunityIdDocument, {
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
            profile: values
          }
        }
      });
      if (result.data?.memberProfileUpdate.status.success) {
        message.success('Saved');
      } else {
        message.error(`Error updating Member: ${result.data?.memberProfileUpdate.status.errorMessage}`);
      }
    } catch (error) {
      message.error(`Error updating Member: ${JSON.stringify(error)}`);
    }
  };

  return (
    <ComponentQueryLoader
      loading={memberLoading}
      hasData={memberData && memberData.memberForCurrentUser}
      hasDataComponent={<MembersProfile data={memberData?.memberForCurrentUser?.profile} onSave={handleSave} />}
      error={memberError}
    />
  );
};
