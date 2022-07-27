import { useQuery } from '@apollo/client';
import { Typography, Skeleton } from 'antd';
import { AdminCommunityDetailContainerCommunityDocument } from '../../../../generated';
import { CommunityDetail } from './community-detail';

// add community name on home screen
export const CommunityDetailContainer: React.FC<any> = (props) => {
  const {
    data: communityData,
    loading: communityLoading,
    error: communityError
  } = useQuery(AdminCommunityDetailContainerCommunityDocument, {
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
    return <CommunityDetail data={communityData.communityById} />;
  } else {
    return <div>No Data...</div>;
  }
};
