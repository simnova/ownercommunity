import { useQuery } from '@apollo/client';
import { Typography, Skeleton } from 'antd';
import {
  AdminCommunitiesDropdownContainerCommunityDocument,
  AdminCommunityDetailContainerCommunityDocument
} from '../../../../generated';
import { CommunitiesDropdown } from './communities-dropdown';

interface CommunitiesDropdownContainerProps {
  data: {
    id: string;
  };
}

export const CommunitiesDropdownContainer: React.FC<any> = (props) => {
  const {
    data: communityData,
    loading: communityLoading,
    error: communityError
  } = useQuery(AdminCommunitiesDropdownContainerCommunityDocument, {
    variables: { id: props.data.id ?? '' }
  });

  if (communityLoading) {
    return (
      <div>
        <Skeleton active />
      </div>
    );
  }
  if (communityError) {
    return <div>{JSON.stringify(communityError)}</div>;
  }
  if (communityData) {
    return <CommunitiesDropdown data={communityData.communityById} />;
  } else {
    return <div>No Data...</div>;
  }
};
