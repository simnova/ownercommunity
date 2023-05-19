import { useQuery } from '@apollo/client';
import { AdminPropertiesListContainerPropertiesDocument } from '../../../../generated';
import { PropertiesList } from '../../shared/components/properties-list';
import { ComponentQueryLoader } from '../../../ui/molecules/component-query-loader';

export const PropertiesListContainer: React.FC<any> = (props) => {
  const {
    data: propertyData,
    loading: propertyLoading,
    error: propertyError
  } = useQuery(AdminPropertiesListContainerPropertiesDocument, {
    variables: { communityId: props.data.communityId }
  });

  return (
    <ComponentQueryLoader
      loading={propertyLoading}
      hasData={propertyData && propertyData.propertiesByCommunityId}
      hasDataComponent={<PropertiesList data={propertyData?.propertiesByCommunityId} />}
      error={propertyError}
    />
  );
};
