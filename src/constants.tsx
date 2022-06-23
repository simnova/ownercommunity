import type { SliderMarks } from 'antd/lib/slider';
import { kMaxLength } from 'buffer';

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
  Top: 'top'
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
  Distance: 'distance'
};

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
export const PropertyTypes = ['condo', 'single family', 'townhouse'];
export const Listed = [
  { label: 'For Sale', value: 'listedForSale' },
  { label: 'For Rent', value: 'listedForRent' },
  { label: 'For Lease', value: 'listedForLease' }
];
export const Amenities = ['Wifi', 'Pool', 'TV'];
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
  'Features': ['Iron', 'Washer/Dryer (Private)'], 
  'Heating & Cooling':['Central Air', 'Central Heat'], 
  'Kitchen & Dining':['Dishwasher', 'Microwave', 'Refrigerator'], 
  'Location':['Oceanfront', 'Gated Community'],
  'Media':['Cable', 'Internet', 'TV'],
  'On-site Activities':['Pool (Private)', 'Gym', 'Basketball Court'],
  'Outdoor':['Balcony'],
  'Parking & Access':['Garage'],
  // '':[]
}

export const AdditionalAmenitiesCategories = Object.keys(additionalAmenitiesOptions);

export const SelectableRoomsOptions = [
  'Master Bedroom',
  'Guest Room 1',
  'Guest Room 2',
  'Guest Room 3',
  'Guest Room 4',
  'Living Room',
]

export const AmentitiesOptions = 
[
  'Cable',
  'Pool (Private)',
  'Pool (Public)',
  'Gym',
  'Washer/Dryer (Private)',
  'Washer/Dryer (Public)'
];

export const BedTypeOptions = [ 'Single', 'Double', 'Triple', 'Quad', 'Queen', 'King', 'Sofa Bed' ];

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
