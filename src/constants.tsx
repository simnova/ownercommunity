import type { SliderMarks } from 'antd/lib/slider';
import { FilterDetail, Member, ServiceTicketsSearchFilterDetail } from './generated';
import { AuthContextProps } from 'react-oidc-context';

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

export const ServiceTicketSortOptions = [
  {
    value: 'createdAt asc',
    label: 'Created (Oldest)'
  },
  {
    value: 'createdAt desc',
    label: 'Created (Newest)'
  },
  {
    value: 'updatedAt asc',
    label: 'Updated (Oldest)'
  },
  {
    value: 'updatedAt desc',
    label: 'Updated (Newest)'
  }
]

export const PropertySortOptions = [
  {
    value: 'createdAt asc',
    label: 'Created (Oldest)'
  },
  {
    value: 'createdAt desc',
    label: 'Created (Newest)'
  },
  {
    value: 'updatedAt asc',
    label: 'Updated (Oldest)'
  },
  {
    value: 'updatedAt desc',
    label: 'Updated (Newest)'
  },
  {
    value: 'price asc',
    label: 'Price (Lowest)'
  },
  {
    value: 'price desc',
    label: 'Price (Highest)'
  }, 
  {
    value: 'bedrooms desc',
    label: 'Bedrooms (Largest)'
  },
  {
    value: 'squareFeet desc',
    label: 'Square Feet (Largest)'
  }
]

export enum SearchType {
  Property = 'PROPERTY',
  ServiceTicket = 'SERVICE_TICKET'
}

export const SearchParamKeys = {
  SearchString: 'search',
  ListedInfo: 'listedInfo',
  Type: 'type',
  Amenities: 'amenities',
  AdditionalAmenities: 'additionalAmenities',
  MinPrice: 'minPrice',
  MaxPrice: 'maxPrice',
  Bedrooms: 'bedrooms',
  Bathrooms: 'bathrooms',
  MinSquareFeet: 'minSquareFeet',
  MaxSquareFeet: 'maxSquareFeet',
  Latitude: 'lat',
  Longitude: 'long',
  Page: 'page',
  Top: 'top',
  Distance: 'distance',
  Sort: 'sort',
  UpdatedAt: 'updatedAt',
  CreatedAt: 'createdAt',
  HideNullResults: 'hideNullResults',
  SavedFilter: 'savedFilter',
  Tags: 'tags'
};

export const ServiceTicketSearchParamKeys = {
  SearchString: 'searchString',
  AssignedTo: 'assignedTo',
  Priority: 'priority',
  Status: 'status',
  SavedFilter: 'savedFilter',
  Column: 'column',
  Page: 'page',
  Top: 'top',
  Sort: 'sort'
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
  CreatedAt: 'createdAt',
  Tags: 'tags'
};

export const ServiceTicketFilterNames = {
  Requestor: 'requestor',
  AssignedTo: 'assignedTo',
  Status: 'status',
  Priority: 'priority',
  RequestorId: 'requestorId',
  AssignedToId: 'assignedToId'
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
  'Onsite Activities': ['Pool (Private)', 'Gym', 'Basketball Court'],
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

export const DateOptions = [
  { label: '1 week ago', value: 7 },
  { label: '2 weeks ago', value: 14 },
  { label: '1 month ago', value: 30 },
  { label: '3 months ago', value: 90 }
];

export const MinSquareFeet = 0;
export const MaxSquareFeet = 100000;

export const MinPrice = 0;
export const MaxPrice = 1000000;

export const addressQuery = async (addressInput: string, mapSASToken: string) => {
  const addresssGeocodeServiceUrlTemplate: string =
    'https://atlas.microsoft.com/search/address/json?typeahead=true&api-version=1&query={query}';
  //var addresssGeocodeServiceUrlTemplate: string = 'https://atlas.microsoft.com/geocode?api-version=2022-02-01-preview&addressLine={query}&top=10';

  const requestUrl = addresssGeocodeServiceUrlTemplate.replace('{query}', encodeURIComponent(addressInput));
  const token = mapSASToken;
  console.log(token);

  const address = async () => {
    const request = await fetch(requestUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: 'jwt-sas ' + token,
        'Content-Type': 'application/json; charset=utf-8',
        // 'Access-Control-Allow-Origin': '*'
      }
    });

    const data = await request.json();
    console.log(data);
    return data.results;
  };

  return address();
};

