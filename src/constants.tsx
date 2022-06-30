import type { SliderMarks } from 'antd/lib/slider';
import dayjs from 'dayjs';
import { FacetDetail, FilterDetail } from './generated';

export const LocalSettingsKeys = {
  SidebarCollapsed: 'sidebar-collapsed',
  UserId: 'userId'
};

export const handleToggler = (isExpanded: boolean, callback: (isExpanded: boolean) => void) => {
  if (isExpanded) {
    callback(false);
    localStorage.setItem(LocalSettingsKeys.SidebarCollapsed, 'true');
    return;
  }
  callback(true);
  localStorage.removeItem(LocalSettingsKeys.SidebarCollapsed);
};

export const SearchParamKeys = {
  SearchString: 'search',
  ListedInfo: 'listedInfo',
  PropertyType: 'type',
  Amenities: 'amenities',
  AdditionalAmenities: 'additionalAmenities',
  MinPrice: 'minPrice',
  MaxPrice: 'maxPrice',
  Bedrooms: 'bedrooms',
  Bathrooms: 'bathrooms',
  MinSquareFeet: 'minSquareFeet',
  MaxSquareFeet: 'maxSquareFeet',
  Latitude: 'lat',
  Longtitude: 'long',
  Page: 'page',
  Top: 'top',
  Distance: 'distance',
  OrderBy: 'orderBy',
  UpdatedAt: 'updatedAt',
  CreatedDate: 'createdDate'
};

export const FilterNames = {
  Type: 'type',
  Bedrooms: 'bedrooms',
  Bathrooms: 'bathrooms',
  Amenities: 'amenities',
  AdditionalAmenities: 'additionalAmenities',
  AdditionalAmenitiesCategory: 'additionalAmenities/category',
  AdditionalAmenitiesAmenities: 'additionalAmenities/amenities',
  SquareFeet: 'squareFeet',
  ListedForSale: 'listedForSale',
  ListedForRent: 'listedForRent',
  ListedForLease: 'listedForLease',
  ListedInfo: 'listedInfo',
  Distance: 'distance',
  UpdatedAt: 'updatedAt',
  CreatedDate: 'createdDate'
};

export const AvailableFilters = Object.values(FilterNames);
export interface AdditionalAmenities {
  category: string;
  amenities: string[];
}

export const BedroomsFilterOptions = [
  { label: '1+', value: 1 },
  { label: '2+', value: 2 },
  { label: '3+', value: 3 },
  { label: '4+', value: 4 },
  { label: '5+', value: 5 }
];
export const BathroomsFilterOptions = [
  { label: '1+', value: 1 },
  { label: '1.5+', value: 1.5 },
  { label: '2+', value: 2 },
  { label: '3+', value: 3 },
  { label: '4+', value: 4 },
  { label: '5+', value: 5 }
];

export const PropertyTypeOptions = [
  {
    label: 'Townhouse',
    value: 'Townhouse'
  },
  {
    label: 'Condo',
    value: 'Condo'
  },
  {
    label: 'Single Family',
    value: 'Single Family'
  },
  {
    label: 'Apartment',
    value: 'Apartment'
  },
  {
    label: 'Land',
    value: 'Land'
  },
  {
    label: 'Studio',
    value: 'Studio'
  },
  {
    label: 'Multi-Family',
    value: 'Multi-Family'
  },
  {
    label: 'Storefront',
    value: 'Storefront'
  }
];

export const PropertyTypeList = PropertyTypeOptions.map((property) => {
  return property.value;
});

export const Listed = [
  { label: 'For Sale', value: 'listedForSale' },
  { label: 'For Rent', value: 'listedForRent' },
  { label: 'For Lease', value: 'listedForLease' }
];

export const AdditionalAmenitiesValues: AdditionalAmenities[] = [
  {
    category: 'Features',
    amenities: ['Iron', 'WasherDryer']
  },
  {
    category: 'Location',
    amenities: ['Waterfront', 'Beachfront']
  }
];
export const DistanceOptions = [
  { label: '1 Km', value: 1 },
  { label: '5 Km', value: 5 },
  { label: '10 Km', value: 10 },
  { label: '20 Km', value: 20 },
  { label: '50 Km', value: 50 }
];

