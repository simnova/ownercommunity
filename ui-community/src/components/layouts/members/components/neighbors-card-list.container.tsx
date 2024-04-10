
import { useQuery } from '@apollo/client';
import { MemberSiteNeighborsListContainerDocument } from '../../../../generated';
import { NeighborsCardList } from './neighbors-card-list';
import { ComponentQueryLoader } from '../../../ui/molecules/component-query-loader';

interface NeighborsCardListContainerProps {
  data: {
    communityId: string;
  };
}

export const NeighborsCardListContainer: React.FC<NeighborsCardListContainerProps> = (props) => {
  const {
    data: memberData,
    loading: memberLoading,
    error: memberError
  } = useQuery(MemberSiteNeighborsListContainerDocument, {
    variables: { communityId: props.data.communityId }
  });

  return (
    <ComponentQueryLoader
      loading={memberLoading}
      hasData={memberData}
      hasDataComponent={<NeighborsCardList data={memberData?.membersByCommunityId} />}
      error={memberError}
    />
  );
};
