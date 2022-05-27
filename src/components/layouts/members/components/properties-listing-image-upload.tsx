import React from 'react';
import { message, Button,  } from 'antd';
import { AuthResult, AzureUpload } from '../../../ui/molecules/azure-upload';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import type { RcFile, UploadProps } from 'antd/es/upload';

export interface PropertiesListingImageUploadProps {
  authorizeRequest: (file:File) => Promise<AuthResult>
  blobPath: string
  fileList: UploadFile[]
  onChange?: (fileList:UploadFile[]) => void
  onFileAdded?: (file:UploadFile) => void
}

export const PropertiesListingImageUpload: React.FC<PropertiesListingImageUploadProps> = (props) => {

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    props.onChange && props.onChange(newFileList);
  }
 
  return (<>
    <AzureUpload 
      data={{
        permittedContentTypes: [
          'image/jpeg',
          'image/png',
          'image/gif',
        ],
        permittedExtensions: [
          'jpg', 'jpeg', 'png', 'gif',
        ],
        maxFileSizeBytes: (1 *  1024 * 1024), // 1MB,
        maxWidthOrHeight: 2048,
        blobPath: props.blobPath,
      
      }}
      authorizeRequest={props.authorizeRequest}
      onInvalidContentType={() => { message.error('Only images are permitted'); }}
      onInvalidContentLength={() => { message.error('File size is too large'); }}
      onRemoveRequested={ async (file) => {
        /*
        if(props.onChange && file){
          console.log('removing file', file);
          var updatedList = props.fileList.filter(f => f.uid !== file.uid);
          props.onChange(updatedList);
        }
        */
        return true;
      }}
      onSuccess={(file) => { 
        message.success('File uploaded successfully'); 
        if(props.onFileAdded){
          props.onFileAdded(file);
        }
      }}
      onError={(_file:File,error:any) => { message.error(`File did not upload, error: ${JSON.stringify(error)}`); }}
      
      uploadProps={{
        fileList: props.fileList,
        onChange: handleChange,
        listType:"picture-card"
      }}
    >
      {props.fileList.length >= 5 ? null : (
      <div>
        <PlusOutlined /> <br/> Upload
      </div>
      )}
    </AzureUpload>
  </>);
}