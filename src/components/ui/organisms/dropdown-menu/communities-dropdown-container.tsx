import { useQuery } from '@apollo/client';
import { Community, SharedCommunitiesDropdownContainerCommunityDocument } from '../../../../generated';
import { ComponentQueryLoader } from '../../molecules/component-query-loader';
import { CommunitiesDropdown } from './communities-dropdown';

interface CommunitiesDropdownContainerProps {
  data: {
    id?: string;
  };
  isAdmin?: boolean;
}

export const CommunitiesDropdownContainer: React.FC<CommunitiesDropdownContainerProps> = (props) => {
  const {
    data: communityData,
    loading: communityLoading,
    error: communityError
  } = useQuery(SharedCommunitiesDropdownContainerCommunityDocument, {
    variables: { id: props.data.id ?? '' }
  });

  return (
    <ComponentQueryLoader
      loading={communityLoading}
      hasData={communityData}
      hasDataComponent={
        <CommunitiesDropdown
          data={{
            community: communityData?.communityById as Community,
            communities: communityData?.communities as Community[]
          }}
          isAdmin={props.isAdmin}
        />
      }
      error={communityError}
    />
  );
};
