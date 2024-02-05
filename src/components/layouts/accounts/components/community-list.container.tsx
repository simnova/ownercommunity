import { useQuery } from '@apollo/client';
import { Community, CommunityListContainerCommunitiesQueryDocument } from '../../../../generated';
import { CommunityList } from './community-list';
import { ComponentQueryLoader } from '../../../ui/molecules/component-query-loader';

export const CommunityListContainer: React.FC<any> = () => {
  const { loading, error, data } = useQuery(CommunityListContainerCommunitiesQueryDocument);

  return (
    <div>
      <CommunityList data={{communities: data.communities as Community[]}} />
    </div>
  )
  
}
