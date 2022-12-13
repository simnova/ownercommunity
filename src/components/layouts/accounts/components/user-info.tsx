import { LoggedInUserContainerUserCurrentFieldsFragment } from "../../../../generated";

export interface CommunityListProps {
  data: {
    userCurrent: LoggedInUserContainerUserCurrentFieldsFragment;
  };
}

export const UserInfo: React.FC<any> = (props) => {
  return (
    <>
      User ID: {props.data.userCurrent.id} <br />
    </>
  );
};
