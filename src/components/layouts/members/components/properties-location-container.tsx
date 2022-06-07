import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { SasTokenDocument } from '../../../../generated';
import { PropertiesLocation } from './properties-location';
import { Skeleton } from 'antd';

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
  console.log(params);

  const {
    data: propertyData,
    loading: propertyLoading,
    error: propertyError
  } = useQuery(SasTokenDocument, {
    variables: {
      propertyId: params.id
    }
  });



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
        return <PropertiesLocation data={propertyData}  />;
      } else {
        return <div>No data</div>;
      }
    };
  

  return <>
    {content()}
  </>
}


