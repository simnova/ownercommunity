import { UploadOutlined } from '@ant-design/icons';
import { Button, UploadProps, message } from 'antd';
import { AzureUpload, UploadButtonProps } from '../../../ui/molecules/azure-upload';
export type { AuthResult } from '../../../ui/molecules/azure-upload';

interface ComponentProp {
  shape?: string;
  uploadProps?: UploadProps;
}

type ImageUploadButtonProps = UploadButtonProps & ComponentProp;

export const ImageUploadButton: React.FC<ImageUploadButtonProps> = (props) => {
  return (
    <AzureUpload
      data={{
        permittedContentTypes: props.permittedContentTypes ? props.permittedContentTypes : ['image/jpeg', 'image/png', 'image/gif'],
        permittedExtensions: props.permittedExtensions ? props.permittedExtensions : ['jpg', 'jpeg', 'png', 'gif'],
        maxFileSizeBytes: props.maxFileSizeBytes,
        maxWidthOrHeight: props.maxWidthOrHeight,
        blobPath: props.blobPath
      }}
      authorizeRequest={props.authorizeRequest}
      onInvalidContentType={props.onInvalidContentType ? props.onInvalidContentType : () => message.error('Only images are permitted')}
      onInvalidContentLength={props.onInvalidContentLength ? props.onInvalidContentLength : () => message.error('File size is too large')}
      onRemoveRequested={props.onRemoveRequested}
      onSuccess={props.onSuccess ? props.onSuccess : message.success('File uploaded successfully!')}
      onError={(error: any) => {
        message.error(`File did not upload, error: ${JSON.stringify(error)}`);
      }}
      cropperProps={{
        shape: props.shape ?? 'rect',
        rotate: true
        //TODO: Use this to set aspect ration for photograph. MaxWidthOrHeight will be set to largest width or height in conjunction with this will resolve 2.5x3.5
      }}
      uploadProps={{
        onChange: props.onChange
      }}
      maxFileCount={1}
    >
      {props.button ?? (
        <Button type="primary">
          <UploadOutlined /> Upload Image
        </Button>
      )}
    </AzureUpload>
  );
};