export const PriceMarkers: SliderMarks = {
  0: '0',
  100000: '100,000+',
  200000: '200,000+',
  300000: '300,000+',
  400000: '400,000+',
  500000: '500,000+',
  600000: '600,000+',
  700000: '700,000+',
  800000: '800,000+',
  900000: '900,000+',
  1000000: '1,000,000+'
};
export const MinSquareFeetOptions = [
  { label: 'No min', value: 0 },
  { label: '750', value: 750 },
  { label: '1,000', value: 1000 },
  { label: '1,100', value: 1100 },
  { label: '1,200', value: 1200 },
  { label: '1,300', value: 1300 },
  { label: '1,400', value: 1400 },
  { label: '1,500', value: 1500 },
  { label: '1,600', value: 1600 },
  { label: '1,700', value: 1700 },
  { label: '1,800', value: 1800 },
  { label: '1,900', value: 1900 },
  { label: '2,000', value: 2000 }
];

export const MaxSquareFeetOptions = [
  { label: 'No max', value: 100000 },
  { label: '750', value: 750 },
  { label: '1,000', value: 1000 },
  { label: '1,100', value: 1100 },
  { label: '1,200', value: 1200 },
  { label: '1,300', value: 1300 },
  { label: '1,400', value: 1400 },
  { label: '1,500', value: 1500 },
  { label: '1,600', value: 1600 },
  { label: '1,700', value: 1700 },
  { label: '1,800', value: 1800 },
  { label: '1,900', value: 1900 },
  { label: '2,000', value: 2000 }
];

export const additionalAmenitiesOptions: any = {
  Features: ['Iron', 'Washer/Dryer (Private)'],
  'Heating & Cooling': ['Central Air', 'Central Heat'],
  'Kitchen & Dining': ['Dishwasher', 'Microwave', 'Refrigerator'],
  Location: ['Oceanfront', 'Gated Community'],
  Media: ['Cable', 'Internet', 'TV'],
  'On-site Activities': ['Pool (Private)', 'Gym', 'Basketball Court'],
  Outdoor: ['Balcony'],
  'Parking & Access': ['Garage']
  // '':[]
};

export const AdditionalAmenitiesCategories = Object.keys(additionalAmenitiesOptions);

export const SelectableRoomsOptions = [
  'Master Bedroom',
  'Guest Room 1',
  'Guest Room 2',
  'Guest Room 3',
  'Guest Room 4',
  'Living Room'
];

export const AmentitiesOptions = [
  'Cable',
  'Pool (Private)',
  'Pool (Public)',
  'Gym',
  'Washer/Dryer (Private)',
  'Washer/Dryer (Public)',
  'TV',
  'Wifi'
];

export const BedTypeOptions = ['Single', 'Double', 'Triple', 'Quad', 'Queen', 'King', 'Sofa Bed'];

export const UpdatedAtOptions = [
  { label: '1 week ago', value: 7 },
  { label: '2 weeks ago', value: 14 },
  { label: '1 month ago', value: 30 },
  { label: '3 months ago', value: 90 }
];

export const addressQuery = async (addressInput: string, mapSASToken: string) => {
  var addresssGeocodeServiceUrlTemplate: string =
    'https://atlas.microsoft.com/search/address/json?typeahead=true&api-version=1&query={query}';
  //var addresssGeocodeServiceUrlTemplate: string = 'https://atlas.microsoft.com/geocode?api-version=2022-02-01-preview&addressLine={query}&top=10';

  var requestUrl = addresssGeocodeServiceUrlTemplate.replace(
    '{query}',
    encodeURIComponent(addressInput)
  );
  const token = mapSASToken;
  console.log(token);

  const address = async () => {
    const request = await fetch(requestUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: 'jwt-sas ' + token,
        'Content-Type': 'application/json; charset=utf-8'
      }
    });

    const data = await request.json();
    console.log(data);
    return data.results;
  };

  return address();
};

