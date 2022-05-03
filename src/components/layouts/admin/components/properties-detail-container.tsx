import { useMutation, useQuery } from '@apollo/client';
import { AdminPropertiesListContainerPropertiesDocument,AdminPropertiesDetailContainerPropertyDeleteDocument, AdminPropertiesDetailContainerMembersDocument, AdminPropertiesDetailContainerPropertyDocument, AdminPropertiesDetailContainerPropertyUpdateDocument, PropertyUpdateInput } from '../../../../generated';
import { PropertiesDetail} from './properties-detail';
import PropTypes  from 'prop-types';
import { message,Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';

const ComponentPropTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    communityId: PropTypes.string.isRequired
  }),
}

interface ComponentPropInterface {
  data: {
    id: string;
    communityId: string;
  }
}

export type PropertiesDetailContainerPropTypes = PropTypes.InferProps<typeof ComponentPropTypes> & ComponentPropInterface;

export const PropertiesDetailContainer: React.FC<PropertiesDetailContainerPropTypes> = (props) => {
  const navigate = useNavigate();
  const [updateProperty] = useMutation(AdminPropertiesDetailContainerPropertyUpdateDocument);  
  const [deleteProperty] = useMutation(AdminPropertiesDetailContainerPropertyDeleteDocument,{
    update(cache, { data }) { // update the list by removing the deleted item - necessary for root objects
      const deletedProperty = data?.propertyDelete.property;
      const properties = cache.readQuery({ query: AdminPropertiesListContainerPropertiesDocument,  variables: {communityId: props.data.communityId} })?.propertiesByCommunityId;
      if(deletedProperty && properties) {
        cache.writeQuery({
          query: AdminPropertiesListContainerPropertiesDocument,
          variables: {communityId: props.data.communityId},
          data: {
            propertiesByCommunityId: properties?.filter(property =>  property?.id !== deletedProperty.id)
          }
        })
      }
    }
  });

  const { data: memberData, loading: memberLoading, error: memberError } = useQuery(AdminPropertiesDetailContainerMembersDocument);

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
  const handleDelete = async () => {
    try {
      await deleteProperty({
        variables: {
          input:{
            id: props.data.id
          }
        },
      });
      message.success("Deleted");
      navigate('../../');
    } catch (error) {
      message.error(`Error deleting Property: ${JSON.stringify(error)}`);
    }
  }
    
  const content = () => {
    if(propertyLoading || memberLoading) { 
      return <div><Skeleton active /></div>
    } else if( propertyError || memberError ) {
      return <div>{JSON.stringify(propertyError  || memberError )}</div>
    } else if(propertyData && propertyData.property && memberData?.members ) {
      var detailData = {
        property: propertyData.property,
        members: memberData.members
      }
      return <PropertiesDetail data={detailData} onSave={handleSave} onDelete={handleDelete} />
    } else {
      return <div>No data</div>
    }
  }

  return <>
    {content()}
  </>
  
}