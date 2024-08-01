import { useQuery } from '@apollo/client';
import React from 'react';
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
  const { memberId } = useParams();

  const {
    data: memberData,
    loading: memberLoading,
    error: memberError
  } = useQuery(MemberProfileContainerMemberForCurrentUserDocument, {
    skip: props.isAdmin
  });

  return (
    <ComponentQueryLoader
      loading={memberLoading}
      hasData={(memberData?.memberForCurrentUser) ?? props.isAdmin}
      hasDataComponent={<MemberProfile data={{ id: memberId ?? '', communityId: props.data.communityId }} />}
      error={memberError}
    />
  )
};
