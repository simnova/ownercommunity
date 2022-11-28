import { NodeEventBus } from '../core/events/node-event-bus';
import { PropertyListingIndexDocument, PropertyListingIndexSpec } from './property-search-index-format';
import { CognitiveSearch } from '../../../infrastructure/services/cognitive-search';
import { PropertyUnitOfWork } from '../persistence/property.uow';
import { SystemExecutionContext } from '../execution-context';
import { PropertyUpdatedEvent } from '../../events/property-updated';
import { GeographyPoint } from '@azure/search-documents';
import dayjs from 'dayjs';
import { PropertyDomainAdapter } from '../persistence/property.domain-adapter';
import { Property } from '../../contexts/property/property';
import { MongoPropertyRepository } from '../persistence/property.mongo-repository';
import retry from 'async-retry';
const crypto = require('crypto');

export default () => {
  NodeEventBus.register(PropertyUpdatedEvent, async (payload) => {
    console.log(`Property Updated - Search Index Integration: ${JSON.stringify(payload)} and PropertyId: ${payload.id}`);

    const context = await SystemExecutionContext();
    await PropertyUnitOfWork.withTransaction(context, async (repo) => {
      let property = await repo.getById(payload.id);

      const updatedAdditionalAmenities = property.listingDetail?.additionalAmenities?.map((additionalAmenity) => {
        return { category: additionalAmenity.category, amenities: additionalAmenity.amenities };
      });

      const coordinates = property.location?.position?.coordinates;
      let geoGraphyPoint: GeographyPoint = null;
      if (coordinates && coordinates.length === 2) {
        geoGraphyPoint = new GeographyPoint({ longitude: coordinates[1], latitude: coordinates[0] });
      }

      let updatedDate = property.updatedAt.toISOString();
      updatedDate = dayjs(property.updatedAt.toISOString().split('T')[0]).toISOString();

      let createdDate = property.createdAt.toISOString();
      createdDate = dayjs(property.createdAt.toISOString().split('T')[0]).toISOString();

      let listingDoc: Partial<PropertyListingIndexDocument> = {
        id: property.id,
        communityId: property.community.id,
        name: property.propertyName,
        type: property.propertyType,
        bedrooms: property.listingDetail?.bedrooms,
        amenities: property.listingDetail?.amenities,
        additionalAmenities: updatedAdditionalAmenities,
        price: property.listingDetail?.price,
        bathrooms: property.listingDetail?.bathrooms,
        squareFeet: property.listingDetail?.squareFeet,
        position: geoGraphyPoint,
        images: property.listingDetail?.images,
        listingAgentCompany: property.listingDetail?.listingAgentCompany,
        address: {
          streetNumber: property.location?.address?.streetNumber,
          streetName: property.location?.address?.streetName,
          municipality: property.location?.address?.municipality,
          municipalitySubdivision: property.location?.address?.municipalitySubdivision,
          localName: property.location?.address?.localName,
          countrySecondarySubdivision: property.location?.address?.countrySecondarySubdivision,
          countryTertiarySubdivision: property.location?.address?.countryTertiarySubdivision,
          countrySubdivision: property.location?.address?.countrySubdivision,
          countrySubdivisionName: property.location?.address?.countrySubdivisionName,
          postalCode: property.location?.address?.postalCode,
          extendedPostalCode: property.location?.address?.extendedPostalCode,
          countryCode: property.location?.address?.countryCode,
          country: property.location?.address?.country,
          countryCodeISO3: property.location?.address?.countryCodeISO3,
          freeformAddress: property.location?.address?.freeformAddress,
          streetNameAndNumber: property.location?.address?.streetNameAndNumber,
          crossStreet: property.location?.address?.crossStreet,
          routeNumbers: property.location?.address?.routeNumbers,
        },
        listedForSale: property.listedForSale,
        listedForRent: property.listedForRent,
        listedForLease: property.listedForLease,
        updatedAt: updatedDate,
        createdAt: createdDate,
        tags: property.tags,
      };

      let listingDocCopy = JSON.parse(JSON.stringify(listingDoc));
      delete listingDocCopy.updatedAt;

      const hash = crypto.createHash('sha256').update(JSON.stringify(listingDocCopy)).digest('base64');

      const maxAttempt = 3;
      if (property.hash !== hash) {
        await retry(
          async (failedCB, currentAttempt) => {
            if (currentAttempt > maxAttempt) {
              property.requestSetUpdateIndexFailedDate(new Date());
              property.requestSetHash(hash);
              await repo.save(property);
              console.log('Index update failed: ', property.updateIndexFailedDate);
              console.log(property);
              return;
            }
            await updateSearchIndex(listingDoc, property, hash, repo);
          },
          {
            retries: maxAttempt,
          }
        );
      }
    });
  });
};

async function updateSearchIndex(listingDoc: Partial<PropertyListingIndexDocument>, property: Property<PropertyDomainAdapter>, hash: any, repo: MongoPropertyRepository<PropertyDomainAdapter>) {
  let cognitiveSearch = new CognitiveSearch();
  // await cognitiveSearch.createIndexIfNotExists(propertyListingIndexSpec.name, propertyListingIndexSpec);
  await cognitiveSearch.createOrUpdateIndex(PropertyListingIndexSpec.name, PropertyListingIndexSpec);
  await cognitiveSearch.indexDocument(PropertyListingIndexSpec.name, listingDoc);
  console.log(`Property Updated - Index Updated: ${JSON.stringify(listingDoc)}`);

  property.requestSetLastIndexed(new Date());
  property.requestSetHash(hash);
  await repo.save(property);
  console.log('Index update successful: ', property.lastIndexed);
}


