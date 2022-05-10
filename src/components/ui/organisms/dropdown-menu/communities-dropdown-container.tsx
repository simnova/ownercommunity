import { useQuery } from '@apollo/client';
import {
  AdminCommunitiesDropdownContainerCommunityDocument,
  Community
} from '../../../../generated';
import { CommunitiesDropdown } from './communities-dropdown';

interface CommunitiesDropdownContainerProps {
  data: {
    id?: string;
  };
}

export const CommunitiesDropdownContainer: React.FC<CommunitiesDropdownContainerProps> = (
  props
) => {
  const {
    data: communityData,
    loading: communityLoading,
    error: communityError
  } = useQuery(AdminCommunitiesDropdownContainerCommunityDocument, {
    variables: { id: props.data.id ?? '' }
  });

  if (communityLoading) {
    return (
      <div className="text-sky-400">
        {/* <Skeleton active /> */}
        Loading...
      </div>
    );
  }
  if (communityError) {
    return <div>{JSON.stringify(communityError)}</div>;
  }
  if (communityData) {
    return <CommunitiesDropdown data={{ community: communityData.communityById as Community }} />;
  } else {
    return <div>No Data...</div>;
  }
};
