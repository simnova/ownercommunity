import React from 'react';
import { AuthResult } from './profile-photo-upload';
import { AdminSiteEditorFilesUploadContainerCommunityPublicFileCreateAuthHeaderDocument } from '../../../../generated';
import { useMutation } from '@apollo/client';
import { SiteEditorFilesUpload } from './site-editor-files-upload';

export interface SiteEditorFilesUploadContainerProps {
  data : {
    communityId: string;
  }
}

export const SiteEditorFilesUploadContainer: React.FC<SiteEditorFilesUploadContainerProps> = (props) => {
  const [communityPublicFileCreateAuthHeader] = useMutation(AdminSiteEditorFilesUploadContainerCommunityPublicFileCreateAuthHeaderDocument);

  const handleAuthorizeRequest = async (file:File): Promise<AuthResult>  => {
    const result = await communityPublicFileCreateAuthHeader({
      variables: {
        input: {
          communityId: props.data.communityId,
          fileName: file.name,
          contentType: file.type,
          contentLength: file.size
        }
      }
    });
    return result.data ? (({...result.data.communityPublicFileCreateAuthHeader, ...{isAuthorized:true}})as AuthResult):{isAuthorized:false} as AuthResult;
  }

  return (
    <SiteEditorFilesUpload
      authorizeRequest={handleAuthorizeRequest}
      blobPath={`https://ownercommunity.blob.core.windows.net/${props.data.communityId}`}
    />
  )

}