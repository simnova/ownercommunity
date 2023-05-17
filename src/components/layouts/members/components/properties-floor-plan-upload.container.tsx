import { useMutation } from "@apollo/client";
import { MembersPropertiesListingImageUploadContainerPropertyFloorPlanImageCreateAuthHeaderDocument } from "../../../../generated";
import { AuthResult } from './profile-photo-upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { PropertiesListingImageUpload } from "./properties-listing-image-upload";


export interface PropertiesFloorPlanUploadContainerProps {
    propertyId: string;
    communityId: string;
    value?: string[];
    onChange?: (tags:string[]) => void;
  }

export const PropertiesFloorPlanUploadContainer: React.FC<PropertiesFloorPlanUploadContainerProps> = (props) => {
    const [membersPropertyFloorPlanCreateAuthHeader] = useMutation(MembersPropertiesListingImageUploadContainerPropertyFloorPlanImageCreateAuthHeaderDocument);
    const handleAuthorizeRequest = async (file:File): Promise<AuthResult>  => {
        const result = await membersPropertyFloorPlanCreateAuthHeader({
            variables: {
                input: {
                  propertyId: props.propertyId,
                  contentType: file.type,
                  contentLength: file.size,
                  fileName: file.name
                }
              }
            });
            return result.data?(({...result.data.propertyFloorPlanImageCreateAuthHeader, ...{isAuthorized:true}})as AuthResult):{isAuthorized:false} as AuthResult;
          }
          const blobPath = `https://ownercommunity.blob.core.windows.net/${props.communityId}`;
          var fileList = props.value?.map((v,index) => (
            {uid:`-${index}`,name:v,status:'done',url: `${blobPath}/${v}`})) as UploadFile[];

            return (
                <PropertiesListingImageUpload
                  authorizeRequest={handleAuthorizeRequest}
                  fileList={fileList}
                  blobPath={blobPath}
                  onFileAdded={(file) => {
                    if(props.onChange && file.url){
                      
                      var updatedList = [...props.value??[]];
                      //@ts-ignore
                      var url = file.url;
                      if(url.startsWith(blobPath)){
                        url = url.substring(blobPath.length+1);
                      }
            
                      updatedList.push(url as string);
                      props.onChange(updatedList);
                    }
                  }}
                  
                  onChange={(newFileList) => {
                    if(props.onChange) {
                      console.log('newFileList:',newFileList);
                      if(!newFileList || !newFileList.length || newFileList.length === 0) {
                        props.onChange([]);
                      } else {
                        if(newFileList.find(f => f.status === 'uploading')) {
                          // do nothing
                        } else {
                          var results = newFileList.map(f => {
            
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
                  }}
                />
              )
}