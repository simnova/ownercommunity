import { Typography, Card, Space } from 'antd';
import { Link } from 'react-router-dom';

const { Text, Title } = Typography;

export const CommunityPropertyListings: React.FC<any> = (props) => {

    const generateProperties = (data: any) => {
        console.log(data)
        return data.map((property: any) => {
            console.log("hey")

            if (property.listedInDirectory){
                console.log("hello")
                return (
                <Card 
                    title={<Title level={4}>{property.propertyName}</Title>} 
                    size='small' 
                    style={{ margin: '15px 0', padding: "5px 25px"}} 
                    extra={<Link to='listing/:propertyId' style={{marginLeft: '30px'}}>Details</Link>}>
                <Space direction='vertical' size='small'>
                    {property.owner && <Text italic>Owner: {property.owner.memberName}</Text>}
                    {property.propertyType && <Text>Property Type: {property.propertyType}</Text>}
                </Space>
            </Card>)
            }
        })
    }

    console.log(props.data)


    return (<>{generateProperties(props.data.property)}</>)
}