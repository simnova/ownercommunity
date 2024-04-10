import { Button, Card, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Text, Title } = Typography;

interface MarketListingConfigDefinition {
  listedFor: {
    title: string;
    listedFlag: boolean;
    color: string;
  }[];
}

export const CommunityPropertyListings: React.FC<any> = (props) => {
  const navigate = useNavigate();

  const generateMarketListingType = (property: any) => {
    const marketListingConfig: MarketListingConfigDefinition = {
      listedFor: [
        {
          title: 'Sale',
          listedFlag: property.listedForSale,
          color: 'blue'
        },
        {
          title: 'Rent',
          listedFlag: property.listedForRent,
          color: 'red'
        },
        {
          title: 'Lease',
          listedFlag: property.listedForLease,
          color: 'green'
        }
      ]
    };

    return (
      <div>
        {marketListingConfig.listedFor.map((marketData, index) => {
          console.log('MARKET DATA', marketData);
          if (marketData.listedFlag) {
            return (
              <div
                key={index}
                style={{
                  display: 'inline-block',
                  background: marketData.color,
                  borderRadius: '10px',
                  padding: '2.5px 5px',
                  fontSize: '10px',
                  color: '#fff'
                }}
              >
                For {marketData.title}
              </div>
            );
          }
        })}
      </div>
    );
  };

  const generateProperties = (data: any) => {
    return data.map((property: any) => {
      if (property.listedInDirectory) {
        return (
          <Card
            title={<Title level={4}>{property.propertyName}</Title>}
            size="small"
            style={{
              margin: '15px 0',
              padding: '5px 25px',
              borderRadius: '15px',
              backgroundColor: 'oldlace',
              width: '325px'
            }}
            extra={
              <Button onClick={() => navigate(`${property.id}`)} type="link">
                Details
              </Button>
            }
          >
            <Space direction="vertical">
              <Space direction="horizontal" size="small">
                {generateMarketListingType(property)}
              </Space>
              <Space direction="horizontal" size="small">
                {property.listingDetail.bedrooms && <Text>{property.listingDetail.bedrooms} Bds</Text>}
                {property.listingDetail.bathrooms && <Text>{property.listingDetail.bathrooms} Ba </Text>}
                {property.listingDetail.squareFeet && <Text>{property.listingDetail.squareFeet}sqft</Text>}
              </Space>
              <Space direction="vertical" size="small">
                {property.owner && <Text italic>Owner: {property.owner.memberName}</Text>}
                {property.propertyType && <Text>Property Type: {property.propertyType}</Text>}
              </Space>
            </Space>
          </Card>
        );
      }
    });
  };

  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>{generateProperties(props.data.property)}</div>
  );
};
