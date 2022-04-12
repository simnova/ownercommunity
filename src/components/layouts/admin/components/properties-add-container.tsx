import { useMutation } from '@apollo/client';
import { AdminPropertiesAddContainerPropertyAddDocument, AdminPropertiesListContainerPropertiesDocument,  PropertyAddInput } from '../../../../generated';
import { message } from 'antd';
import { PropertiesAdd } from './properties-add';
import { useNavigate } from 'react-router-dom';

export const PropertiesAddContainer: React.FC<any> = (props) => {
  const navigate = useNavigate();
  const [propertyAdd] = useMutation(AdminPropertiesAddContainerPropertyAddDocument,{
    update(cache, { data }) { // update the list with the new item - necessary for root objects
      const newProperty = data?.propertyAdd.property;
      const properties = cache.readQuery({ query: AdminPropertiesListContainerPropertiesDocument })?.properties;
      if(newProperty && properties) {
        cache.writeQuery({
          query: AdminPropertiesListContainerPropertiesDocument,
          data: {
            properties: [...properties, newProperty]
          }
        })
      }
    }
  });  

  const handleSave = async (values: PropertyAddInput) => {
    try {
      var newProperty = await propertyAdd({
        variables: {
          input: values
        }      
      });
      if(newProperty.data?.propertyAdd.status.success) {
        message.success("Property Added");
        navigate(`../${newProperty.data?.propertyAdd.property?.id}`, { replace: true });
      } else {
        message.error(`Error adding Property: ${newProperty.data?.propertyAdd.status.errorMessage}`);
      }
    } catch (error) {
      message.error(`Error adding Property: ${JSON.stringify(error)}`);
    }
  }

  return <PropertiesAdd onSave={handleSave} />
}