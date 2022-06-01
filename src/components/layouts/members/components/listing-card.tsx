import { Carousel, Image } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom';

export const ListingCard: React.FC<any> = (props) => {
    const params = useParams();

    const imageGallery = props.images.map((image: any) => {
        return image;
    })

    return (
            <div className='max-w-xs grid grid-cols-1' style={{border: "1px solid gray", borderRadius:"9px"}}>
                <div  className='relative p-3 col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/75 via-black/0'>
                    <h2 className="mt-1 text-lg font-semibold text-white dark:sm:text-white">$1.1M</h2>
                    {/* <h1 className="mt-1 text-lg font-semibold text-white dark:sm:text-white">Name</h1>
                    <p className="text-sm leading-4 font-medium text-white dark:sm:text-slate-400">Entire house</p> */}
                </div>

                <div className='grid gap-4 col-start-1 col-end-3 row-start-1'>
                    <img src={imageGallery[0]} className="w-full h-60 object-cover rounded-lg col-span-2 h-52"/> 
                </div>

                <div>
                    <p className="mt-4 text-sm leading-6 col-start-1 dark:text-slate-400">
                        1 Bedroom, 1 Bathroom, 1,000 sqft
                    </p>
                    <p className="mt-4 text-sm leading-6 col-start-1 dark:text-slate-400">
                        <em> 123 Street St. City, AA 12345</em>
                    </p>
                </div>
            </div>
    )
}