import { useMutation, useQuery } from '@apollo/client';
import {
    AdminSiteEditorFilesListContainerCommunityByIdDocument,
    AdminSiteEditorFilesListContainerCommunityPublicFileRemoveDocument,
    FileInfo
} from '../../../../generated';
import { ComponentQueryLoader } from '../../../ui/molecules/component-query-loader';
import { SiteEditorFilesList } from './site-editor-files-list';

export const SiteEditorFilesListContainer: React.FC<any> = (props) => {
  const {
    data: communityData,
    loading: communityLoading,
    error: communityError
  } = useQuery(AdminSiteEditorFilesListContainerCommunityByIdDocument, {
    variables: { id: props.data.communityId ?? '' }
  });

  const [communityPublicFileRemove] = useMutation(AdminSiteEditorFilesListContainerCommunityPublicFileRemoveDocument);

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
          }}
        />
      }
      error={communityError}
    />
  );
};
