import { useQuery } from '@apollo/client';
import { MembersPropertiesListContainerPropertiesDocument, MembersPropertiesListContainerPropertyFieldsFragment } from '../../../../generated';
import { ComponentQueryLoader } from '../../../ui/molecules/component-query-loader';
import { PropertiesList } from '../../shared/components/properties-list';

export const PropertiesListContainer: React.FC<any> = (props) => {
  const {
    data: propertyData,
    loading: propertyLoading,
    error: propertyError
  } = useQuery(MembersPropertiesListContainerPropertiesDocument, {
    variables: { id: props.data.memberId }
  });

  return (
    <ComponentQueryLoader
      loading={propertyLoading}
      hasData={propertyData?.propertiesByOwnerId}
      hasDataComponent={<PropertiesList data={propertyData?.propertiesByOwnerId as MembersPropertiesListContainerPropertyFieldsFragment[]} />}
      error={propertyError}
    />
  );
};