export const GetFilterFromQueryString = (
  searchParams: URLSearchParams,
  selectedFilter: FilterDetail
): FilterDetail => {
  // get all search params
  const qsproperTypes = searchParams.get('type')?.split(',');
  const qsbedrooms = searchParams.get('bedrooms');
  const qsbathrooms = searchParams.get('bathrooms');
  const qsminPrice = searchParams.get('minPrice');
  const qsmaxPrice = searchParams.get('maxPrice');
  const qsminSquareFeet = searchParams.get('minSquareFeet');
  const qsmaxSquareFeet = searchParams.get('maxSquareFeet');
  const qsamenities = searchParams.get('amenities')?.split(',');
  const qsadditionalAmenities = searchParams.get('additionalAmenities')?.split(';');
  const qsdistance = searchParams.get('distance');
  const qsListedInfo = searchParams.get('listedInfo')?.split(',');
  const qslat = searchParams.get('lat');
  const qslong = searchParams.get('long');
  const qsupdatedAt = searchParams.get(SearchParamKeys.UpdatedAt); // in days
  const qscreatedDate = searchParams.get('createdDate'); // in days

  let filters = {} as FilterDetail;

  // proper type
  if (qsproperTypes) {
    filters = {
      ...selectedFilter,
      propertyType: qsproperTypes
    };
  }

  // bedrooms
  if (qsbedrooms) {
    filters = {
      ...filters,
      listingDetail: {
        ...filters?.listingDetail,
        bedrooms: parseInt(qsbedrooms)
      }
    };
  }

  // bathrooms
  if (qsbathrooms) {
    filters = {
      ...filters,
      listingDetail: {
        ...filters?.listingDetail,
        bathrooms: parseFloat(qsbathrooms)
      }
    };
  }

  // amenities
  if (qsamenities) {
    filters = {
      ...filters,
      listingDetail: {
        ...filters?.listingDetail,
        amenities: qsamenities
      }
    };
  }

  // price
  if (qsminPrice && qsmaxPrice) {
    filters = {
      ...filters,
      listingDetail: {
        ...filters?.listingDetail,
        prices: [parseInt(qsminPrice), parseInt(qsmaxPrice)]
      }
    };
  }

  // square feet
  if (qsminSquareFeet && qsmaxSquareFeet) {
    filters = {
      ...filters,
      listingDetail: {
        ...filters?.listingDetail,
        squareFeets: [parseInt(qsminSquareFeet), parseInt(qsmaxSquareFeet)]
      }
    };
  }

  // additional amenities
  if (qsadditionalAmenities) {
    let temp: AdditionalAmenities[] = [];

    qsadditionalAmenities.forEach((amenity) => {
      const [cate, amen] = amenity.split(':');
      temp.push({
        category: cate,
        amenities: amen.split(',')
      });
    });
    filters = {
      ...filters,
      listingDetail: {
        ...filters?.listingDetail,
        additionalAmenities: temp
      }
    };
  }

  // listed info
  if (qsListedInfo) {
    filters = {
      ...filters,
      listedInfo: qsListedInfo
    };
  }

  // distance
  if (qsdistance) {
    filters = {
      ...filters,
      distance: parseInt(qsdistance)
    };
  } else {
    filters = {
      ...filters,
      distance: 0
    };
  }

  // lat and long
  if (qslat && qslong) {
    filters = {
      ...filters,
      position: {
        latitude: parseFloat(qslat),
        longitude: parseFloat(qslong)
      }
    };
  }

  // updated date
  if (qsupdatedAt) {
    const date = dayjs().subtract(parseInt(qsupdatedAt), 'day').toISOString();
    filters = {
      ...filters,
      updatedAt: date
    };
  }

  // created date
  if (qscreatedDate) {
    const date = dayjs().subtract(parseInt(qscreatedDate), 'day').toISOString();
    filters = {
      ...filters,
      createdAt: date
    };
  }

  return filters;
};

// export const GetFilterOptions = (allOptions: string[], facets?: FacetDetail[]) => {
//   const options: any = [];

//   allOptions.forEach((value: string) => {
//     const count = facets?.find((t: any) => t?.value === value)?.count;
//     if (count === undefined) {
//       return;
//     }
//     options.push({
//       label: `${value} ${
//         count !== undefined && count !== null && count > 0 ? `(${count})` : count === 0 ? '(0)' : ''
//       }`,
//       value: value
//     });
//   });
//   console.log(options);
//   return options;
// };
