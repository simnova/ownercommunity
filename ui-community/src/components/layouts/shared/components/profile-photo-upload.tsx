import { message } from "antd";
import { AuthResult } from '../../../ui/molecules/azure-upload';
import { ImageUploadButton } from "../../shared/components/image-upload-button";
export type { AuthResult } from "../../../ui/molecules/azure-upload";

export interface ComponentProp {
  authorizeRequest: (file:File) => Promise<AuthResult>
  blobPath: string
  onChange?: (value:object) => void
  onRemoveRequested?: () => Promise<boolean>
}

export const ProfilePhotoUpload:React.FC<ComponentProp> = (props) => {
  return(
    <ImageUploadButton
      authorizeRequest={props.authorizeRequest}
      blobPath={props.blobPath}
      onChange={props.onChange}
      onRemoveRequested={props.onRemoveRequested}
      onSuccess={() => { message.success('File uploaded successfully'); }}
      maxFileSizeBytes={.1 *  1024 * 1024} // .1MB,
      shape="round"
      maxWidthOrHeight={1024}
    />
  )
}