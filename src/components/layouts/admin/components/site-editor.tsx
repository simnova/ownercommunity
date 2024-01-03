import { UploadOutlined } from '@ant-design/icons';
import { Button, message } from "antd";
import axios from 'axios';

export interface AuthResult {
  isAuthorized: boolean;
  authHeader: string;
  blobName: string;
  requestDate: string;
}

export interface SiteEditorProp {
  authorizeRequest: (file:File) => Promise<AuthResult>
  blobPath: string;
}

export const SiteEditor:React.FC<SiteEditorProp> = (props) => {
  const customizeUpload =  async (file:File) : Promise<void> => {
    const result =  await props.authorizeRequest(file);
    console.log('result',JSON.stringify(result));
    if(result && result.isAuthorized) {
      const {authHeader,blobName,requestDate} = result;
      try {
        await axios.request({
          method: 'put',
          url: `${props.blobPath}/${blobName}`, 
          data: new Blob([file],{type:file.type}),
          headers: {
           // ...option.headers,
            "Authorization": authHeader,
            "x-ms-blob-type": "BlockBlob",
            "x-ms-version": "2021-04-10",
            "x-ms-date": requestDate,
            "Content-Type": file.type, 
          },
          onUploadProgress: () => {
           // const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
           // option.onProgress({percent:percentCompleted},option.file);
          }
        });
        
        message.success('Uploaded successfully');
      } catch (uploadError) {
        message.error('Upload failed : ' + JSON.stringify(uploadError));
      }
    } else {
    // not authorized - do nothing
    }
    //return option;
  }

  const handleUpload = async () => {
    let pageLayouts = localStorage.getItem('pageLayouts')
    if(pageLayouts) {
      var blob = new Blob([pageLayouts], {type: 'text/json'});
      var file = new File([blob], "pageLayouts.json", {type: 'text/json'});
      await customizeUpload(file);
    }
  }

  return(
    <Button onClick={handleUpload}>
      <UploadOutlined /> Save Site 
    </Button>
  )
}