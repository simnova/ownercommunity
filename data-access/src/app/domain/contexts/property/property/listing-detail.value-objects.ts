import { VOString, VOArray, VOFloat, VOInteger, VOOptional } from '@lucaspaganini/value-objects';

export { Email } from '../../value-objects';

class PriceBase extends VOFloat({ min: 0 }) {}
export class Price extends VOOptional(PriceBase, [null]) {}
class RentHighBase extends VOFloat({ min: 0 }) {}
export class RentHigh extends VOOptional(RentHighBase, [null]) {}
class RentLowBase extends VOFloat({ min: 0 }) {}
export class RentLow extends VOOptional(RentLowBase, [null]) {}
class LeaseBase extends VOFloat({ min: 0 }) {}
export class Lease extends VOOptional(LeaseBase, [null]) {}
class MaxGuestsBase extends VOInteger({ min: 0, max: 1000 }) {}
export class MaxGuests extends VOOptional(MaxGuestsBase, [null]) {}
class BedroomsBase extends VOInteger({ min: 0, max: 1000 }) {}
export class Bedrooms extends VOOptional(BedroomsBase, [null]) {}
class BathroomsBase extends VOFloat({ min: 0, max: 1000 }) {}
export class Bathrooms extends VOOptional(BathroomsBase, [null]) {}
class SquareFeetBase extends VOInteger({ min: 0, max: 1000000 }) {}
export class SquareFeet extends VOOptional(SquareFeetBase, [null]) {}
class YearBuiltBase extends VOInteger({ min: 0, max: 9999 }) {}
export class YearBuilt extends VOOptional(YearBuiltBase, [null]) {}
class LotSizeBase extends VOInteger({ min: 0, max: 1000000 }) {}
export class LotSize extends VOOptional(LotSizeBase, [null]) {}
class DescriptionBase extends VOString({ trim: true, maxLength: 5000 }) {}
export class Description extends VOOptional(DescriptionBase, [null]) {}

class Amenity extends VOString({ trim: true, maxLength: 100 }) {}
class AmenitiesBase extends VOArray(Amenity, { maxLength: 50 }) {}
export class Amenities extends VOOptional(AmenitiesBase, [null]) {}

class Image extends VOString({ trim: true }) {}
class ImagesBase extends VOArray(Image, { maxLength: 50 }) {}
export class Images extends VOOptional(ImagesBase, [null]) {}

class VideoBase extends VOString({ trim: true }) {}
export class Video extends VOOptional(VideoBase, [null]) {}
class FloorPlanBase extends VOString({ trim: true, maxLength: 2000 }) {}
export class FloorPlan extends VOOptional(FloorPlanBase, [null]) {}
class FloorPlanImagesBase extends VOArray(Image, { maxLength: 50 }) {}
export class FloorPlanImages extends VOOptional(FloorPlanImagesBase, [null]) {}

class ListingAgentBase extends VOString({ trim: true, maxLength: 500 }) {}
export class ListingAgent extends VOOptional(ListingAgentBase, [null]) {}
class ListingAgentPhoneBase extends VOString({ trim: true, maxLength: 100 }) {}
export class ListingAgentPhone extends VOOptional(ListingAgentPhoneBase, [null]) {}
class ListingAgentWebsiteBase extends VOString({ trim: true, maxLength: 1000 }) {}
export class ListingAgentWebsite extends VOOptional(ListingAgentWebsiteBase, [null]) {}

class ListingAgentCompanyBase extends VOString({ trim: true, maxLength: 500 }) {}
export class ListingAgentCompany extends VOOptional(ListingAgentCompanyBase, [null]) {}
class ListingAgentCompanyPhoneBase extends VOString({ trim: true, maxLength: 100 }) {}
export class ListingAgentCompanyPhone extends VOOptional(ListingAgentCompanyPhoneBase, [null]) {}
class ListingAgentCompanyWebsiteBase extends VOString({ trim: true, maxLength: 1000 }) {}
export class ListingAgentCompanyWebsite extends VOOptional(ListingAgentCompanyWebsiteBase, [null]) {}
class ListingAgentCompanyAddressBase extends VOString({ trim: true, maxLength: 1000 }) {}
export class ListingAgentCompanyAddress extends VOOptional(ListingAgentCompanyAddressBase, [null]) {}
