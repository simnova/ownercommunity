import { useQuery } from "@apollo/client";
import { Skeleton } from 'antd';
import { MemberPropertiesByCommunityIdDocument } from "../../../../generated";
import { CommunityPropertyListings } from "./community-property-listings";


export const CommunityPropertyListingsContainer: React.FC<any> = (props) => {
    const {
        data: propertyData,
        loading: propertyLoading,
        error: propertyError
      } = useQuery(MemberPropertiesByCommunityIdDocument, {
        variables: { communityId: props.data.communityId }
      });

    const content = () => {
        if (propertyLoading) {
        return (
            <div>
            <Skeleton active />
            </div>
        );
        } else if (propertyError ) {
        return <div>{JSON.stringify(propertyError)}</div>;
        } else if (propertyData?.propertiesByCommunityId) {
        const detailData = {
            property: propertyData.propertiesByCommunityId
        };
        return <CommunityPropertyListings data={detailData}/>;
        } else {
        return <div>No data</div>;
        }
    };
    
    return (<>{content()}</>)
}