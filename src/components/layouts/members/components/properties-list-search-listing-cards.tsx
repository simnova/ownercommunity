import { useParams, useNavigate } from 'react-router-dom';
import { PropertyResult } from '../../../../generated';
import PropertyFallbackImage from '../../../../assets/property-fallback.png';
import { Badge } from 'antd';

interface ListingCardsProps {
  properties: PropertyResult[];
}

export const PropertiesListSearchListingCards: React.FC<ListingCardsProps> = (props) => {
  const params = useParams();
  const navigate = useNavigate();

  const generatePropertyBadges = (property: PropertyResult) => {
    let propertyInfo: any[] = [];
    property.listedForSale && propertyInfo.push({text: 'Sale', color: 'green'});
    property.listedForRent && propertyInfo.push({text: 'Rent', color: 'blue'});
    property.listedForLease && propertyInfo.push({text: 'Lease', color: 'purple'});

    return (
        <div className='absolute right-0 -top-5'>
          <div className='flex flex-col'>
            {propertyInfo.map((info, _) => {
              return (
                  <div className='mt-5'><Badge.Ribbon key={info.text} text={info.text} color={info.color}/></div>
              )
            })}
          </div>
        </div>
    )
  }


  return (
    <div className="bg-white">
    <div className="mx-auto max-w-10xl px-4 py-8 sm:px-6 sm:py-18 lg:max-w-8xl lg:px-8">
      <div className="mt-2 flex grid grid-col-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {props.properties.map((property: PropertyResult) => (
          <div key={property.id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                {generatePropertyBadges(property)}
                <img
                  src={property.images?.[0] ? `https://ownercommunity.blob.core.windows.net/${params.communityId}/${property?.images?.[0]}` : PropertyFallbackImage}
                  alt={property?.name ?? 'Property image not found'}
                  className="rounded-md object-cover object-center lg:h-full sm:h-72 xs:h-64 w-full z-1"
                />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm my-0 text-gray-700">
                  <a onClick={() => navigate(`../listings/${property.id}`)}>
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
