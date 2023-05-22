import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MemberProfileContainerMemberForCurrentUserDocument } from '../../../../generated';
import { useQuery } from '@apollo/client';
import { MembersProfileContainer } from '../../members/components/member-profile.container';
import { MembersProfileContainer as AdminMembersProfileContainer } from '../../admin/components/members-profile.container';
import { ProfilePhotoUploadContainer } from './profile-photo-upload.container';

export interface MemberProfileContainerProps {
  data: {
    communityId: string;
  };
  isAdmin?: boolean;
}

export const MemberProfileContainer: React.FC<MemberProfileContainerProps> = (props) => {
  const params = useParams();
  const [memberId, setMemberId] = useState<string | undefined>(params.id);

  const {
    data: memberData,
    loading: memberLoading,
    error: memberError
  } = useQuery(MemberProfileContainerMemberForCurrentUserDocument, {
    variables: {
      communityId: props.data.communityId
    },
    skip: props.isAdmin
  });

  useEffect(() => {
    if (memberData?.memberForCurrentUser?.id) {
      setMemberId(memberData?.memberForCurrentUser?.id);
    }
  }, [memberData]);

  return (
    <>
      <ProfilePhotoUploadContainer data={{ id: memberId ?? '', communityId: props.data.communityId ?? '' }} />
      {props.isAdmin ? (
        <MembersProfileContainer data={{ communityId: props.data.communityId ?? '' }} />
      ) : (
        <AdminMembersProfileContainer data={{ id: memberId ?? '' }} />
      )}
    </>
  );
};
