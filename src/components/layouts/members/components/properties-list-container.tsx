import { useQuery } from '@apollo/client';
import { MembersPropertiesListContainerPropertiesDocument } from '../../../../generated';
import { PropertiesList} from './properties-list';
import { Skeleton } from 'antd';

export const PropertiesListContainer: React.FC<any> = (props) => {
  const { data: propertyData, loading: propertyLoading, error: propertyError } = useQuery(MembersPropertiesListContainerPropertiesDocument,
    {
      variables: {communityId: props.data.communityId}
    }
  );

  if(propertyLoading) {
    return <div><Skeleton active /></div>
  }
  if(propertyError) {
    return <div>{JSON.stringify(propertyError)}</div>
  }
  if(propertyData && propertyData.propertiesForCurrentUserByCommunityId) {
    return <PropertiesList data={propertyData.propertiesForCurrentUserByCommunityId} />
  } else {
    return <div>No Data...</div>
  }
}