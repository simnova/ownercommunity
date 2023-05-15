import React from 'react';
import { AuthResult } from './profile-photo-upload';
import { MembersPropertiesListingImageUploadContainerPropertyListingImageCreateAuthHeaderDocument } from '../../../../generated';
import { useMutation } from '@apollo/client';
import { PropertiesListingImageUpload } from './properties-listing-image-upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { blob } from 'node:stream/consumers';

export interface PropertiesListingImageUploadContainerProps {
  propertyId: string;
  communityId: string;
  value?: string[];
  onChange?: (tags:string[]) => void;
}

export const PropertiesListingImageUploadContainer: React.FC<PropertiesListingImageUploadContainerProps> = (props) => {
  const [membersPropertyListingCreateAuthHeader] = useMutation(MembersPropertiesListingImageUploadContainerPropertyListingImageCreateAuthHeaderDocument);

  const blobPath = `https://ownercommunity.blob.core.windows.net/${props.communityId}`;
  let fileList = props.value?.map((v,index) => (
    {uid:`-${index}`,name:v,status:'done',url: `${blobPath}/${v}`})) as UploadFile[];

  const handleAuthorizeRequest = async (file:File): Promise<AuthResult>  => {
    const result = await membersPropertyListingCreateAuthHeader({
      variables: {
        input: {
          propertyId: props.propertyId,
          contentType: file.type,
          contentLength: file.size,
          fileName: file.name
        }
      }
    });
    return result.data?(({...result.data.propertyListingImageCreateAuthHeader, ...{isAuthorized:true}})as AuthResult):{isAuthorized:false} as AuthResult;
  }

  const handleFileAdded = (file:UploadFile) => {
    if (props.onChange && file.url){
          
      let updatedList = [...props.value??[]];
      //@ts-ignore
      let url = file.url;
      if(url.startsWith(blobPath)){
        url = url.substring(blobPath.length+1);
      }

      updatedList.push(url as string);
      props.onChange(updatedList);
    }
  }

  const handleChange = (newFileList:UploadFile[]) => {
    if(props.onChange) {
      console.log('newFileList:',newFileList);
      if(!newFileList || !newFileList.length || newFileList.length === 0) {
        props.onChange([]);
      } else {
        if(newFileList.find(f => f.status === 'uploading')) {
          // do nothing
        } else {
          let results = newFileList.map(f => {
            if(f.url?.startsWith(blobPath)){
              return f.url.substring(blobPath.length+1);
            }
            return f.url;
          }) as string[];
          console.log('results:',results);
          props.onChange(results);
        }
      }
    }
  }
  
  return (
    <PropertiesListingImageUpload
      authorizeRequest={handleAuthorizeRequest}
      fileList={fileList}
      blobPath={blobPath}
      onFileAdded={handleFileAdded}
      onChange={handleChange}
    />
  )
}