import React from 'react';
import { message, Button } from 'antd';
import { AuthResult, AzureUpload } from '../../../ui/molecules/azure-upload';
import { UploadOutlined } from '@ant-design/icons';

export interface SiteEditorFilesUploadProps {
  authorizeRequest: (file:File) => Promise<AuthResult>
  blobPath: string
}

export const SiteEditorFilesUpload: React.FC<SiteEditorFilesUploadProps> = (props) => {
 
  return (<>
    <AzureUpload 
      data={{
        permittedContentTypes: [
          'image/jpeg',
          'image/png',
          'image/gif',
          'text/plain',
          'text/csv',
          'application/json',
          'application/pdf'
        ],
        permittedExtensions: [
          'jpg', 'jpeg', 'png', 'gif',
          'txt', 'csv', 'json', 'pdf'
        ],
        maxFileSizeBytes: (10 *  1024 * 1024), // 10MB,
        maxWidthOrHeight: 2048,
        blobPath: props.blobPath,

      }}
      authorizeRequest={props.authorizeRequest}
      onInvalidContentType={() => { message.error('Only images, pdfs, or CSVs are permitted'); }}
      onInvalidContentLength={() => { message.error('File size is too large'); }}
      onRemoveRequested={ () => { throw new Error('Not implemented');
        // props.onRemoveRequested
      }}
      onSuccess={() => { message.success('File uploaded successfully'); }}
      onError={(_file:File,error:any) => { message.error(`File did not upload, error: ${JSON.stringify(error)}`); }}
      
      uploadProps={{
        //onChange:props.onChange
      }}
    
      >
      <Button>
        <UploadOutlined /> Click to Upload
      </Button>
    </AzureUpload>
      
  </>)

}