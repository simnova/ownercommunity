import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MemberProfileContainerMemberForCurrentUserDocument } from '../../../../generated';
import { ComponentQueryLoader } from '../../../ui/molecules/component-query-loader';
import { MemberProfile } from './member-profile';

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
    <ComponentQueryLoader
      loading={memberLoading}
      hasData={(memberData?.memberForCurrentUser) ?? props.isAdmin}
      hasDataComponent={<MemberProfile data={{ id: memberId ?? '', communityId: props.data.communityId }} />}
      error={memberError}
    />
  )
};
