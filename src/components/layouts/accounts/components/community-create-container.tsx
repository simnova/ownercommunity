import { CommunityCreate } from "./community-create";
import {
  CommunityCreateContainerMutationCommunityCreateDocument,
  CommunityCreateInput,
  CommunityListContainerCommunitiesQueryDocument,
} from "../../../../generated";
import { useMutation } from "@apollo/client";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export const CommunityCreateContainer: React.FC<any> = (props) => {
  const [createCommunity, { data, loading, error }] = useMutation(
    CommunityCreateContainerMutationCommunityCreateDocument,
    {
      update(cache, { data }) {
        // update the list with the new item
        const newCommunity = data?.communityCreate?.community;
        const communities = cache.readQuery({
          query: CommunityListContainerCommunitiesQueryDocument,
        })?.communities;
        if (newCommunity && communities) {
          cache.writeQuery({
            query: CommunityListContainerCommunitiesQueryDocument,
            data: {
              communities: [...communities, newCommunity],
            },
          });
        }
      },
    }
  );
  const navigate = useNavigate();

  const handleSave = async (values: any) => {
    var newCommunity: CommunityCreateInput = {
      ...values,
    };
    try {
      await createCommunity({
        variables: {
          input: newCommunity,
        },
      });
      message.success("Community Created");
      navigate("../");
    } catch (saveError) {
      message.error(`Error creating listing: ${JSON.stringify(saveError)}`);
    }
  };

  const content = () => {
    if (loading) {
      return <div>Loading...</div>;
    } else if (error) {
      return <div>Error {JSON.stringify(error)}</div>;
    }
    // else if(data){
    //   return <div>Data {JSON.stringify(data)}</div>
    // }
    else {
      return <CommunityCreate onSave={handleSave} />;
    }
  };

  return <>{content()}</>;
};
