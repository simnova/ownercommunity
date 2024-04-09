import { useQuery } from '@apollo/client';
import { Community, Member, SharedCommunitiesDropdownContainerMembersDocument } from '../../../../generated';
import { ComponentQueryLoader } from '../../molecules/component-query-loader';
import { CommunitiesDropdown } from './communities-dropdown';
import { jwtDecode } from 'jwt-decode';

interface CommunitiesDropdownContainerProps {
  data: {
    id?: string;
  };
  isAdmin?: boolean;
}

export const CommunitiesDropdownContainer: React.FC<CommunitiesDropdownContainerProps> = (props) => {

  const sessionStorageKey = `oidc.user:${import.meta.env.VITE_AAD_ACCOUNT_AUTHORITY}:${import.meta.env.VITE_AAD_ACCOUNT_CLIENTID}`;
  const { id_token } = JSON.parse(sessionStorage.getItem(sessionStorageKey) as string);

  const userExternalId = jwtDecode(id_token).sub ?? '';

  const {
    data: membersData,
    loading: membersLoading,
    error: membersError
  } = useQuery(SharedCommunitiesDropdownContainerMembersDocument, {
    variables: { userExternalId }
  });

  return (
    <ComponentQueryLoader
      loading={membersLoading}
      hasData={membersData}
      hasDataComponent={
        <CommunitiesDropdown
          data={{
            members: membersData?.membersByUserExternalId as Member[]
          }}
          isAdmin={props.isAdmin}
        />
      }
      error={membersError}
    />
  );
};
