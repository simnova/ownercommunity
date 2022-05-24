import { Typography, Space, Divider, Modal, Button } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Listing } from './listing';
const { Title, Text  } = Typography;

export const CommunityPropertyDetail: React.FC<any> = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    console.log(props.data)

    const generateMarketData = () => {
        return (
            <Space direction="vertical" style={{width: "100%"}}>
                {props.data.property.listedForSale && 
                <div>
                    <Divider orientation='left' orientationMargin={"5px"}><Title level={5}>Sale Details</Title></Divider>
                    {/* <Title level={3}>
                        Sale Price: ${props.data.property.listingDetail.price}
                    </Title> */}
                    <Listing 
                        propertyName={props.data.property.propertyName} 
                        location="123 Street St" 
                        description={props.data.property.listingDetail.description}
                        salePrice={props.data.property.listingDetail.price} 
                        sale
                    />
                </div>
                }

                {props.data.property.listedForRent && 
                <div>
                    <Divider orientation='left' orientationMargin={"5px"}><Title level={5}>Rental Details</Title></Divider>
                    <Listing 
                        propertyName={props.data.property.propertyName} 
                        location="123 Street St" 
                        description={props.data.property.listingDetail.description} 
                        rentLow = {props.data.property.listingDetail.rentLow}
                        rentHigh = {props.data.property.listingDetail.rentHigh}
                        rental
                    />
                </div>
                }

                {props.data.property.listedForLease && 
                    <div>
                        <Divider orientation='left' orientationMargin={"5px"}><Title level={5}>Rental Details</Title></Divider>
                        <Listing 
                            propertyName={props.data.property.propertyName} 
                            location="123 Street St" 
                            description={props.data.property.listingDetail.description} 
                            leasePrice = {props.data.property.listingDetail.lease}
                            lease
                        />
                    </div>

                }
            </Space>
        )
    }

    const generateAgentDetails = () => {
        return (
            
            <Space direction='vertical'>
                <Divider orientation='left' orientationMargin={"5px"}><Title level={5}>Agent Details</Title></Divider>
                <Space>
                    {props.data.property.listingDetail.listingAgent ? props.data.property.listingDetail.listingAgent : <></>}
                    {props.data.property.listingDetail.listingAgentCompany ? 
                        <Button type='link' onClick={showModal}><Text italic  style={{color: 'gray'}}>{props.data.property.listingDetail.listingAgentCompany}</Text></Button> : <></>
                    }
                </Space>
                {props.data.property.listingDetail.listingAgentEmail ? <a href={`mailto:${props.data.property.listingDetail.listingAgentEmail}`}>{props.data.property.listingDetail.listingAgentEmail}</a> : <></>}
                {props.data.property.listingDetail.listingAgentPhone ? 
                    <a href={`tel:${props.data.property.listingDetail.listingAgentPhone}`}>{props.data.property.listingDetail.listingAgentPhone}</a> : 
                    <></>
                }
                {props.data.property.listingDetail.listingAgentWebsite ?
                    <Link to={props.data.property.listingDetail.listingAgentWebsite}>{props.data.property.listingDetail.listingAgentWebsite}</Link> :
                    <></>
                }
                {props.data.property.listingDetail.listingAgentCompany ? <Modal visible={isModalVisible} onCancel={handleCancel} title={"Company Details"} footer={null}>
                    <Space direction='vertical'>
                        <Title level={3}>{props.data.property.listingDetail.listingAgentCompany}</Title>
                        {props.data.property.listingDetail.listingAgentCompanyAddress ? props.data.property.listingDetail.listingAgentCompanyAddress : <></>}
                        {props.data.property.listingDetail.listingAgentCompanyEmail ? <a href={`mailto:${props.data.property.listingDetail.listingAgentCompanyEmail}`}>{props.data.property.listingDetail.listingAgentCompanyEmail}</a> : <></>}
                        {props.data.property.listingDetail.listingAgentCompanyPhone ? 
                            <a href={`tel:${props.data.property.listingDetail.listingAgentCompanyPhone}`}>{props.data.property.listingDetail.listingAgentCompanyPhone}</a> : 
                            <></>
                        }
                        {props.data.property.listingDetail.listingAgentCompanyWebsite ?
                            <Link to={props.data.property.listingDetail.listingAgentCompanyWebsite}>{props.data.property.listingDetail.listingAgentCompanyWebsite}</Link> :
                            <></>
                        }
                    </Space>
                </Modal> : 
                <></>
                }
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
