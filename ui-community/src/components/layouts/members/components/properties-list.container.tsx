import { useQuery } from '@apollo/client';
import { MembersPropertiesListContainerPropertiesDocument } from '../../../../generated';
import { ComponentQueryLoader } from '../../../ui/molecules/component-query-loader';
import { PropertiesList } from '../../shared/components/properties-list';

export const PropertiesListContainer: React.FC<any> = (props) => {
  const {
    data: propertyData,
    loading: propertyLoading,
    error: propertyError
  } = useQuery(MembersPropertiesListContainerPropertiesDocument, {
    variables: { communityId: props.data.communityId }
  });

  return (
    <ComponentQueryLoader
      loading={propertyLoading}
      hasData={propertyData?.propertiesForCurrentUserByCommunityId}
      hasDataComponent={<PropertiesList data={propertyData?.propertiesForCurrentUserByCommunityId} />}
      error={propertyError}
    />
  );
};
