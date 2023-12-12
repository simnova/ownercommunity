import { UploadOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { AzureUpload, UploadButtonProps } from "../../../ui/molecules/azure-upload";
export type { AuthResult } from "../../../ui/molecules/azure-upload";

export const FileUploadButton:React.FC<UploadButtonProps> = (props) => {
  return(
    <AzureUpload
      data={{
        permittedContentTypes: props.permittedContentTypes,
        permittedExtensions: props.permittedExtensions,
        maxFileSizeBytes: props.maxFileSizeBytes,
        maxWidthOrHeight: props.maxWidthOrHeight,
        blobPath: props.blobPath,
      }}
      authorizeRequest={props.authorizeRequest}
      onInvalidContentType={props.onInvalidContentType ? props.onInvalidContentType : () => { message.error('Files of that content type are not permitted'); }}
      onInvalidContentLength={props.onInvalidContentLength ? props.onInvalidContentLength : () => { message.error('File size is too large'); }}
      onRemoveRequested={props.onRemoveRequested}
      onSuccess={props.onSuccess ? props.onSuccess : () => message.success("File uploaded successfully!")}
      onError={(error:any) => { message.error(`File did not upload, error: ${JSON.stringify(error)}`); }}
      uploadProps={{
        onChange:props.onChange
      }}
      maxFileCount={1}
    >
      <Button type="primary">
        <UploadOutlined /> Upload File
      </Button>
    </AzureUpload>
  )
}