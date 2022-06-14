import { useMutation, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { AddressInput, AddressLocationUpdateContainerDocument, PropertyUpdateInput, PropertiesLocationContainerPropertyDocument } from '../../../../generated';
import { PropertiesLocation } from './properties-location';
import { Skeleton, message } from 'antd';

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

export type PropertiesLocationContainerPropTypes = PropTypes.InferProps<typeof ComponentPropTypes> & 
  ComponentPropInterface;

export const PropertiesLocationContainer: React.FC<PropertiesLocationContainerPropTypes> = (props) => {
  const params = useParams();
  const [updateAddress] = useMutation(AddressLocationUpdateContainerDocument);

  const {
    data: propertyData,
    loading: propertyLoading,
    error: propertyError
  } = useQuery(PropertiesLocationContainerPropertyDocument, {
    variables: {
      propertyId: params.id
    }
  });

    
  const handleSave = async (values: PropertyUpdateInput) => {
    try {
      
      var result = await updateAddress({
        variables: {
          input: values
        },
      });
      if(result.data?.propertyUpdate.status.success){
        console.log(result)
        message.success("Saved");
      }else {
        message.error(`Error updating Member: ${result.data?.propertyUpdate.status.errorMessage}`);
      }
    } catch (error) {
      message.error(`Error updating Member: ${JSON.stringify(error)}`);
    }
  }


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
        console.log(propertyData)
        return <PropertiesLocation data={propertyData} onSave={handleSave} />;
      } else {
        return <div>No data</div>;
      }
    };


  return <>
    {content()}
  </>
}