export const GetFilterFromQueryString = (searchParams: URLSearchParams, communityId: string): FilterDetail => {
  // get all search params
  const qspropertyTypes = searchParams.get('type')?.split(',');
  const qsbedrooms = searchParams.get('bedrooms');
  const qsbathrooms = searchParams.get('bathrooms');
  const qsminPrice = searchParams.get('minPrice');
  const qsmaxPrice = searchParams.get('maxPrice');
  const qsminSquareFeet = searchParams.get('minSquareFeet');
  const qsmaxSquareFeet = searchParams.get('maxSquareFeet');
  const qsamenities = searchParams.get('amenities')?.split(',');
  const qsadditionalAmenities = searchParams.get(SearchParamKeys.AdditionalAmenities)?.split(";");
  const qsdistance = searchParams.get('distance');
  const qsListedInfo = searchParams.get('listedInfo')?.split(',');
  const qslat = searchParams.get('lat');
  const qslong = searchParams.get('long');
  const qsupdatedAt = searchParams.get(SearchParamKeys.UpdatedAt); // in days
  const qscreatedAt = searchParams.get(SearchParamKeys.CreatedAt); // in days

  let filters = {} as FilterDetail;

  // proper type
  filters = {
    propertyType: qspropertyTypes
  };

  // bedrooms
  filters = {
    ...filters,
    listingDetail: {
      ...filters?.listingDetail,
      bedrooms: qsbedrooms ? parseInt(qsbedrooms) : undefined
    }
  };

  // bathrooms
  filters = {
    ...filters,
    listingDetail: {
      ...filters?.listingDetail,
      bathrooms: qsbathrooms ? parseFloat(qsbathrooms) : undefined
    }
  };

  // amenities
  filters = {
    ...filters,
    listingDetail: {
      ...filters?.listingDetail,
      amenities: qsamenities
    }
  };

  // price
  filters = {
    ...filters,
    listingDetail: {
      ...filters?.listingDetail,
      prices: qsminPrice && qsmaxPrice ? [parseInt(qsminPrice), parseInt(qsmaxPrice)] : qsminPrice ? [parseInt(qsminPrice), 1000000000] : qsmaxPrice ? [0, parseInt(qsmaxPrice)] : undefined
    }
  };

  // square feet
  filters = {
    ...filters,
    listingDetail: {
      ...filters?.listingDetail,
      squareFeets:
        qsminSquareFeet && qsmaxSquareFeet ? [parseInt(qsminSquareFeet), parseInt(qsmaxSquareFeet)] : qsminSquareFeet ? [parseInt(qsminSquareFeet), 1000000000] : qsmaxSquareFeet ? [0, parseInt(qsmaxSquareFeet)] : undefined
    }
  };

  // additional amenities
  let temp: AdditionalAmenities[] = [];
  qsadditionalAmenities?.forEach((amenity) => {
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

  // listed info
  filters = {
    ...filters,
    listedInfo: qsListedInfo
  };

  // distance
  filters = {
    ...filters,
    distance: qsdistance ? parseInt(qsdistance) : 0
  };

  // lat and long
  filters = {
    ...filters,
    position:
      qslat && qslong
        ? {
            latitude: parseFloat(qslat),
            longitude: parseFloat(qslong)
          }
        : undefined
  };

  // updated date
  filters = {
    ...filters,
    updatedAt: qsupdatedAt
  };

  // created date
  filters = {
    ...filters,
    createdAt: qscreatedAt
  };

  // tags
  const qstags = searchParams.get('tags')?.split(',');
  filters = {
    ...filters,
    tags: qstags
  };

  filters = {
    ...filters,
    communityId: communityId,
  }

  return filters;
};

export const GetFilterFromServiceTicketQueryString = (
  searchParams: URLSearchParams
): ServiceTicketsSearchFilterDetail => {
  // get all search params
  const qsassignedToId = searchParams.get('assignedTo')?.split(',');
  const qspriority = searchParams
    .get('priority')
    ?.split(',')
    .map((p) => parseInt(p));
  let qsstatus = searchParams.get('status')?.split(',');

  qsstatus = qsstatus?.map((status) => {
    return status.toUpperCase();
  });

  let filters = {} as ServiceTicketsSearchFilterDetail;

  filters = {
    priority: qspriority,
    assignedToId: qsassignedToId,
    status: qsstatus
  };

  return filters;
};

export const ConvertMemberIdToName = (memberId: string, members: Member[]): string => {
  if (memberId) {
    const member = members.find((m: any) => m.id === memberId);
    return member?.memberName ?? '';
  }
  return '';
};

export const ConvertMemberNameToId = (memberName: string, members: Member[]): string => {
  if (memberName) {
    const member = members.find((m: any) => m.memberName === memberName);
    return member?.id ?? '';
  }
  return '';
};

export const IsNameDuplicate = (name: string, members: Member[]): boolean => {
  let count = 0;
  members.forEach((m: any) => {
    if (m.memberName === name) {
      count++;
    }
  });
  return count > 1;
};

export const GetServiceTicketSelectedFilterTags = (searchParams: URLSearchParams, members?: Member[]) => {
  let tempList: string[] = [];

  //props.memberData.membersByCommunityId

  // const qsrequestorId = SearchParams.get('requestor');
  const qsassignedToId = searchParams.get('assignedTo')?.split(',');
  const qspriority = searchParams.get('priority')?.split(',');
  const qsstatus = searchParams.get('status')?.split(',');

  if (qsassignedToId && qsassignedToId.length > 0) {
    const assignedTo = qsassignedToId.map((id: string) => {
      const name = ConvertMemberIdToName(id, members ?? []);
      let tagName = name;
      if (IsNameDuplicate(name, members ?? [])) {
        tagName = `${name} (${id})`;
      }
      return 'Assigned to: ' + tagName;
    });

    tempList.push(...assignedTo);
  }

  if (qspriority && qspriority.length > 0) {
    const priority = qspriority.map((id: string) => 'Priority: ' + id);
    tempList.push(...priority);
  }

  if (qsstatus && qsstatus.length > 0) {
    const status = qsstatus.map((id: string) => 'Status: ' + id);
    tempList.push(...status);
  }

  return tempList;
};

export const SetSearchParamsFromServiceTicketFilter = (
  filters: string[],
  searchParams: URLSearchParams,
  members: Member[],
) => {
  const assignedTo = filters.filter((tag) => tag.startsWith('Assigned to: '));
  const priority = filters.filter((tag) => tag.startsWith('Priority: '));
  const status = filters.filter((tag) => tag.startsWith('Status: '));

  if (assignedTo.length > 0) {
    const ids = assignedTo.map((tag) => {
      const name = tag.split(': ')[1];
      return name.includes('(') ? name.split('(')[1].split(')')[0] : ConvertMemberNameToId(name, members);
    });
    searchParams.set('assignedTo', ids.join(','));
  } else {
    searchParams.delete('assignedTo');
  }

  if (priority.length > 0) {
    const priorityId = priority.map((tag) => tag.replace('Priority: ', ''));
    searchParams.set('priority', priorityId.join(','));
  } else {
    searchParams.delete('priority');
  }

  if (status.length > 0) {
    const statusId = status.map((tag) => tag.replace('Status: ', ''));
    searchParams.set('status', statusId.join(','));
  } else {
    searchParams.delete('status');
  }
};

export enum CustomViewOperation {
  Create,
  Update,
  Delete
}

type SearchParam = {
  key: string;
  label: string;
  formatValue?: (value: string) => string;
  separator?: string;
};

const searchParamsArray: SearchParam[] = [
  { key: SearchParamKeys.Type, label: 'Type: ' },
  { key: SearchParamKeys.Bedrooms, label: 'Bedrooms: ' },
  { key: SearchParamKeys.Bathrooms, label: 'Bathrooms: ' },
  { key: SearchParamKeys.MinPrice, label: 'Min Price: $' },
  { key: SearchParamKeys.MaxPrice, label: 'Max Price: $' },
  { key: SearchParamKeys.MinSquareFeet, label: 'Min Square Feet: ' },
  { key: SearchParamKeys.MaxSquareFeet, label: 'Max Square Feet: ' },
  { key: SearchParamKeys.Amenities, label: 'Amenities: ' },
  { key: SearchParamKeys.AdditionalAmenities, label: 'Additional Amenities: ', separator: ';' },
  { key: SearchParamKeys.Distance, label: 'Distance: ' },
  { key: SearchParamKeys.ListedInfo, label: 'Listed Info: ', formatValue: (value) => (value === 'listedForSale' ? 'For Sale' : value === 'listedForRent' ? 'For Rent' : 'For Lease') },
  { key: SearchParamKeys.Latitude, label: 'Latitude: ' },
  { key: SearchParamKeys.Longitude, label: 'Longitude: ' },
  { key: SearchParamKeys.UpdatedAt, label: 'Updated At: ' },
  { key: SearchParamKeys.CreatedAt, label: 'Created At: ' },
  { key: SearchParamKeys.Tags, label: 'Tags: ' },
];

export const GetPropertySelectedFilterTags = (searchParams: URLSearchParams) => {
  const tempList: string[] = [];

  searchParams.forEach((value, key) => {
    if (key === 'page' || key ==='top') return;
    const searchParam = searchParamsArray.find((sp) => sp.key === key);
    if (searchParam) {
      const separator = searchParam.separator ?? ',';
      if (value.includes(separator)) {
        const values = value.split(separator);
        const formattedValues = values.map((v) => searchParam.formatValue ? searchParam.formatValue(v) : v);
        formattedValues.forEach((v) => tempList.push(searchParam.label + v));
      } else {
        const formattedValue = searchParam.formatValue ? searchParam.formatValue(value) : value;
        tempList.push(searchParam.label + formattedValue);
      }
    }
  });

  return tempList;
};

export const SetSearchParamsFromPropertyFilter = (
  filters: string[],
  searchParams: URLSearchParams,
) => {
  const type = filters.filter((tag) => tag.startsWith('Type: '));
  const bedrooms = filters.filter((tag) => tag.startsWith('Bedrooms: '));
  const bathrooms = filters.filter((tag) => tag.startsWith('Bathrooms: '));
  const minPrice = filters.filter((tag) => tag.startsWith('Min Price: $'));
  const maxPrice = filters.filter((tag) => tag.startsWith('Max Price: $'));
  const minSquareFeet = filters.filter((tag) => tag.startsWith('Min Square Feet: '));
  const maxSquareFeet = filters.filter((tag) => tag.startsWith('Max Square Feet: '));
  const amenities = filters.filter((tag) => tag.startsWith('Amenities: '));
  const additionalAmenities = filters.filter((tag) => tag.startsWith('Additional Amenities: '));
  const distance = filters.filter((tag) => tag.startsWith('Distance: '));
  const listedInfo = filters.filter((tag) => tag.startsWith('Listed Info: '));
  const latitude = filters.filter((tag) => tag.startsWith('Latitude: '));
  const longitude = filters.filter((tag) => tag.startsWith('Longitude: '));
  const updatedAt = filters.filter((tag) => tag.startsWith('Updated At: '));
  const createdAt = filters.filter((tag) => tag.startsWith('Created At: '));
  const tags = filters.filter((tag) => tag.startsWith('Tags: '));

  if (type.length > 0) {
    console.log("type ", type);
    const typeId = type.map((tag) => tag.replace('Type: ', ''));
    console.log("typeId ", typeId);
    searchParams.set(SearchParamKeys.Type, typeId.join(','));
  } else {
    searchParams.delete(SearchParamKeys.Type);
  }

  if (bedrooms.length > 0) {
    const bedroomsId = bedrooms.map((tag) => tag.replace('Bedrooms: ', ''));
    searchParams.set(SearchParamKeys.Bedrooms, bedroomsId.join(','));
  } else {
    searchParams.delete(SearchParamKeys.Bedrooms);
  }

  if (bathrooms.length > 0) {
    const bathroomsId = bathrooms.map((tag) => tag.replace('Bathrooms: ', ''));
    searchParams.set(SearchParamKeys.Bathrooms, bathroomsId.join(','));
  } else {
    searchParams.delete(SearchParamKeys.Bathrooms);
  }

  if (minPrice.length > 0) {
    const minPriceId = minPrice.map((tag) => tag.replace('Min Price: $', ''));
    searchParams.set(SearchParamKeys.MinPrice, minPriceId.join(','));
  } else {
    searchParams.delete(SearchParamKeys.MinPrice);
  }

  if (maxPrice.length > 0) {
    const maxPriceId = maxPrice.map((tag) => tag.replace('Max Price: $', ''));
    searchParams.set(SearchParamKeys.MaxPrice, maxPriceId.join(','));
  } else {
    searchParams.delete(SearchParamKeys.MaxPrice);
  }

  if (minSquareFeet.length > 0) {
    const minSquareFeetId = minSquareFeet.map((tag) => tag.replace('Min Square Feet: ', ''));
    searchParams.set(SearchParamKeys.MinSquareFeet, minSquareFeetId.join(','));
  } else {
    searchParams.delete(SearchParamKeys.MinSquareFeet);
  }

  if (maxSquareFeet.length > 0) {
    const maxSquareFeetId = maxSquareFeet.map((tag) => tag.replace('Max Square Feet: ', ''));
    searchParams.set(SearchParamKeys.MaxSquareFeet, maxSquareFeetId.join(','));
  } else {
    searchParams.delete(SearchParamKeys.MaxSquareFeet);
  }

  if (amenities.length > 0) {
    const amenitiesId = amenities.map((tag) => tag.replace('Amenities: ', ''));
    searchParams.set(SearchParamKeys.Amenities, amenitiesId.join(','));
  } else {
    searchParams.delete(SearchParamKeys.Amenities);
  }

  if (additionalAmenities.length > 0) {
    const additionalAmenitiesId = additionalAmenities.map((tag) => tag.replace('Additional Amenities: ', ''));
    searchParams.set(SearchParamKeys.AdditionalAmenities, additionalAmenitiesId.join(';'));
  } else {
    searchParams.delete(SearchParamKeys.AdditionalAmenities);
  }

  if (distance.length > 0) {
    const distanceId = distance.map((tag) => tag.replace('Distance: ', ''));
    searchParams.set(SearchParamKeys.Distance, distanceId.join(','));
  } else {
    searchParams.delete(SearchParamKeys.Distance);
  }

  if (listedInfo.length > 0) {
    const listedInfoId = listedInfo.map((tag) => tag.replace('Listed Info: ', ''));
    const formattedListedInfo = listedInfoId.map((tag) => tag === 'For Sale' ? 'listedForSale' : tag === 'For Rent' ? 'listedForRent': 'listedForLease');
    searchParams.set(SearchParamKeys.ListedInfo, formattedListedInfo.join(','));
  } else {
    searchParams.delete(SearchParamKeys.ListedInfo);
  }

  if (latitude.length > 0) {
    const latitudeId = latitude.map((tag) => tag.replace('Latitude: ', ''));
    searchParams.set(SearchParamKeys.Latitude, latitudeId.join(','));
  } else {
    searchParams.delete(SearchParamKeys.Latitude);
  }

  if (longitude.length > 0) {
    const longitudeId = longitude.map((tag) => tag.replace('Longitude: ', ''));
    searchParams.set(SearchParamKeys.Longitude, longitudeId.join(','));
  } else {
    searchParams.delete(SearchParamKeys.Longitude);
  }

  if (updatedAt.length > 0) {
    const updatedAtId = updatedAt.map((tag) => tag.replace('Updated At: ', ''));
    searchParams.set(SearchParamKeys.UpdatedAt, updatedAtId.join(','));
  } else {
    searchParams.delete(SearchParamKeys.UpdatedAt);
  }

  if (createdAt.length > 0) {
    const createdAtId = createdAt.map((tag) => tag.replace('Created At: ', ''));
    searchParams.set(SearchParamKeys.CreatedAt, createdAtId.join(','));
  } else {
    searchParams.delete(SearchParamKeys.CreatedAt);
  }

  if (tags.length > 0) {
    const tagsId = tags.map((tag) => tag.replace('Tags: ', ''));
    searchParams.set(SearchParamKeys.Tags, tagsId.join(','));
  } else {
    searchParams.delete(SearchParamKeys.Tags);
  }

};


// check if the current environment is storybook
export const IsInStorybookEnv = () => {
  console.log(window.location.hostname);
  const result = (window.location.hostname === "localhost" && window.location.port === "6006") || window.location.hostname.includes("chromatic.com");
  return result;
};

export const FormatTimeCounter = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return minutes + ":" + (secs < 10 ? "0" + secs : secs);
};

export const HandleLogout = (auth: AuthContextProps, post_logout_redirect_uri?: string) => {
  // Please do not put await before these two functions it will break the logout
  auth.removeUser();
  if (post_logout_redirect_uri) {
    auth.signoutRedirect({ post_logout_redirect_uri });
    return;
  }
  auth.signoutRedirect();
};
