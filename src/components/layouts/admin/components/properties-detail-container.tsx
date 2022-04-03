import { useMutation, useQuery } from '@apollo/client';
import { AdminPropertiesDetailContainerPropertyDocument, AdminPropertiesDetailContainerPropertyUpdateDocument, PropertyUpdateInput } from '../../../../generated';
import { PropertiesDetail} from './properties-detail';
import PropTypes  from 'prop-types';
import { message,Skeleton } from 'antd';

const ComponentPropTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired
  }),
}

interface ComponentPropInterface {
  data: {
    id: string;
  }
}

export type PropertiesDetailContainerPropTypes = PropTypes.InferProps<typeof ComponentPropTypes> & ComponentPropInterface;

export const PropertiesDetailContainer: React.FC<PropertiesDetailContainerPropTypes> = (props) => {
  const [updateProperty] = useMutation(AdminPropertiesDetailContainerPropertyUpdateDocument);  
  const { data: propertyData, loading: propertyLoading, error: propertyError } = useQuery(AdminPropertiesDetailContainerPropertyDocument,{
      variables: {
        id: props.data.id
      }
    });

  const handleSave = async (values: PropertyUpdateInput) => {
    try {
      await updateProperty({
        variables: {
          input:values
        },
      });
      message.success("Saved");
    } catch (error) {
      message.error(`Error updating Property: ${JSON.stringify(error)}`);
    }
  }

  const content = () => {
    if(propertyLoading ) {
      return <div><Skeleton active /></div>
    } else if( propertyError ) {
      return <div>{JSON.stringify(propertyError  )}</div>
    } else if(propertyData && propertyData.property ) {
      var detailData = {
        property: propertyData.property
      }
      return <PropertiesDetail data={detailData} onSave={handleSave} />
    } else {
      return <div>No data</div>
    }
  }

  return <>
    {content()}
  </>
  
}