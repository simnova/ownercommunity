import { useQuery } from "@apollo/client"
import { MemberPropertyByPropertyIdDocument } from "../../../../generated"
import { Skeleton } from "antd";
import { CommunityPropertyDetail } from "./community-property-detail";

export const CommunityPropertyDetailContainer: React.FC<any> = (props) => {
    const {data: propertyData, loading: propertyLoading, error: propertyError} = useQuery(MemberPropertyByPropertyIdDocument, {
        variables: { propertyId: props.data.propertyId }
      });
    

    const content = () => {
        if (propertyLoading) {
            return (
            <div>
                <Skeleton active />
            </div>
            );
        }
        if (propertyError) {
            return <div>{JSON.stringify(propertyError)}</div>;
        }
        if (propertyData) {
            return <CommunityPropertyDetail data={propertyData}></CommunityPropertyDetail>;
        } else {
            return <div>No Data...</div>;
        }
    }

    return content()
}