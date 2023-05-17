import React from "react";
import { ProfilePhotoUpload, AuthResult } from "./profile-photo-upload";
import { AdminPhotoUploadContainerMemberProfileAvatarCreateAuthHeaderDocument, AdminPhotoUploadContainerMemberProfileAvatarRemoveDocument, AdminPhotoUploadContainerContainerMemberDocument, MemberPhotoUploadContainerContainerMemberDocument, MemberPhotoUploadContainerMemberProfileAvatarCreateAuthHeaderDocument } from "../../../../generated";
import { useQuery, useMutation } from "@apollo/client";
import { Image, Skeleton, Button } from "antd";

export interface ProfilePhotoUploadContainerProps {
  data:{
    id: string;
    communityId: string;
  }
}

export const ProfilePhotoUploadContainer: React.FC<ProfilePhotoUploadContainerProps> = (props) => {
  const [memberProfileAvatarCreateAuthHeader] = useMutation(MemberPhotoUploadContainerMemberProfileAvatarCreateAuthHeaderDocument);
  const [memberProfileAvatarRemove] = useMutation(AdminPhotoUploadContainerMemberProfileAvatarRemoveDocument);

  const { data: memberData, loading: memberLoading, error: memberError } = useQuery(MemberPhotoUploadContainerContainerMemberDocument,{
    variables: {
      communityId: props.data.communityId
    }
  });

  //const memberId = memberData?.memberForCurrentUser?.id;

  const blobPath = `https://ownercommunity.blob.core.windows.net/${props.data.communityId}/profile/${props.data.id}/avatar`;
  const [imageUrl,setImageUrl] = React.useState<string|undefined>(blobPath);

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
    } else if(memberData && memberData.memberForCurrentUser && memberData.memberForCurrentUser.profile ) {
      if(memberData.memberForCurrentUser.profile.avatarDocumentId && memberData.memberForCurrentUser.profile.avatarDocumentId !== imageUrl){
     //   setImageUrl(`https://ownercommunity.blob.core.windows.net/${props.data.communityId}/${memberData.member.profile.avatarDocumentId}`);
      }

      return (
        <div>
        {memberData.memberForCurrentUser.profile.avatarDocumentId && (  
        <div>
          <Image src={imageUrl} style={{maxWidth:'200px', maxHeight:'200px'}} className='rounded-full' /><br/>
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