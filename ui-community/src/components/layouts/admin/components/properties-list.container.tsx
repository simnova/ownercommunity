import { useQuery } from '@apollo/client';
import { AdminPropertiesListContainerPropertiesByCommunityIdDocument, AdminPropertiesListContainerPropertyFieldsFragment } from '../../../../generated';
import { ComponentQueryLoader } from '../../../ui/molecules/component-query-loader';
import { PropertiesList } from '../../shared/components/properties-list';

export const PropertiesListContainer: React.FC<any> = (props) => {
  const {
    data: propertyData,
    loading: propertyLoading,
    error: propertyError
  } = useQuery(AdminPropertiesListContainerPropertiesByCommunityIdDocument, {
    variables: { communityId: props.data.communityId }
  });

  return (
    <ComponentQueryLoader
      loading={propertyLoading}
      hasData={propertyData?.propertiesByCommunityId}
      hasDataComponent={propertyData?.propertiesByCommunityId && <PropertiesList data={propertyData?.propertiesByCommunityId as AdminPropertiesListContainerPropertyFieldsFragment[]} />}
      error={propertyError}
    />
  );
};
