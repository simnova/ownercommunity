import { useQuery } from '@apollo/client';
import { AdminCommunityDetailContainerCommunityDocument } from '../../../../generated';
import { ComponentQueryLoader } from '../../../ui/molecules/component-query-loader';
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

  return (
    <ComponentQueryLoader
      loading={communityLoading}
      hasData={communityData}
      hasDataComponent={<CommunityDetail data={communityData?.communityById} />}
      error={communityError}
    />
  );
  
};
