import { useMutation, useQuery } from '@apollo/client';
import {
    AdminSiteEditorFilesListContainerCommunityByIdDocument,
    AdminSiteEditorFilesListContainerCommunityPublicFileRemoveDocument,
    FileInfo
} from '../../../../generated';
import { ComponentQueryLoader } from '../../../ui/molecules/component-query-loader';
import { SiteEditorFilesList } from './site-editor-files-list';
import { useEffect } from 'react';

export const SiteEditorFilesListContainer: React.FC<any> = (props) => {
  const { uploadSuccess, resetUploadSuccess } = props;

  const {
    data: communityData,
    loading: communityLoading,
    error: communityError, refetch
  } = useQuery(AdminSiteEditorFilesListContainerCommunityByIdDocument, {
    variables: { id: props.data.communityId ?? '' }
  });

  const [communityPublicFileRemove] = useMutation(AdminSiteEditorFilesListContainerCommunityPublicFileRemoveDocument);

  useEffect(() => {
    if (uploadSuccess) {
      refetch(); 
      resetUploadSuccess();
    }
  }, [uploadSuccess, resetUploadSuccess, refetch]);

  return (
    <ComponentQueryLoader
      loading={communityLoading}
      hasData={communityData && communityData.communityById}
      hasDataComponent={
        <SiteEditorFilesList
          data={(communityData?.communityById?.files ?? []) as FileInfo[]}
          onRemove={(fileName: string) => {
            communityPublicFileRemove({
              variables: {
                input: { fileName: fileName, communityId: props.data.communityId }
              }
            });
          } } initialPageSize={10} initialCurrentPage={1}        />
      }
      error={communityError}
    />
  );
};
