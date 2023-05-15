import { AzureUpload, UploadButtonProps } from "../../../ui/molecules/azure-upload";
import { Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
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
      onInvalidContentType={() => { message.error('Only PDF files are permitted'); }}
      onInvalidContentLength={() => { message.error('File size is too large'); }}
      onRemoveRequested={props.onRemoveRequested}
      onSuccess={props.onSuccess ? props.onSuccess : () => message.success("File uploaded successfully!")}
      onError={(file:File,error:any) => { message.error(`File did not upload, error: ${JSON.stringify(error)}`); }}
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