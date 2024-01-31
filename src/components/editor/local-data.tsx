import { createLocalStorageStateHook } from 'use-local-storage-state';

// Todos.tsx
export const usePages = createLocalStorageStateHook('pages',
  [
    {
      id: 0, title: 'Home', path: '/', expanded: true, children: [
        { id: 11, title: 'About', path: '/about' },
        { id: 22, title: 'Contact', path: '/contact' },
        { id: 33, title: 'Blog', path: '/blog' }
      ]
    }
  ]
)

 export interface LoadedPageLayout {
  id: string;
  title: string;
  pageType: string;
  path: string;
  expanded: boolean;
  children: LoadedPageLayout[];
  layout: any;
}
export interface UnloadedPageLayout {
  loaded: boolean;
}
export type PageLayouts = [LoadedPageLayout]|[UnloadedPageLayout];

export const arePageLayoutsLoaded = (pageLayouts: PageLayouts): pageLayouts is [LoadedPageLayout] => {
  return pageLayouts !== undefined && pageLayouts.length > 0 && (pageLayouts[0] as LoadedPageLayout).id !== undefined;
}



export const usePageLayouts = createLocalStorageStateHook<PageLayouts>('pageLayouts',[{loaded:false}]);

export const mockPropertyData = {
  property: {
    listedForLease: true,
    listedForRent: false,
    listedForSale: false,
    owner: {
    memberName: 'John Johnson',
    },
    propertyName: 'My Apartment',
    propertyType: 'Apartment',
    location: {
    address: {
        streetName: 'Mockingbird Ln',
        streetNumber: '1313',
    }
    },
    listingDetail: {
      price: 200000,
      rentHigh: 2000,
      rentLow: 1250,
      lease: 12,
      maxGuests: 8,
      bedrooms: 2,
      bedroomDetails: [
        {
          roomName: 'Master Bedroom',
          bedDescriptions: ['Queen'],
        },
        {
          roomName: 'Guest Bedroom',
          bedDescriptions: ['Double'],
        },
        {
          roomName: 'Living Room',
          bedDescriptions: ['Pullout Couch'],
        },
      ],
      bathrooms: 1.5,
      squareFeet: 1200,
      description: 'A very nice apartment',
      amenities: ['Gym', 'A/C'],
      additionalAmenities: [
          {
            amenities: ['Wifi', 'Laundry', 'Pets Allowed']
          },
      ],
      images: [],
      video: '',
      floorPlanImages: [],
      listingAgent: 'Ryan Smith',
      listingAgentPhone: '702-555-5555',
      listingAgentEmail: 'ryan.smith@gmail.com',
      listingAgentCompany: 'ABC Real Estate',
      listingAgentCompanyPhone: '123-456-7890',
      listingAgentCompanyEmail: 'abc@abcrealestate.com',
      listingAgentCompanyWebsite: 'www.abcrealestate.com',
      listingAgentCompanyAddress: '123 Main St, City, State 12345',
    }
  }
}