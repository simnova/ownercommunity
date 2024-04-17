import { useQuery } from '@apollo/client';
import {
  Community,
  CommunityListContainerCommunitiesQueryDocument,
  CommunityListContainerMembersByUserExternalIdQueryDocument,
  Member
} from '../../../../generated';
import { CommunityList } from './community-list';
import { ComponentQueryLoader } from '../../../ui/molecules/component-query-loader';
import { jwtDecode } from 'jwt-decode';

export const CommunityListContainer: React.FC<any> = () => {
  const {
    loading: communityLoading,
    error: communityError,
    data: communityData
  } = useQuery(CommunityListContainerCommunitiesQueryDocument);

  // extract externalId from jwt token
  const sessionStorageKey = `oidc.user:${import.meta.env.VITE_AAD_ACCOUNT_AUTHORITY}:${
    import.meta.env.VITE_AAD_ACCOUNT_CLIENTID
  }`;
  const { id_token } = JSON.parse(sessionStorage.getItem(sessionStorageKey) as string);

  const userExternalId = jwtDecode(id_token).sub ?? '';

  const {
    loading: membersLoading,
    error: membersError,
    data: membersData
  } = useQuery(CommunityListContainerMembersByUserExternalIdQueryDocument, {
    variables: { userExternalId },
    fetchPolicy: 'network-only'
  });

  let members: Member[][] = [];
  if (
    membersData?.membersByUserExternalId &&
    membersData?.membersByUserExternalId.length > 0 &&
    communityData?.communities
  ) {
    for (const community of communityData.communities) {
      members.push(
        membersData.membersByUserExternalId.filter((member) => member?.community?.id === community?.id) as Member[]
      );
    }
  }

  return (
    <ComponentQueryLoader
      loading={communityLoading || membersLoading}
      hasData={communityData?.communities}
      hasDataComponent={<CommunityList data={{ communities: communityData?.communities as Community[], members }} />}
      noDataComponent={<div>No Data...</div>}
      error={communityError || membersError}
      errorComponent={
        communityError ? (
          <div>Error :( {JSON.stringify(communityError)}</div>
        ) : (
          <div>Error :( {JSON.stringify(membersError)}</div>
        )
      }
    />
  );
};
