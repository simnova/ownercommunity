import { useMutation, useQuery } from "@apollo/client";
import { AdminSettingsGeneralContainerCommunityDocument, AdminSettingsGeneralContainerCommunityUpdateDocument,CommunityUpdateInput } from "../../../../generated";
import { SettingsGeneral} from "./settings-general";
import PropTypes  from "prop-types";
import { message,Skeleton } from "antd";

const ComponentPropTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired
  }),
}

interface ComponentPropInterface {
  data: {
    id: string;
  }
}

export type SettingsGeneralContainerPropTypes = PropTypes.InferProps<typeof ComponentPropTypes> & ComponentPropInterface;

export const SettingsGeneralContainer: React.FC<SettingsGeneralContainerPropTypes> = (props) => {
  const [communityUpdate, { error }] = useMutation(AdminSettingsGeneralContainerCommunityUpdateDocument);  
  const { data: communityData, loading: accountLoading, error: accountError } = useQuery(AdminSettingsGeneralContainerCommunityDocument);

  const handleSave = async (values: CommunityUpdateInput) => {
    values.id = communityData!.community!.id;
    try {
      await communityUpdate({
        variables: {
          input:values
        },
      });
      message.success("Saved");
    } catch (saveError) {
      message.error(`Error updating user: ${JSON.stringify(saveError)}`);
    }
  }

  const content = () => {
    if(accountLoading) {
      return <div><Skeleton active /></div>
    } else if(error || accountError) {
      return <div>{error}{accountError}</div>
    } else if(communityData && communityData.community) {
      return <SettingsGeneral onSave={handleSave} data={communityData?.community } />
    } else {
      return <div>No Data...</div>
    }
  }

  return <>
    {content()}
  </>
  
}