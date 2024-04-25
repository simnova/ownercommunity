import { useLazyQuery, useQuery } from '@apollo/client';
import { Community, Member, SharedCommunitiesDropdownContainerMembersDocument } from '../../../../generated';
import { ComponentQueryLoader } from '../../molecules/component-query-loader';
import { CommunitiesDropdown } from './communities-dropdown';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

interface CommunitiesDropdownContainerProps {
  data: {
    id?: string;
  };
}

export const CommunitiesDropdownContainer: React.FC<CommunitiesDropdownContainerProps> = (props) => {

  const sessionStorageKey = `oidc.user:${import.meta.env.VITE_AAD_ACCOUNT_AUTHORITY}:${import.meta.env.VITE_AAD_ACCOUNT_CLIENTID}`;
  const { id_token } = JSON.parse(sessionStorage.getItem(sessionStorageKey) as string);

  const userExternalId = jwtDecode(id_token).sub ?? '';

  const [memberQuery] =  useLazyQuery(SharedCommunitiesDropdownContainerMembersDocument);
  const [membersData, setMemberData] = useState<any>(null)
  const [membersError, setMemberError] = useState<any>(null)
  const [membersLoading, setMemberLoading] = useState<any>(null);
  

  useEffect(() => {
    const getData = async () => {
      const {
        data: membersDataTemp,
        loading: membersLoadingTemp,
        error: membersErrorTemp
      } = await memberQuery({
        variables: { userExternalId }
      });
      setMemberData(membersDataTemp)
      setMemberError(membersErrorTemp)
      setMemberLoading(membersLoadingTemp)
    }
    getData();
  }, [userExternalId])


  return (
    <ComponentQueryLoader
      loading={membersLoading}
      hasData={membersData}
      hasDataComponent={
        <CommunitiesDropdown
          data={{
            members: membersData?.membersByUserExternalId as Member[]
          }}
        />
      }
      error={membersError}
    />
  );
};
