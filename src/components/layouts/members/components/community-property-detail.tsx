import { Image, Typography, Space } from 'antd';
const { Title, Text  } = Typography;

export const CommunityPropertyDetail: React.FC<any> = (props) => {
    console.log(props.data.property)

    const generateMarketData = () => {
        return (
            <Space>
                {props.data.property.listedForSale && <Title level={3}>
                    {props.data.property.listingDetail.price}
                </Title>

                }

                {props.data.property.listedForRent && <div></div>

                }

                {props.data.property.listedForLease && <div></div>

                }

                <Space>
                    <Text>{props.data.property.listingDetail.bedrooms ? props.data.property.listingDetail.bedrooms : "-"} Bds</Text>

                </Space>



                
            </Space>
        )
    }

    return (
        <div>
            <Image 
                src='https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                height='20rem'
                width="60rem"
            />
            <Title level={3}>123 Street St</Title>
            <Title level={2} style={{marginTop: '15px'}}>{props.data.property.propertyName}</Title>
            {/* <Title level={3}>{props.data.property.location}</Title> */}

            {generateMarketData()}
        </div>
    )

}
