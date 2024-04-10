import { VOString, VOArray, VOFloat, VOInteger } from '@lucaspaganini/value-objects';

export { Email } from '../value-objects';

export class Price extends VOFloat({ min: 0 }) {}
export class RentHigh extends VOFloat({ min: 0 }) {}
export class RentLow extends VOFloat({ min: 0 }) {}
export class Lease extends VOFloat({ min: 0 }) {}
export class MaxGuests extends VOInteger({ min: 0, max: 1000 }) {}
export class Bedrooms extends VOInteger({ min: 0, max: 1000 }) {}
export class Bathrooms extends VOFloat({ min: 0, max: 1000 }) {}
export class SquareFeet extends VOInteger({ min: 0, max: 1000000 }) {}
export class YearBuilt extends VOInteger({ min: 0, max: 9999 }) {}
export class LotSize extends VOInteger({ min: 0, max: 1000000 }) {}
export class Description extends VOString({ trim: true, maxLength: 5000 }) {}

class Amenity extends VOString({ trim: true, maxLength: 100 }) {}
export class Amenities extends VOArray(Amenity, { maxLength: 50 }) {}

class Image extends VOString({ trim: true }) {}
export class Images extends VOArray(Image, { maxLength: 50 }) {}

export class Video extends VOString({ trim: true }) {}
export class FloorPlan extends VOString({ trim: true, maxLength: 2000 }) {}
export class FloorPlanImages extends VOArray(Image, { maxLength: 50 }) {}

export class ListingAgent extends VOString({ trim: true, maxLength: 500 }) {}
export class ListingAgentPhone extends VOString({ trim: true, maxLength: 100 }) {}
export class ListingAgentWebsite extends VOString({ trim: true, maxLength: 1000 }) {}

export class ListingAgentCompany extends VOString({ trim: true, maxLength: 500 }) {}
export class ListingAgentCompanyPhone extends VOString({ trim: true, maxLength: 100 }) {}
export class ListingAgentCompanyWebsite extends VOString({ trim: true, maxLength: 1000 }) {}
export class ListingAgentCompanyAddress extends VOString({ trim: true, maxLength: 1000 }) {}
