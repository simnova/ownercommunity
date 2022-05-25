import { Typography, Space, Divider, Modal, Button, Card } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { StringLiteralLike } from 'typescript';
import { Small } from '../../../../stories/Button.stories';
import { Listing } from './listing';
const { Title, Text  } = Typography;

interface MarketDataConfigDefinition {
    listedFor: {
      title: string;
      listedFlag: boolean;
      name: string;
      location: string;
      price: number[];
    }[]
  }

export const CommunityPropertyDetail: React.FC<any> = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    console.log(props.data)

    const marketDataConfig: MarketDataConfigDefinition = {
        listedFor: [
            {
                title: 'Sale',
                listedFlag: props.data.property.listedForSale,
                name: 'sale',
                location: '123 Street St',
                price: [props.data.property.listingDetail.price],
            },
            {
                title: 'Rent',
                listedFlag: props.data.property.listedForRent,
                name: 'rental',
                location: '123 Street St',
                price: [props.data.property.listingDetail.rentLow, props.data.property.listingDetail.rentHigh],
            },
            {
                title: 'Lease',
                listedFlag: props.data.property.listedForLease,
                name: 'lease',
                location: '123 Street St',
                price: [props.data.property.listingDetail.lease],
            }
        ]
    }

    const buildMarketData = () => {
        return marketDataConfig.listedFor.map((marketData, index) => {
            if (marketData.listedFlag) {
                return (
                    <div key={index}>
                        <Divider orientation='left' orientationMargin={"5px"}><Title level={5}>{marketData.title} Details</Title></Divider>
                        <Listing 
                            propertyName={props.data.property.propertyName} 
                            location={marketData.location}
                            description={props.data.property.listingDetail.description} 
                            price={marketData.price}
                            isRent={marketData.name === 'rent'}
                            isLease={marketData.name === 'lease'}
                            isSale={marketData.name === 'sale'}
                        />
                    </div>
                )
            }
        })
    }

    const generateMarketData = () => {
        return (
            <Space direction="vertical" style={{width: "100%"}}>
                {buildMarketData()}
            </Space>
        )
    }

    const generateAgentDetails = () => {
        return (
            
            <Space direction={props.space ?? 'vertical'}>
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

    const generateAmentities = (amenities: any) => {
        return amenities.map((amenitity: any) => {
            return <Text>{amenitity}</Text>
        })
    }

    const generateAdditionalAmentities = () => {
        return props.data.property.listingDetail.additionalAmenities.map((additionalAmenitity: any) => {
            return (

                    <Card 
                        bordered={false}
                    >
                        <Space direction='vertical'>
                            <Title level={5}>{additionalAmenitity.category}</Title>
                            {generateAmentities(additionalAmenitity.amenities)}
                        </Space>
                    </Card>
            )
        })
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

            <Divider orientation='left' orientationMargin={"5px"}><Title level={5}>Amentities</Title></Divider>
            <div className='px-4 md:px-8 sm:px-6 max-w-4xl mx-auto grid grid-cols-1 gap-y-3 md:grid-cols-2 lg:max-w-full lg:gap-x-20 lg:grid-cols-4'>{generateAmentities(props.data.property.listingDetail.amenities)}</div>

            <Divider orientation='left' orientationMargin={"5px"}><Title level={5}>Additional Amentities</Title></Divider>
            <div className='max-w-4xl mx-auto grid grid-cols-1 gap-y-3 md:grid-cols-2 lg:max-w-full lg:gap-x-20 lg:grid-cols-4'>{generateAdditionalAmentities()}</div>

            <Divider orientation='left' orientationMargin={"5px"}><Title level={5}>About 123 Street St</Title></Divider>
            <Text italic>{props.data.property.listingDetail.description}</Text>
            {generateAgentDetails()}

        </Space>
    )

}
