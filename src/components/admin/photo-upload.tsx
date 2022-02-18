import React from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useMutation } from "@apollo/client";
import {PhotoUploadCreateAuthHeaderForProfilePhotoDocument} from '../../generated';
import axios from 'axios';

export const PhotoUpload:React.FC<any> = (props) => {

  const [createAuthHeaderForProfilePhoto] = useMutation(PhotoUploadCreateAuthHeaderForProfilePhotoDocument);

  const beforeUpload = async (file:File) => {
    const permittedContentTypes = ["image/jpeg", "image/png", "image/gif"];
    const isValidContentType = permittedContentTypes.includes(file.type);
    const isValidContentLenth = file.size < (1 *  1024 * 1024); // 10MB
    if (!isValidContentType) {
      message.error("You can only upload images");
    }
    if (!isValidContentLenth) {
      message.error("Image must be less than 10MB");
    }
    return  isValidContentType && isValidContentLenth ? true : Upload.LIST_IGNORE;    
  }

  const customizeUpload =  async (option:any) => {

    //https://github.com/react-component/upload/blob/master/src/interface.tsx
    //https://github.com/react-component/upload/issues/95
    
    const result = await createAuthHeaderForProfilePhoto({
      variables: {
        input: {
          contentType: option.file.type,
          contentLength: option.file.size
        }
      }
    });

    if(result.data && result.data.createAuthHeaderForProfilePhoto && result.data.createAuthHeaderForProfilePhoto.success === true) {
      const {authHeader,blobName,requestDate} = result.data.createAuthHeaderForProfilePhoto;
      try {
        var response = await axios.request({
          method: 'put',
          url: `https://sharethrift.blob.core.windows.net/featureflags/${blobName}`, 
          data: new Blob([option.file],{type:option.file.type}),
          headers: {
            ...option.headers,
            "Authorization": authHeader,
            "x-ms-blob-type": "BlockBlob",
            "x-ms-version": "2021-04-10",
            "x-ms-date": requestDate,
            "Content-Type": option.file.type, 
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            option.onProgress({percent:percentCompleted},option.file);
          }
        });
        option.onSuccess(response,option.file);
        message.success(`${option.file.name} uploaded successfully.`);
      } catch (uploadError) {
        message.error(`${option.file.name} upload failed. details: ${JSON.stringify(uploadError)}`);
        option.onError(uploadError,option.file);
      }
    } else {
    // option.onError((error:Object) =>  "error");
    }
    return option;
  }


  return (
    <Upload
      accept='.png, .jpg, .jpeg, .gif'
      customRequest = {customizeUpload}
      beforeUpload={beforeUpload}
    
      progress={{
        strokeColor: {
          '0%': '#108ee9',
          '100%': '#87d068',
        },
        strokeWidth: 3,
        format: percent => percent?`${parseFloat(percent.toFixed(2))}%`:''
      }}
    >
      {props.children}
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
}