import { useParams } from "react-router-dom";
import { MembersProfileContainer } from "../components/members-profile.container"
import { ProfilePhotoUploadContainer } from "../components/profile-photo-upload.container";

export const MembersProfile: React.FC<any> = (props) => {
  const params = useParams();
  return (
    <div>
      <h1>Members Profile</h1>
      <ProfilePhotoUploadContainer data={{id:params.id ?? '', communityId:params.communityId ?? ''}}/>
      <MembersProfileContainer data={{id:params.id ?? ''}} />
    </div>
  )
}