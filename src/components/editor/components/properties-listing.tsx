import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { useNode } from '@craftjs/core';
import { Typography, Card, Space, Badge, Skeleton } from 'antd';

const { Text, Title } = Typography;

const GET_PROPERTIES_BY_COMMUNITY = gql`
    query PropertiesByCommunity($communityId: ID!) {
        propertiesByCommunityId(communityId: $communityId) {
            id
            propertyName
            propertyType
            owner {
                memberName
            }
            location {
                address {
                    streetNumber
                    streetName
                }
            }
            listedForSale
            listedForRent
            listedForLease
            listedInDirectory
        }
    }
`;

// interface PropertiesListingProps {
//     path: string;
// }

let PropertiesListing: any;

PropertiesListing = () => {
    const path = window.location.href.slice(window.location.href.lastIndexOf('/'));

    const { connectors: { connect, drag }, selected } = useNode((state) =>(
        {
            selected: state.events.selected,
        }
    ));

    const { loading, error, data } = useQuery(GET_PROPERTIES_BY_COMMUNITY, {
        variables: { 
            communityId: localStorage.getItem('community') ?? '' 
        },
    });

    const generatePropertyCard = (property: any) => {
        return (
            <Card key={property.id} title={<Title level={4}>{property.propertyName}</Title>} size='small' style={{ margin: '15px 0', padding: "5px 25px"}} extra={<Link to={`${path}/:propertyId`} style={{marginLeft: '30px'}}>Details</Link>}>
                <Space direction='vertical' size='small'>
                    {property.owner && <Text italic>Owner: {property.owner.memberName}</Text>}
                    {property.propertyType && <Text>Property Type: {property.propertyType}</Text>}
                </Space>
            </Card>
        )
    }

    const content = () => {
        if (loading) return <Skeleton active/>;
        if (error) return <p>Error! ${error.message}</p>;
        return (
            <div 
                className="px-4 py-2"
                ref={ref => connect(drag(ref as HTMLDivElement))} 
            >
                <div className="bg-white shadow overflow-hidden sm:rounded" style={{display:'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
                    {data && data.propertiesByCommunityId && data.propertiesByCommunityId.map((property: any) => (
                        <>
                            {property.listedForSale ?
                            <Badge.Ribbon text='For Sale' color='green'>
                                {generatePropertyCard(property)}
                            </Badge.Ribbon> :
                            property.listedForRent ?
                            <Badge.Ribbon text='For Rent' color='blue'>
                                {generatePropertyCard(property)}
                            </Badge.Ribbon> :
                            property.listedForLease ?
                            <Badge.Ribbon text='For Lease' color='purple'>
                                {generatePropertyCard(property)}
                            </Badge.Ribbon> :
                            property.listedInDirectory ?
                            generatePropertyCard(property) : <></>}
                        </>
                    ))}
                </div>
            </div>
        )
    }

    return <>
        {content()}
    </>
}

const PropertiesListingSettings = () => {
    return <></>
}

PropertiesListing.craft = {
    related: {
        settings: PropertiesListingSettings
    },
    custom: {
        isDeletable: false,
    }
}

export {
    PropertiesListing
}