
import { AuthResult } from '../../../ui/molecules/azure-upload';
import { FileUploadButton } from '../../shared/components/file-upload-button';

export interface SiteEditorFilesUploadProps {
  authorizeRequest: (file:File) => Promise<AuthResult>
  blobPath: string
}

export const SiteEditorFilesUpload: React.FC<SiteEditorFilesUploadProps> = (props) => {
 
  return (
    <FileUploadButton 
      authorizeRequest={props.authorizeRequest}
      blobPath={props.blobPath}
      onRemoveRequested={ () => { throw new Error('Not implemented');
        // props.onRemoveRequested
      }}
      permittedContentTypes={[
        'image/jpeg',
        'image/png',
        'image/gif',
        'text/plain',
        'text/csv',
        'application/json',
        'application/pdf'
      ]}
      permittedExtensions={[
        'jpg', 'jpeg', 'png', 'gif',
        'txt', 'csv', 'json', 'pdf'
      ]}
      maxFileSizeBytes={10 *  1024 * 1024} // 10MB,
      maxWidthOrHeight={2048}
    />
  )
}