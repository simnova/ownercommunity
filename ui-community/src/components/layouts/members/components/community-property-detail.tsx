import Icon from '@ant-design/icons';
import { Button, Card, Divider, Image, Modal, Space, Typography } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Listing } from './listing';
const { Title, Text } = Typography;

interface MarketDataConfigDefinition {
  listedFor: {
    title: string;
    listedFlag: boolean;
    name: string;
    location: string;
    price: number[];
    listingImages: string[];
  }[];
}

export const CommunityPropertyDetail: React.FC<any> = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const params = useParams();

  console.log(props.data);

  const listingImages = props.data.property.listingDetail.images.map((image: any) => {
    return `https://ownercommunity.blob.core.windows.net/${params.communityId}/${image}`;
  })

  const floorPlanImages = props.data.property.listingDetail.floorPlanImages.map((floorPlan: any) => {
    const url = `https://ownercommunity.blob.core.windows.net/${params.communityId}/${floorPlan}`;
    return <Image src={url} alt={'floor plan'} />;
  });

  const marketDataConfig: MarketDataConfigDefinition = {
    listedFor: [
      {
        title: 'Sale',
        listedFlag: props.data.property.listedForSale,
        name: 'sale',
        location: props.data.property.location.address.freeformAddress,
        price: [props.data.property.listingDetail.price],
        listingImages: listingImages
      },
      {
        title: 'Rent',
        listedFlag: props.data.property.listedForRent,
        name: 'rental',
        location: props.data.property.location.address.freeformAddress,
        price: [
          props.data.property.listingDetail.rentLow,
          props.data.property.listingDetail.rentHigh
        ],
        listingImages: listingImages
      },
      {
        title: 'Lease',
        listedFlag: props.data.property.listedForLease,
        name: 'lease',
        location: props.data.property.location.address.freeformAddress,
        price: [props.data.property.listingDetail.lease],
        listingImages: listingImages
      }
    ]
  };

  const buildMarketData = () => {
    return marketDataConfig.listedFor.map((marketData, index) => {
      if (marketData.listedFlag) {
        return (
          <div key={index}>
            <Divider orientation="left" orientationMargin={'5px'}>
              <Title level={5}>{marketData.title} Details</Title>
            </Divider>
            <Listing
              propertyName={props.data.property.propertyName}
              location={marketData.location}
              description={props.data.property.listingDetail.description}
              price={marketData.price}
              isRent={marketData.name === 'rental'}
              isLease={marketData.name === 'lease'}
              isSale={marketData.name === 'sale'}
              listingImages={marketData.listingImages}
            />
          </div>
        );
      }
    });
  };

  const generateMarketData = () => {
    return (
      <Space direction="vertical" style={{ width: '100%' }}>
        {buildMarketData()}
      </Space>
    );
  };

  const generateBeds = (beds: any) => {
    return beds.map((bed: any) => {
      return (
        <div
          style={{
            display: 'inline-block',
            padding: '2.5px 5px',
            borderRadius: '4px',
            fontSize: '10px',
            color: 'black',
            background: '#bfbdb8'
          }}
        >
          {bed}
        </div>
      );
    });
  };

  const generateBedrooms = () => {
    return props.data.property.listingDetail.bedroomDetails.map((bedroom: any) => {
      return (
        <Card>
          <Space direction="vertical">
            <Title level={5}>{bedroom.roomName}</Title>
            <Space direction="horizontal">{generateBeds(bedroom.bedDescriptions)}</Space>
            <Icon
              component={() => {
                return (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="currentColor"
                      d="M3 4.5A2.5 2.5 0 0 1 5.5 2h5A2.5 2.5 0 0 1 13 4.5v1.55a2.5 2.5 0 0 1 2 2.45v5a.5.5 0 0 1-1 0V11H2v2.5a.5.5 0 0 1-1 0v-5a2.5 2.5 0 0 1 2-2.45V4.5ZM2 10h12V8.5A1.5 1.5 0 0 0 12.5 7h-9A1.5 1.5 0 0 0 2 8.5V10Zm10-5.5A1.5 1.5 0 0 0 10.5 3h-5A1.5 1.5 0 0 0 4 4.5V6h1v-.5a.5.5 0 0 1 .5-.5H7a.5.5 0 0 1 .5.5V6h1v-.5A.5.5 0 0 1 9 5h1.5a.5.5 0 0 1 .5.5V6h1V4.5Z"
                    />
                  </svg>
                );
              }}
            />
          </Space>
        </Card>
      );
    });
  };

  const generateAgentDetails = () => {
    return (
      (<Space direction={props.space ?? 'vertical'}>
        <Space>
          {props.data.property.listingDetail.listingAgent ? (
            props.data.property.listingDetail.listingAgent
          ) : (
            <></>
          )}
          {props.data.property.listingDetail.listingAgentCompany ? (
            <Button type="link" onClick={showModal}>
              <Text italic style={{ color: 'gray' }}>
                {props.data.property.listingDetail.listingAgentCompany}
              </Text>
            </Button>
          ) : (
            <></>
          )}
        </Space>
        {props.data.property.listingDetail.listingAgentEmail ? (
          <a href={`mailto:${props.data.property.listingDetail.listingAgentEmail}`}>
            {props.data.property.listingDetail.listingAgentEmail}
          </a>
        ) : (
          <></>
        )}
        {props.data.property.listingDetail.listingAgentPhone ? (
          <a href={`tel:${props.data.property.listingDetail.listingAgentPhone}`}>
            {props.data.property.listingDetail.listingAgentPhone}
          </a>
        ) : (
          <></>
        )}
        {props.data.property.listingDetail.listingAgentWebsite ? (
          <a href={props.data.property.listingDetail.listingAgentWebsite}>
            {props.data.property.listingDetail.listingAgentWebsite}
          </a>
        ) : (
          <></>
        )}
        {props.data.property.listingDetail.listingAgentCompany ? (
          <Modal
            open={isModalVisible}
            onCancel={handleCancel}
            title={'Company Details'}
            footer={null}
          >
            <Space direction="vertical">
              <Title level={3}>{props.data.property.listingDetail.listingAgentCompany}</Title>
              {props.data.property.listingDetail.listingAgentCompanyAddress ? (
                props.data.property.listingDetail.listingAgentCompanyAddress
              ) : (
                <></>
              )}
              {props.data.property.listingDetail.listingAgentCompanyEmail ? (
                <a href={`mailto:${props.data.property.listingDetail.listingAgentCompanyEmail}`}>
                  {props.data.property.listingDetail.listingAgentCompanyEmail}
                </a>
              ) : (
                <></>
              )}
              {props.data.property.listingDetail.listingAgentCompanyPhone ? (
                <a href={`tel:${props.data.property.listingDetail.listingAgentCompanyPhone}`}>
                  {props.data.property.listingDetail.listingAgentCompanyPhone}
                </a>
              ) : (
                <></>
              )}
              {props.data.property.listingDetail.listingAgentCompanyWebsite ? (
                <a href={props.data.property.listingDetail.listingAgentCompanyWebsite}>
                  {props.data.property.listingDetail.listingAgentCompanyWebsite}
                </a>
              ) : (
                <></>
              )}
            </Space>
          </Modal>
        ) : (
          <></>
        )}
      </Space>)
    );
  };

  const generateAmentities = (amenities: any) => {
    return amenities.map((amenitity: any) => {
      return <Text>{amenitity}</Text>;
    });
  };

  const generateAdditionalAmentities = () => {
    return props.data.property.listingDetail.additionalAmenities.map((additionalAmenitity: any) => {
      return (
        <Card bordered={false}>
          <Space direction="vertical">
            <Title level={5}>{additionalAmenitity.category}</Title>
            {generateAmentities(additionalAmenitity.amenities)}
          </Space>
        </Card>
      );
    });
  };

  return (
    <Space direction="vertical">
      <Space direction="vertical" size={0}>
        <Title level={2} style={{ marginBottom: '0px' }}>
          {props.data.property.propertyName}
        </Title>
        <Text italic style={{ color: 'gray' }}>
          Owned By:{' '}
          {props.data.property.owner?.memberName ? props.data.property.owner.memberName : ''}
        </Text>
      </Space>

      <Space direction="horizontal" size={50}>
        <Title level={3} style={{ marginTop: '0px' }}>
          {props.data.property.location.address.streetNumber +
            ' ' +
            props.data.property.location.address.streetName}
        </Title>
        <Title level={4}>
          {props.data.property.listingDetail.bedrooms
            ? props.data.property.listingDetail.bedrooms
            : '-'}{' '}
          Bds
        </Title>
        <Title level={4}>
          {props.data.property.listingDetail.bathrooms
            ? props.data.property.listingDetail.bathrooms
            : '-'}{' '}
          Ba
        </Title>
        <Title level={4}>
          {props.data.property.listingDetail.squareFeet
            ? props.data.property.listingDetail.squareFeet
            : '-'}{' '}
          Sqft
        </Title>
      </Space>

      {generateMarketData()}

      <Divider orientation="left" orientationMargin={'5px'}>
        <Title level={5}>Bedrooms</Title>
      </Divider>
      <div className="px-4 md:px-8 sm:px-6 max-w-4xl mx-auto grid grid-cols-1 gap-y-3 md:grid-cols-2 lg:max-w-full lg:gap-x-20 lg:grid-cols-4">
        {generateBedrooms()}
      </div>

      <Divider orientation="left" orientationMargin={'5px'}>
        <Title level={5}>Amentities</Title>
      </Divider>
      <div className="px-4 md:px-8 sm:px-6 max-w-4xl mx-auto grid grid-cols-1 gap-y-3 md:grid-cols-2 lg:max-w-full lg:gap-x-20 lg:grid-cols-4">
        {generateAmentities(props.data.property.listingDetail.amenities)}
      </div>

      <Divider orientation="left" orientationMargin={'5px'}>
        <Title level={5}>Additional Amentities</Title>
      </Divider>
      <div className="max-w-4xl mx-auto grid grid-cols-1 gap-y-3 md:grid-cols-2 lg:max-w-full lg:gap-x-20 lg:grid-cols-4">
        {generateAdditionalAmentities()}
      </div>

      <Divider orientation="left" orientationMargin={'5px'}>
        <Title level={5}>
          About{' '}
          {props.data.property.location.address.streetNumber +
            ' ' +
            props.data.property.location.address.streetName}
        </Title>
      </Divider>
      <Text italic>{props.data.property.listingDetail.description}</Text>

      {floorPlanImages.length !== 0 ? (
        <div>
          <Divider orientation="left" orientationMargin={'5px'}>
            <Title level={5}>Floor Plans</Title>
          </Divider>{' '}
          <div>{floorPlanImages}</div>
        </div>
      ) : (
        <></>
      )}

      <Divider orientation="left" orientationMargin={'5px'}>
        <Title level={5}>Agent Details</Title>
      </Divider>
      {generateAgentDetails()}
    </Space>
  );
};
