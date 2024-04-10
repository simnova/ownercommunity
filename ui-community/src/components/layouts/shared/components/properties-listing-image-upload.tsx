import { PlusOutlined } from '@ant-design/icons';
import { message } from 'antd';
import type { UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

import { AuthResult } from '../../../ui/molecules/azure-upload';
import { ImageUploadButton } from './image-upload-button';

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

  const handleSuccess = (file: UploadFile) => {
    message.success('File uploaded successfully'); 
    if(props.onFileAdded){
      props.onFileAdded(file);
    }
  }
 
  return (
    <ImageUploadButton
      authorizeRequest={props.authorizeRequest}
      blobPath={props.blobPath}
      onChange={(value) => { if (props.onChange) props.onChange(value) }}
      onRemoveRequested={async () => true}
      permittedContentTypes={[
        'image/jpeg',
        'image/png',
        'image/gif',
      ]}
      permittedExtensions={[
        'jpg', 'jpeg', 'png', 'gif',
      ]}
      maxFileSizeBytes={1024 * 1024} // 1MB,
      maxWidthOrHeight={2048}
      onSuccess={handleSuccess}
      uploadProps={{
        fileList: props.fileList,
        onChange: handleChange,
        listType:"picture-card"
      }}
      button={
        props.fileList.length >= 5 ? null : (
          <div>
            <PlusOutlined /> <br/> Upload
          </div>
        )
      }
    />
  );
}