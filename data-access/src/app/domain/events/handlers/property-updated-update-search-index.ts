import { GeographyPoint } from '@azure/search-documents';
import { SpanStatusCode, trace } from '@opentelemetry/api';
import { SeverityNumber, logs } from '@opentelemetry/api-logs';
import dayjs from 'dayjs';
import { Property, PropertyProps } from '../../contexts/property/property/property';
import { SystemDomainExecutionContext } from '../../domain-execution-context';
import { CognitiveSearchDomain } from '../../infrastructure/cognitive-search/interfaces';
import { PropertyUpdatedEvent } from '../types/property-updated';
// import { PropertyUnitOfWork } from '../../../domain-impl/services/datastore/mongodb/infrastructure/property.mongo-uow';
import { PropertyUnitOfWork } from '../../contexts/property/property/property.uow';
import { PropertyListingIndexDocument, PropertyListingIndexSpec } from '../../infrastructure/cognitive-search/property-search-index-format';
import { EventBusInstance } from '../event-bus';
import { generateHash, updateSearchIndexWithRetry } from './update-search-index-helpers';
import { SystemInfrastructureContext } from '../../../init/infrastructure-context';

export default (cognitiveSearch: CognitiveSearchDomain, propertyUnitOfWork: PropertyUnitOfWork) => {
  EventBusInstance.register(PropertyUpdatedEvent, async (payload) => {
    const tracer = trace.getTracer('PG:data-access');
    tracer.startActiveSpan('updateSearchIndex', async (span) => {
      // add logging: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry-exporter/samples-dev/logSample.ts

      try {
        const logger = logs.getLogger('default');
        logger.emit({
          body: `xxyyxxLOGxxyyxx - Property Updated - Search Index Integration: ${JSON.stringify(payload)} and PropertyId: ${payload.id}`,
          severityNumber: SeverityNumber.INFO,
          severityText: 'INFO',
          attributes: {
            'log.type': 'LogRecord',
          },
        });

        // console.log(`Property Updated - Search Index Integration: ${JSON.stringify(payload)} and PropertyId: ${payload.id}`);
        const context = SystemDomainExecutionContext();
        await propertyUnitOfWork.withTransaction(context, SystemInfrastructureContext(), async (repo) => {
          let updatedProperty = await repo.getById(payload.id);
          let indexDoc = convertToIndexDocument(updatedProperty);
          const newHash = generateHash(indexDoc);

          if (updatedProperty.hash === newHash) {
            console.log(`Updated Property hash [${newHash}] is same as previous hash [[${updatedProperty.hash}]]`);
            span.addEvent(`Updated Property hash [${newHash}] is same as previous hash [[${updatedProperty.hash}]]`);
            span.setStatus({ code: SpanStatusCode.OK, message: 'Index update skipped' });
          } else {
            console.log(`Updated Property hash [${newHash}] is different from previous hash [[${updatedProperty.hash}]]`);
            span.addEvent('Property hash is different from previous hash');
            try {
              const indexedAt = await updateSearchIndexWithRetry(cognitiveSearch, PropertyListingIndexSpec, indexDoc, 3);
              updatedProperty.LastIndexed = indexedAt;
              updatedProperty.Hash = newHash;
            } catch (error) {
              span.setStatus({ code: SpanStatusCode.ERROR, message: 'Index update failed' });
              updatedProperty.UpdateIndexFailedDate = new Date();
              console.log('Index update failed: ', updatedProperty.UpdateIndexFailedDate);
            }
            await repo.save(updatedProperty);

            span.setStatus({ code: SpanStatusCode.OK, message: 'Index update successful' });
          }
        });
        span.end();
      } catch (ex) {
        span.recordException(ex);
        span.setStatus({ code: SpanStatusCode.ERROR, message: ex.message });
        span.end();
        throw ex;
      }
    });
  });
};
function convertToIndexDocument(property: Property<PropertyProps>) {
  const updatedAdditionalAmenities = property.listingDetail?.additionalAmenities?.map((additionalAmenity) => {
    return { category: additionalAmenity.category, amenities: additionalAmenity.amenities };
  });

  const coordinates = property.location?.position?.coordinates;
  let geoGraphyPoint: GeographyPoint = null;
  if (coordinates && coordinates.length === 2) {
    geoGraphyPoint = new GeographyPoint({ longitude: coordinates[1], latitude: coordinates[0] });
  }

  const updatedDate = dayjs(property.updatedAt.toISOString().split('T')[0]).toISOString();
  const createdDate = dayjs(property.createdAt.toISOString().split('T')[0]).toISOString();

  let listingDoc: Partial<PropertyListingIndexDocument> = {
    id: property.id,
    communityId: property.community.id,
    name: property.propertyName,
    type: property.propertyType?.toLowerCase(),
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
  return listingDoc;
}
