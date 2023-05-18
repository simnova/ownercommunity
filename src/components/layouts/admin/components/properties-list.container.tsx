import { useQuery } from "@apollo/client";
import { AdminPropertiesListContainerPropertiesDocument } from "../../../../generated";
import { Skeleton } from "antd";
import { PropertiesList } from "../../shared/components/properties-list";

export const PropertiesListContainer: React.FC<any> = (props) => {
  const { data: propertyData, loading: propertyLoading, error: propertyError } = useQuery(AdminPropertiesListContainerPropertiesDocument,
    {
      variables: {communityId: props.data.communityId}
    }
    );

  if(propertyLoading) {
    return <div><Skeleton active /></div>
  }
  if(propertyError) {
    return <div>{JSON.stringify(propertyError)}</div>
  }
  if(propertyData && propertyData.propertiesByCommunityId) {
    return <PropertiesList data={propertyData.propertiesByCommunityId} />
  } else {
    return <div>No Data...</div>
  }
}