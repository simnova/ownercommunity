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