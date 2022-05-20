import { Image, Typography, Space, Divider } from 'antd';
import { TextComponent } from '../../../editor/components';
const { Title, Text  } = Typography;

export const CommunityPropertyDetail: React.FC<any> = (props) => {
    console.log(props.data.property)

    const generateMarketData = () => {
        return (
            <Space direction='vertical'>
                {props.data.property.listedForSale && 
                <Title level={3}>
                    Sale Price: ${props.data.property.listingDetail.price}
                </Title>

                }

                {props.data.property.listedForRent && 
                <Title level={3}>
                    Rent: ${props.data.property.listingDetail.rentLow} - ${props.data.property.listingDetail.rentHigh}
                </Title>
                }

                {props.data.property.listedForLease && 
                <Title level={3}>
                    Lease: ${props.data.property.listingDetail.lease}
                </Title>

                }

               



                
            </Space>
        )
    }

    const generateAgentDetails = () => {
        return (
            
            <Space direction='vertical'>
                <Divider orientation='left' orientationMargin={"5px"}><Title level={5}>Agent Details</Title></Divider>
                <Space>
                    {props.data.property.listingDetail.listingAgent}
                    <Text italic style={{color: 'gray'}}>{props.data.property.listingDetail.listingAgentCompany}</Text>
                </Space>
                {props.data.property.listingDetail.listingAgentEmail}
                {props.data.property.listingDetail.listingAgentPhone}
                {props.data.property.listingDetail.listingAgentWebsite}
            </Space>
        )
    }

    return (
        <Space direction='vertical'>
            <Space direction='vertical' size={0}>
                <Title level={2} style={{marginBottom: "0px"}}>{props.data.property.propertyName}</Title>
                <Text italic style={{color: "gray"}}>Owned By: {props.data.property.owner.memberName}</Text>
            </Space>

            <Space direction='horizontal' size={50} >
                <Title level={3} style={{marginTop: '0px'}}>123 Street St</Title>
                <Title level={4}>{props.data.property.listingDetail.bedrooms ? props.data.property.listingDetail.bedrooms : "-"} Bds</Title>
                <Title level={4}>{props.data.property.listingDetail.bathrooms ? props.data.property.listingDetail.bathrooms : "-"} Ba</Title>
                <Title level={4}>{props.data.property.listingDetail.squareFeet ? props.data.property.listingDetail.squareFeet : "-"} Sqft</Title>
            </Space>
            


            {/* <Title level={3}>{props.data.property.location}</Title> */}

            {generateMarketData()}

            <Divider orientation='left' orientationMargin={"5px"}><Title level={5}>About 123 Street St</Title></Divider>
            <Text italic>{props.data.property.listingDetail.description}</Text>
            {generateAgentDetails()}
        </Space>
    )

}
