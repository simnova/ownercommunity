import { useMutation, useQuery } from "@apollo/client";
import { Button, Image, Skeleton } from "antd";
import React, { useEffect } from "react";
import { SharedPhotoUploadContainerContainerMemberDocument, SharedPhotoUploadContainerMemberProfileAvatarCreateAuthHeaderDocument, SharedPhotoUploadContainerMemberProfileAvatarRemoveDocument } from "../../../../generated";
import { AuthResult, ProfilePhotoUpload } from "../../shared/components/profile-photo-upload";

export interface ProfilePhotoUploadContainerProps {
  data :{
    id: string;
    communityId: string;
  }
}

export const ProfilePhotoUploadContainer: React.FC<ProfilePhotoUploadContainerProps> = (props) => {
  const [memberProfileAvatarCreateAuthHeader] = useMutation(SharedPhotoUploadContainerMemberProfileAvatarCreateAuthHeaderDocument);
  const [memberProfileAvatarRemove] = useMutation(SharedPhotoUploadContainerMemberProfileAvatarRemoveDocument);
  const { data: memberData, loading: memberLoading, error: memberError } = useQuery(SharedPhotoUploadContainerContainerMemberDocument,{
    variables: {
      id: props.data.id
    }
  });

  const blobPath = `https://ownercommunity.blob.core.windows.net/${props.data.communityId}/profile/${props.data.id}/avatar`;
  const [imageUrl,setImageUrl] = React.useState<string|undefined>(blobPath);

  useEffect(() => {
    const blobPath = `https://ownercommunity.blob.core.windows.net/${props.data.communityId}/profile/${props.data.id}/avatar`;
    setImageUrl(blobPath);
  }, [props.data.id])

  const handleRemoveRequest = async () => { 
    const result = await memberProfileAvatarRemove({variables:{memberId:props.data.id}});
    if(result.data ) {
      setImageUrl(undefined);
      return result.data?.memberProfileAvatarRemove.status.success;
    }
    return false;
  }

  const handleAuthorizeRequest = async (file:File): Promise<AuthResult>  => {
    const result = await memberProfileAvatarCreateAuthHeader({
      variables: {
        input: {
          memberId: props.data.id,
          contentType: file.type,
          contentLength: file.size,
          fileName: file.name
        }
      }
    });
    return result.data?(({...result.data.memberProfileAvatarCreateAuthHeader, ...{isAuthorized:true}})as AuthResult):{isAuthorized:false} as AuthResult;
  }

  function getBase64(img:Blob, callback:any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }


  const handleChange = (info:any) => {
    if(info.file.status === 'uploading'){
      console.log('uploading');
    }
    if(info.file.status === 'done'){
      console.log('done');
      getBase64(info.file.originFileObj, (url:string) => {
        console.log("imageUrl:",url);
        setImageUrl(url);
      });
    }
  }

  const content = () => {
    if(memberLoading ) {
      return <div><Skeleton active /></div>
    } else if( memberError ) {
      return <div>{JSON.stringify(memberError  )}</div>
    } else if(memberData?.member?.profile ) {
      if(memberData.member.profile.avatarDocumentId && memberData.member.profile.avatarDocumentId !== imageUrl){
     //   setImageUrl(`https://ownercommunity.blob.core.windows.net/${props.data.communityId}/${memberData.member.profile.avatarDocumentId}`);
      }

      return (
        <div>
        {memberData.member.profile.avatarDocumentId && (  
        <div>
          <Image src={imageUrl} style={{maxWidth:'140px', maxHeight:'140px'}} className='rounded-full' /><br/>
          <Button onClick={async () => {await handleRemoveRequest()}}>Remove Image</Button><br/>
        </div>
        )}


        <ProfilePhotoUpload
         blobPath={`https://ownercommunity.blob.core.windows.net/${props.data.communityId}`}
         authorizeRequest={handleAuthorizeRequest}
         onChange={handleChange}
         onRemoveRequested={handleRemoveRequest}
          
        />
        </div>
      )
    } else {
      return <div>No data</div>
    }
  }

  return <>
    {content()}
  </>

}