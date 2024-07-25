# Context: Property 

## Domain Structure:
- **Property** (aggregate root)
  - Community (entity reference) -> Community.Community
  - Owner (entity reference) -> Community.Member
  - Location (entity reference)
  - ListingDetails
    - BedroomDetails
    - AdditionalAmenities
- Location (aggregate root)