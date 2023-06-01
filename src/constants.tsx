import type { SliderMarks } from 'antd/lib/slider';
import dayjs from 'dayjs';
import { FilterDetail, Member, ServiceTicketsSearchFilterDetail } from './generated';
import { useParams } from 'react-router-dom';

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
  OrderBy: 'orderBy',
  UpdatedAt: 'updatedAt',
  CreatedAt: 'createdAt',
  HideNullResults: 'hideNullResults',
  SavedFilter: 'savedFilter',
  Tags: 'tags'
};

type SearchParamKeysType = typeof SearchParamKeys;

export const ServiceTicketSearchParamKeys = {
  SearchString: 'searchString',
  AssignedTo: 'assignedTo',
  Priority: 'priority',
  Status: 'status',
  SavedView: 'savedFilter',
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
  var addresssGeocodeServiceUrlTemplate: string =
    'https://atlas.microsoft.com/search/address/json?typeahead=true&api-version=1&query={query}';
  //var addresssGeocodeServiceUrlTemplate: string = 'https://atlas.microsoft.com/geocode?api-version=2022-02-01-preview&addressLine={query}&top=10';

  var requestUrl = addresssGeocodeServiceUrlTemplate.replace('{query}', encodeURIComponent(addressInput));
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

export const GetSearchParamsFromFilter = (filter: FilterDetail | undefined, searchParams: URLSearchParams) => {
  if (filter) {
    if (filter.propertyType) searchParams.set(SearchParamKeys.Type, filter.propertyType.join(','));
    if (filter.listedInfo) searchParams.set(SearchParamKeys.ListedInfo, filter.listedInfo.join(','));
    if (filter.distance && filter.distance !== 0)
      searchParams.set(SearchParamKeys.Distance, filter.distance.toString());
    if (filter.position) {
      if (filter.position.latitude) searchParams.set(SearchParamKeys.Latitude, filter.position.latitude.toString());
      if (filter.position.longitude) searchParams.set(SearchParamKeys.Longitude, filter.position.longitude.toString());
    }
    // if (filter.updatedAt) {
    //   searchParams.set(SearchParamKeys.UpdatedAt, dayjs().diff(filter.updatedAt, 'day').toString());
    // }
    // if (filter.createdAt) {
    //   searchParams.set(SearchParamKeys.CreatedAt, dayjs().diff(filter.createdAt, 'day').toString());
    // }
    if (filter.listingDetail) {
      if (filter.listingDetail.bedrooms)
        searchParams.set(SearchParamKeys.Bedrooms, filter.listingDetail.bedrooms.toString());
      if (filter.listingDetail.bathrooms)
        searchParams.set(SearchParamKeys.Bathrooms, filter.listingDetail.bathrooms.toString());
      if (filter.listingDetail.amenities)
        searchParams.set(SearchParamKeys.Amenities, filter.listingDetail.amenities.join(','));
      if (filter.listingDetail.prices) {
        if (filter.listingDetail.prices[0])
          searchParams.set(SearchParamKeys.MinPrice, filter.listingDetail.prices[0].toString());
        if (filter.listingDetail.prices[1])
          searchParams.set(SearchParamKeys.MaxPrice, filter.listingDetail.prices[1].toString());
      }
      if (filter.listingDetail.squareFeets) {
        if (filter.listingDetail.squareFeets[0])
          searchParams.set(SearchParamKeys.MinSquareFeet, filter.listingDetail.squareFeets[0].toString());
        if (filter.listingDetail.squareFeets[1])
          searchParams.set(SearchParamKeys.MaxSquareFeet, filter.listingDetail.squareFeets[1].toString());
      }
      if (filter.listingDetail.additionalAmenities) {
        let additionalAmenities: string[] = [];
        filter.listingDetail.additionalAmenities.forEach((amenity: any) => {
          additionalAmenities.push(`${amenity?.category}:${amenity?.amenities?.join(',')}`);
        });
        searchParams.set(SearchParamKeys.AdditionalAmenities, additionalAmenities.join(';'));
      }
    }
  }

  return searchParams;
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

export const GetSelectedFilterTags = (searchParams: URLSearchParams, members?: Member[]) => {
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
  members: Member[]
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
  { key: SearchParamKeys.AdditionalAmenities, label: 'Additional Amenities: ' },
  { key: SearchParamKeys.Distance, label: 'Distance: ' },
  { key: SearchParamKeys.ListedInfo, label: 'Listed Info: ', formatValue: (value) => (value === 'listedForSale' ? 'For Sale' : value === 'listedForRent' ? 'For Rent' : 'For Lease') },
  { key: SearchParamKeys.Latitude, label: 'Latitude: ' },
  { key: SearchParamKeys.Longitude, label: 'Longitude: ' },
  { key: SearchParamKeys.UpdatedAt, label: 'Updated At: ', formatValue: (value) => `${value} days` },
  { key: SearchParamKeys.CreatedAt, label: 'Created At: ', formatValue: (value) => `${value} days` },
  { key: SearchParamKeys.Tags, label: 'Tags: ' },
];

export const GetPropertySelectedFilterTags = (searchParams: URLSearchParams) => {
  const tempList: string[] = [];

  Array.from(searchParams.entries()).forEach(([key, value]) => {
    const searchParam = searchParamsArray.find((param: any) => param.key === key);
    if (searchParam) {
      const label = searchParam.label;
      const formattedValue = searchParam.formatValue ? searchParam.formatValue(value) : value;
      tempList.push(label + formattedValue);
    }
  });

  return tempList;
};
// export const SetSearchParamsFromPropertyFilter = (
//   filters: string[],
//   searchParams: URLSearchParams
// ) => {
//   // do the opposite of GetPropertySelectedFilterTags
//   // if (filters && filters.length > 0) {
//   //   const assignedTo = filters.filter((tag: string) => tag.startsWith('Assigned to: '));
//   //   if (assignedTo && assignedTo.length > 0) {
//   //     let ids: string[] = [];
//   //     assignedTo.forEach((f: string) => {
//   //       const name = f.split(': ')[1];
//   //       let id = '';
//   //       if (name.includes('(')) {
//   //         id = name.split('(')[1].split(')')[0];
//   //       } else {
//   //         id = ConvertMemberNameToId(name, members);
//   //       }
//   //       ids.push(id);
//   //       searchParams.set('assignedTo', ids.join(','));
//   //     });
//   //   } else {
//   //     searchParams.delete('assignedTo');
//   //   }

//   //   const priority = filters.filter((tag: string) => tag.startsWith('Priority: '));
//   //   if (priority && priority.length > 0) {
//   //     const priorityId = priority.map((tag: string) => tag.replace('Priority: ', ''));
//   //     searchParams.set('priority', priorityId.join(','));
//   //   } else {
//   //     searchParams.delete('priority');
//   //   }

//   //   const status = filters.filter((tag: string) => tag.startsWith('Status: '));
//   //   if (status && status.length > 0) {
//   //     const statusId = status.map((tag: string) => tag.replace('Status: ', ''));
//   //     searchParams.set('status', statusId.join(','));
//   //   } else {
//   //     searchParams.delete('status');
//   //   }
//   // }else {
//   //   searchParams.delete('assignedTo');
//   //   searchParams.delete('priority');
//   //   searchParams.delete('status');
//   // }
// };

export const SetSearchParamsFromPropertyFilter = (
  filters: string[],
  searchParams: URLSearchParams
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

  searchParamsArray.forEach((param) => {
    switch (param.key) {
      case SearchParamKeys.Type:
        if (type.length > 0) {
          searchParams.set(param.key, type[0].replace('Type: ', ''));
        } else {
          searchParams.delete(param.key);
        }
        break;
      case SearchParamKeys.Bedrooms:
        if (bedrooms.length > 0) {
          searchParams.set(param.key, bedrooms[0].replace('Bedrooms: ', ''));
        } else {
          searchParams.delete(param.key);
        }
        break;
      case SearchParamKeys.Bathrooms:
        if (bathrooms.length > 0) {
          searchParams.set(param.key, bathrooms[0].replace('Bathrooms: ', ''));
        } else {
          searchParams.delete(param.key);
        }
        break;
      case SearchParamKeys.MinPrice:
        if (minPrice.length > 0) {
          searchParams.set(param.key, minPrice[0].replace('Min Price: $', ''));
        } else {
          searchParams.delete(param.key);
        }
        break;
      case SearchParamKeys.MaxPrice:
        if (maxPrice.length > 0) {
          searchParams.set(param.key, maxPrice[0].replace('Max Price: $', ''));
        } else {
          searchParams.delete(param.key);
        }
        break;
      case SearchParamKeys.MinSquareFeet:
        if (minSquareFeet.length > 0) {
          searchParams.set(param.key, minSquareFeet[0].replace('Min Square Feet: ', ''));
        } else {
          searchParams.delete(param.key);
        }
        break;
      case SearchParamKeys.MaxSquareFeet:
        if (maxSquareFeet.length > 0) {
          searchParams.set(param.key, maxSquareFeet[0].replace('Max Square Feet: ', ''));
        } else {
          searchParams.delete(param.key);
        }
        break;
      case SearchParamKeys.Amenities:
        if (amenities.length > 0) {
          searchParams.set(param.key, amenities[0].replace('Amenities: ', ''));
        } else {
          searchParams.delete(param.key);
        }
        break;
      case SearchParamKeys.AdditionalAmenities:
        if (additionalAmenities.length > 0) {
          searchParams.set(param.key, additionalAmenities[0].replace('Additional Amenities: ', ''));
        } else {
          searchParams.delete(param.key);
        }
        break;
      case SearchParamKeys.Distance:
        if (distance.length > 0) {
          searchParams.set(param.key, distance[0].replace('Distance: ', ''));
        } else {
          searchParams.delete(param.key);
        }
        break;
      case SearchParamKeys.ListedInfo:
        if (listedInfo.length > 0) {
          searchParams.set(param.key, listedInfo[0].replace('Listed Info: ', ''));
        } else {
          searchParams.delete(param.key);
        }
        break;
      case SearchParamKeys.Latitude:
        if (latitude.length > 0) {
          searchParams.set(param.key, latitude[0].replace('Latitude: ', ''));
        } else {
          searchParams.delete(param.key);
        }
        break;
      case SearchParamKeys.Longitude:
        if (longitude.length > 0) {
          searchParams.set(param.key, longitude[0].replace('Longitude: ', ''));
        } else {
          searchParams.delete(param.key);
        }
        break;
      case SearchParamKeys.UpdatedAt:
        if (updatedAt.length > 0) {
          searchParams.set(param.key, updatedAt[0].replace('Updated At: ', '').replace(' days', ''));
        } else {
          searchParams.delete(param.key);
        }
        break;
      case SearchParamKeys.CreatedAt:
        if (createdAt.length > 0) {
          searchParams.set(param.key, createdAt[0].replace('Created At: ', '').replace(' days', ''));
        } else {
          searchParams.delete(param.key);
        }
        break;
      case SearchParamKeys.Tags:
        if (tags.length > 0) {
          searchParams.set(param.key, tags[0].replace('Tags: ', ''));
        } else {
          searchParams.delete(param.key);
        }
        break;
      default:
        break;
    }
  });
};