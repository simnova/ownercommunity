import { MemberProfileDetailsContainer } from "./member-profile-details.container";
import { ProfilePhotoUploadContainer } from "./profile-photo-upload.container";


interface MemberProfileProps {
  data: {
    id: string;
    communityId: string;
  }
}

export const MemberProfile: React.FC<MemberProfileProps> = (props) => {
  return (
    <>
      <ProfilePhotoUploadContainer data={{ id: props.data.id, communityId: props.data.communityId }} />
      <MemberProfileDetailsContainer data={{ id: props.data.id }} />
    </>
  )

}