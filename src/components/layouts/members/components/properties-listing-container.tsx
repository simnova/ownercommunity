import { useMutation, useQuery } from '@apollo/client';
import {
  MembersPropertiesListContainerPropertiesDocument,
  MembersPropertiesListingContainerPropertyDocument,
  MembersPropertiesListingContainerPropertyUpdateDocument,
  PropertyUpdateInput
} from '../../../../generated';
import { PropertiesListing } from './properties-listing';
import PropTypes from 'prop-types';
import { message, Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [updateProperty] = useMutation(MembersPropertiesListingContainerPropertyUpdateDocument);

  const {
    data: propertyData,
    loading: propertyLoading,
    error: propertyError
  } = useQuery(MembersPropertiesListingContainerPropertyDocument, {
    variables: {
      id: props.data.id
    }
  });

  function stripTypenames(obj: any, propToDelete: string) {
    for (const property in obj) {
      if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
        delete obj.property;
        const newData = stripTypenames(obj[property], propToDelete);
        obj[property] = newData;
      } else {
        if (property === propToDelete) {
          delete obj[property];
        }
      }
    }
    return obj;
  }

  function stripTypename<T>(input: T) {
    const newish = { ...input };

    for (const prop in newish) {
      if (prop === '__typename') {
        delete newish[prop];
      } else if (newish[prop] === null) { 
        //do nothing
      } else if (Array.isArray(newish[prop])) {
        for (const next in newish[prop]) {
          newish[prop][next] = stripTypename(newish[prop][next]);
        }
      } else if (typeof newish[prop] === 'object') {
        newish[prop] = stripTypename(newish[prop]);
      }
    }

    return newish;
  }

  const handleSave = async (values: PropertyUpdateInput) => {
    let original = values;
    let stripped = stripTypenames(values, '__typename');
    console.log(original,stripped);
    try {
      await updateProperty({
        variables: {
          input: stripped
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
    } else if (propertyError ) {
      return <div>{JSON.stringify(propertyError)}</div>;
    } else if (propertyData && propertyData.property) {
      var detailData = {
        property: propertyData.property
      };
      return <PropertiesListing data={detailData} onSave={handleSave}  />;
    } else {
      return <div>No data</div>;
    }
  };

  return <>{content()}</>;
};
