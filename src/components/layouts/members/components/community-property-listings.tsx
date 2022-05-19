import { Typography, Card, Space, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Text, Title } = Typography;

export const CommunityPropertyListings: React.FC<any> = (props) => {
    const navigate = useNavigate();

    console.log(props);

    const generateMarketListingType = (property: any) => {
        return(
        <div>
            {
                 property.listedForSale && <div 
                 style={{
                     display: 'inline-block',
                     backgroundColor: "blue",
                     borderRadius: "10px",
                     padding: "2.5px 5px",
                     fontSize: "10px",
                     color: "#fff",
                 }}>
                 For Sale
             </div>
            }
            
            {
                property.listedForRent && <div 
                style={{
                    display: 'inline-block',
                    backgroundColor: "red",
                    borderRadius: "10px",
                    padding: "2.5px 5px",
                    fontSize: "10px",
                    color: "#fff",
                }}>
                For Rent
            </div>
            }

            {
                property.listedForLease && <div 
                    style={{
                        display: 'inline-block',
                        backgroundColor: "green",
                        borderRadius: "10px",
                        padding: "2.5px 5px",
                        fontSize: "10px",
                        color: "#fff",
                    }}>
                    For Lease
            
                </div>
            }

            </div>
        )
    }

    const generateProperties = (data: any) => {
        return data.map((property: any) => {
            if (property.listedInDirectory){
                return (
                <Card 
                    title={<Title level={4}>{property.propertyName}</Title>} 
                    size='small' 
                    style={{ margin: '15px 0', padding: "5px 25px", borderRadius: "15px", backgroundColor: "oldlace", width: "325px"}} 
                    extra={
                    <Button 
                        onClick={() => navigate(`${property.id}`)}
                        type='link'
                    >
                        Details
                        </Button>
                    }
                >

                    <Space direction='vertical'>
                        <Space direction='horizontal' size='small'>
                            {generateMarketListingType(property)}
                        </Space>
                        <Space direction='horizontal' size='small'>
                            {property.listingDetail.bedrooms && <Text>{property.listingDetail.bedrooms} Bds</Text>}
                            {property.listingDetail.bathrooms && <Text>{property.listingDetail.bathrooms} Ba </Text> }
                            {property.listingDetail.squareFeet && <Text>{property.listingDetail.squareFeet}sqft</Text>}
                        </Space>
                        <Space direction='vertical' size='small'>
                            {property.owner && <Text italic>Owner: {property.owner.memberName}</Text>}
                            {property.propertyType && <Text>Property Type: {property.propertyType}</Text>}
                        </Space>
                    </Space>
                </Card>)
            }
        })
    }


    return (<>{generateProperties(props.data.property)}</>)
}