import { useMutation, useQuery } from '@apollo/client';
import { FC, useState } from 'react';
import { LocalSettingsKeys } from '../../../../constants';
import {
    SharedPropertiesListingImageListContainerMemberForUserDocument,
    SharedPropertiesListingImageListContainerPropertyListingImageRemoveMutationDocument
} from '../../../../generated';
import { ComponentQueryLoader } from '../../../ui/molecules/component-query-loader';
import { PropertiesListingImageList } from './properties-listing-image-list';

interface PropertiesListingImageListContainerProps {
  data: {
    propertyId: string;
    images?: (string | null)[];
  };
}

export const PropertiesListingImageListContainer: FC<PropertiesListingImageListContainerProps> = (props) => {
  const userId = localStorage.getItem(LocalSettingsKeys.UserId);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [propertyListingImageRemove] = useMutation(
    SharedPropertiesListingImageListContainerPropertyListingImageRemoveMutationDocument
  );
  const { loading, error, data } = useQuery(SharedPropertiesListingImageListContainerMemberForUserDocument, {
    variables: {
      userId: userId
    }
  });

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
          memberId: data?.memberForUser?.id,
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
      loading={loading}
      hasData={data?.memberForUser}
      hasDataComponent={
        <PropertiesListingImageList
          data={{ images: props?.data?.images ?? [], memberId: data?.memberForUser?.id }}
          image={image}
          setImage={setImage}
          handleRemoveImage={handleRemoveImage}
        />
      }
      error={error}
    />
  );
};
