import { useMutation } from '@apollo/client';
import { FC, useState } from 'react';
import {
  SharedPropertiesListingImageListContainerPropertyListingImageRemoveDocument
} from '../../../../generated';
import { ComponentQueryLoader } from '../../../ui/molecules/component-query-loader';
import { PropertiesListingImageList } from './properties-listing-image-list';
import { useParams } from 'react-router-dom';

interface PropertiesListingImageListContainerProps {
  data: {
    propertyId: string;
    images?: (string | null)[];
  };
}

export const PropertiesListingImageListContainer: FC<PropertiesListingImageListContainerProps> = (props) => {
  const memberId = useParams().memberId ?? '';
  const [image, setImage] = useState<string | undefined>(undefined);
  const [propertyListingImageRemove] = useMutation(
    SharedPropertiesListingImageListContainerPropertyListingImageRemoveDocument
  );


  const handleRemoveImage = async () => {
    const blobName: string =
      props.data.images?.find((imageBlobName) => {
        if (imageBlobName !== null && image?.includes(imageBlobName)) {
          return imageBlobName;
        }
      }) ?? '';
      console.log('blobName', blobName)
    const result = await propertyListingImageRemove({
      variables: {
        input: {
          propertyId: props.data.propertyId,
          memberId: memberId,
          blobName: blobName
        }
      }
    });
    if (result.data) {
      setImage(undefined);
      return result.data?.propertyListingImageRemove.status.success;
    }
    return false;
  };

  return (
    <ComponentQueryLoader
      loading={false}
      hasData={true}
      hasDataComponent={
        <PropertiesListingImageList
          data={{ images: props?.data?.images ?? [], memberId: memberId }}
          image={image}
          setImage={setImage}
          handleRemoveImage={handleRemoveImage}
        />
      }
    />
  );
};
