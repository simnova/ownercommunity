import React, {useState, useEffect} from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useMutation } from "@apollo/client";
import {PhotoUploadCreateAuthHeaderForProfilePhotoDocument} from '../../generated';
import axios from 'axios';
import { fileURLToPath } from "url";

//var {RcFile} = UploadProps.RcFile;

export const PhotoUpload:React.FC<any> = (props) => {
  //const { onChange } = props;
  const [createAuthHeaderForProfilePhoto, { data, loading, error }] = useMutation(PhotoUploadCreateAuthHeaderForProfilePhotoDocument);
  /*
  const [blobName,setBlobName] = useState('');
  const [contentType,setContentType] = useState('');
  const [contentLength,setContentLength] = useState(0);
  const [authHeader,setAuthHeader] = useState('');
  const [requestDate,setRequstDate] = useState('');

  useEffect(() => {
    if (data && data.createAuthHeaderForProfilePhoto) {
      setBlobName(data.createAuthHeaderForProfilePhoto.blobName??'');
      setAuthHeader(data.createAuthHeaderForProfilePhoto.authHeader??'');
      setRequstDate(data.createAuthHeaderForProfilePhoto.requestDate??'');
    }
  }, [data]);

  */


  const beforeUpload = async (file:File) => {
//    setContentType(file.type);
//    setContentLength(file.size);
    const permittedContentTypes = ["image/jpeg", "image/png", "image/gif"];
    if (permittedContentTypes.includes(file.type) && file.size < 10 * 1024 * 1024) {

      message.success(`${file.name} is valid.`);
      return true;
    } else {
      alert("File must be an image, less than 10MB in size, and of a permitted type.");
      return false;
    }
  }
  const customizeUpload =  async (option:any) => {

    //https://github.com/react-component/upload/blob/master/src/interface.tsx
    
    //debugger;
  

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
            console.log(percentCompleted);
            //option.onProgress((event:any)=> event.percent = percentCompleted);
            option.onProgress({percent:percentCompleted},option.file);
          }
        });
        option.onSuccess(response,option.file);
        message.success(`${option.file.name} uploaded successfully.`);
      } catch (uploadError) {
        message.error(`${option.file.name} upload failed. details: ${JSON.stringify(uploadError)}`);
      }

        //option.onSuccess((body:Object) => "success");
    } else {
    // option.onError((error:Object) =>  "error");
    }
    return option;
  }


  return (
    <Upload
      name="avatar"
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
