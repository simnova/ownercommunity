import { useQuery } from '@apollo/client';
import { Community, CommunityListContainerCommunitiesQueryDocument } from '../../../../generated';
import { CommunityList } from './community-list';
import { ComponentQueryLoader } from '../../../ui/molecules/component-query-loader';

export const CommunityListContainer: React.FC<any> = () => {
  const { loading, error, data } = useQuery(CommunityListContainerCommunitiesQueryDocument);

  return (
    <ComponentQueryLoader
      loading={loading}
      hasData={data?.communities}
      hasDataComponent={<CommunityList data={{ communities: data?.communities as Community[] }} />}
      noDataComponent={<div>No Data...</div>}
      error={error}
      errorComponent={<div>Error :( {JSON.stringify(error)}</div>}
    />
  );
};
