import { useParams, useNavigate } from 'react-router-dom';
import { PropertyResult } from '../../../../generated';
import PropertyFallbackImage from '../../../../assets/property-fallback.png';

export const ListingCard: React.FC<any> = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  // const imageGallery = props.images.map((image: any) => {
  //     return image;
  // })
  // console.log(props.data);

  return (
    <div
      onClick={() => navigate(`../../listings/${props.data.id}`)}
      style={{ cursor: 'pointer', width: '100%', height: '100%' }}
    >
      <div
        className="max-w-xs grid grid-cols-1 pr-0"
        style={{ border: '1px solid gray', borderRadius: '9px' }}
      >
        <div className="relative p-3 col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/75 via-black/0">
          <h1 className="m-0 text-sm font-semibold text-white dark:sm:text-white">
            {props.data.name}
          </h1>
          <h2 className="m-0 text-lg font-semibold text-white dark:sm:text-white">
            ${props.data.price}
          </h2>
          {/* <p className="text-sm leading-4 font-medium text-white dark:sm:text-slate-400">Entire house</p> */}
        </div>
        <div className="grid gap-4 col-start-1 col-end-3 row-start-1">
          {props.data.images[0] && <img
            src={
              'https://ownercommunity.blob.core.windows.net/' +
              props.data.communityId +
              '/' +
              props.data.images[0]
            }
            className="w-full h-60 object-cover rounded-lg col-span-2 h-52"
            alt="Property Image"
            // style={{width: "400px"}}
          />}
        </div>

´
      </div>
    </div>
  );
};

interface ListingCardProps {
  properties: PropertyResult[];
}

export const ListingCardV2: React.FC<ListingCardProps> = (props) => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div className="bg-white">
    <div className="mx-auto max-w-10xl px-4 py-8 sm:px-6 sm:py-18 lg:max-w-8xl lg:px-8">
      <div className="mt-2 flex grid grid-col-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {props.properties.map((property: PropertyResult) => (
          <div key={property.id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                <img
                  src={property.images?.[0] ? `https://ownercommunity.blob.core.windows.net/${params.communityId}/${property?.images?.[0]}` : PropertyFallbackImage}
                  alt={property?.name ?? 'Property image not found'}
                  className="rounded-md object-cover object-center lg:h-full sm:h-72 xs:h-64 w-full"
                />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm my-0 text-gray-700">
                  <a onClick={() => navigate(`../../listings/${property.id}`)}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {property.name}
                  </a>
                </h3>
                {property?.type && <p className="text-sm text-gray-500">{property.type}</p>}
              </div>
              {property.price && <p className="text-sm font-medium bold text-gray-900">${property?.price}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}
