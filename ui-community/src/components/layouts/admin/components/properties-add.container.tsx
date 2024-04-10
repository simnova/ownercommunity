import { useMutation } from '@apollo/client';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    AdminPropertiesAddContainerPropertyAddDocument,
    AdminPropertiesListContainerPropertiesDocument,
    PropertyAddInput
} from '../../../../generated';
import { PropertiesAdd } from './properties-add';

interface PropertiesAddContainerProps {
  data: { communityId: string };
}

export const PropertiesAddContainer: React.FC<PropertiesAddContainerProps> = (props) => {
  const navigate = useNavigate();
  const [propertyAdd] = useMutation(AdminPropertiesAddContainerPropertyAddDocument, {
    update(cache, { data }) {
      // update the list with the new item - necessary for root objects
      const newProperty = data?.propertyAdd.property;
      const properties = cache.readQuery({
        query: AdminPropertiesListContainerPropertiesDocument,
        variables: { communityId: props.data.communityId }
      })?.propertiesByCommunityId;
      if (newProperty && properties) {
        cache.writeQuery({
          query: AdminPropertiesListContainerPropertiesDocument,
          variables: { communityId: props.data.communityId },
          data: {
            propertiesByCommunityId: [...properties, newProperty]
          }
        });
      }
    }
  });

  const handleSave = async (values: PropertyAddInput) => {
    try {
      const newProperty = await propertyAdd({
        variables: {
          input: values
        }
      });
      if (newProperty.data?.propertyAdd.status.success) {
        message.success('Property Added');
        navigate(`../${newProperty.data?.propertyAdd.property?.id}`, { replace: true });
      } else {
        message.error(
          `Error adding Property: ${newProperty.data?.propertyAdd.status.errorMessage}`
        );
      }
    } catch (error) {
      message.error(`Error adding Property: ${JSON.stringify(error)}`);
    }
  };

  return <PropertiesAdd onSave={handleSave} />;
};
