import { useMutation, useQuery } from '@apollo/client';
import { Skeleton, message } from 'antd';
import PropTypes from 'prop-types';
import {
  PropertyUpdateInput, SharedPropertiesListingContainerPropertyDocument, SharedPropertiesListingContainerPropertyUpdateDocument
} from '../../../../generated';
import { PropertiesListing } from './properties-listing';

const ComponentPropTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    communityId: PropTypes.string.isRequired
  })
};

interface ComponentPropInterface {
  data: {
    id: string;
    communityId: string;
  };
}

export type PropertiesListingContainerPropTypes = PropTypes.InferProps<typeof ComponentPropTypes> &
  ComponentPropInterface;

export const PropertiesListingContainer: React.FC<PropertiesListingContainerPropTypes> = (props) => {
  const [updateProperty] = useMutation(SharedPropertiesListingContainerPropertyUpdateDocument);

  const {
    data: propertyData,
    loading: propertyLoading,
    error: propertyError
  } = useQuery(SharedPropertiesListingContainerPropertyDocument, {
    variables: {
      id: props.data.id
    }
  });



  const handleSave = async (values: PropertyUpdateInput) => {
    try {
      await updateProperty({
        variables: {
          input: values
        }
      });
      message.success('Saved');
    } catch (error) {
      message.error(`Error updating Property Listing: ${JSON.stringify(error)}`);
    }
  };

  const content = () => {
    if (propertyLoading) {
      return (
        <div>
          <Skeleton active />
        </div>
      );
    } else if (propertyError) {
      return <div>{JSON.stringify(propertyError)}</div>;
    } else if (propertyData?.property) {
      const detailData = {
        property: propertyData.property,
        communityId: props.data.communityId
      };
      return <PropertiesListing data={detailData} onSave={handleSave} />;
    } else {
      return <div>No data</div>;
    }
  };

  return <>{content()}</>;
};
