import { useQuery, useMutation } from '@apollo/client';
import {
  AdminSiteEditorFilesListContainerCommunityByIdDocument,
  FileInfo,
  AdminSiteEditorFilesListContainerCommunityPublicFileRemoveDocument
} from '../../../../generated';
import { SiteEditorFilesList } from './site-editor-files-list';
import { ComponentQueryLoader } from '../../../ui/molecules/component-query-loader';

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
