import { useQuery } from "@apollo/client";
import { AdminPropertiesListContainerPropertiesDocument } from "../../../../generated";
import { PropertiesList} from "./properties-list";
import { Skeleton } from "antd";

export const PropertiesListContainer: React.FC<any> = (props) => {
  const { data: propertyData, loading: propertyLoading, error: propertyError } = useQuery(AdminPropertiesListContainerPropertiesDocument);

  if(propertyLoading) {
    return <div><Skeleton active /></div>
  }
  if(propertyError) {
    return <div>{JSON.stringify(propertyError)}</div>
  }
  if(propertyData && propertyData.properties) {
    return <PropertiesList data={propertyData.properties} />
  } else {
    return <div>No Data...</div>
  }
}