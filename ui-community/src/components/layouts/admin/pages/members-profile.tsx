import { useParams } from "react-router-dom";
import { MemberProfileContainer } from "../../shared/components/member-profile.container";
import { Helmet } from "react-helmet-async";

export const MembersProfile: React.FC<any> = () => {
  const params = useParams();
  return (
    <div>
      <Helmet>
        <title>Members Profile</title>
      </Helmet>
      <h1>Members Profile</h1>
      <MemberProfileContainer data={{communityId: params.communityId ?? ''}} isAdmin />
    </div>
  )
}