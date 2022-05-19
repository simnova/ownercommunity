import { Image } from 'antd';

export const CommunityPropertyDetail: React.FC<any> = (props) => {
    console.log(props.data.property)

    const generateMarketData = () => {
        return (
            <div>
                {props.data.property.listedForSale && <div>

                    {props.data.property.listingDetail.price}
                </div>
                
                }

                {props.data.property.listedForRent && <div></div>

                }

                {props.data.property.listedForLease && <div></div>

                }
        </div>
        )
    }

    return (
        <div>
            <Image 
                src='https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                height='20rem'
            />
            {generateMarketData()}
        </div>
    )

}
