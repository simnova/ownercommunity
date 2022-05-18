import { Typography, Card, Space } from 'antd';
import { Link } from 'react-router-dom';

const { Text, Title } = Typography;

export const CommunityPropertyListings: React.FC<any> = (props) => {

    console.log(props);
    const generateProperties = (data: any) => {
        return data.map((property: any) => {

            if (property.listedInDirectory){
                return (
                <Card 
                    title={<Title level={4}>{property.propertyName}</Title>} 
                    size='small' 
                    style={{ margin: '15px 0', padding: "5px 25px", borderRadius: "15px", backgroundColor: "oldlace", width: "325px"}} 
                    extra={<Link to='listing/:propertyId' style={{marginLeft: '30px'}}>Details</Link>}
                >
                    <Space direction='vertical'>
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