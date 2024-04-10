import { GeographyPoint } from '@azure/search-documents';
import { SpanStatusCode, trace } from '@opentelemetry/api';
import { SeverityNumber, logs } from '@opentelemetry/api-logs';
import retry from 'async-retry';
import crypto from 'crypto';
import dayjs from 'dayjs';
import { CognitiveSearchDomain } from '../../infrastructure/cognitive-search/interfaces';
import { Property, PropertyProps } from '../../contexts/property/property';
import { PropertyUpdatedEvent } from '../types/property-updated';
import { SystemExecutionContext } from '../../contexts/domain-execution-context';
// import { PropertyUnitOfWork } from '../../../domain-impl/services/datastore/mongodb/infrastructure/property.mongo-uow';
import { PropertyUnitOfWork } from '../../contexts/property/property.uow';
import { PropertyListingIndexDocument, PropertyListingIndexSpec } from '../../infrastructure/cognitive-search/property-search-index-format';
import { EventBusInstance } from '../event-bus';
import { PropertyRepository } from '../../contexts/property/property.repository';

export default (
  cognitiveSearch: CognitiveSearchDomain,
  propertyUnitOfWork: PropertyUnitOfWork
) => { EventBusInstance.register(PropertyUpdatedEvent, async (payload) => {
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

        const context = SystemExecutionContext();
        await propertyUnitOfWork.withTransaction(context, async (repo) => {
          let property = await repo.getById(payload.id);
          const propertyHash = property.hash;

          let listingDoc: Partial<PropertyListingIndexDocument> = convertToIndexDocument(property);

          const hash = generateHash(listingDoc);

          const maxAttempt = 3;

          if (property.hash === hash) {
            console.log(`Updated Property hash [${hash}] is same as previous hash [[${propertyHash}]]`);
            span.addEvent(`Updated Property hash [${hash}] is same as previous hash [[${propertyHash}]]`);
            span.setStatus({ code: SpanStatusCode.OK, message: 'Index update skipped' });
          } else {
            console.log(`Updated Property hash [${hash}] is different from previous hash [[${propertyHash}]]`);
            span.addEvent('Property hash is different from previous hash');
            await retry(
              async (failedCB, currentAttempt) => {
                if (currentAttempt > maxAttempt) {
                  span.setStatus({ code: SpanStatusCode.ERROR, message: 'Index update failed' });
                  property.UpdateIndexFailedDate = new Date();
                  property.Hash = hash;
                  await repo.save(property);
                  console.log('Index update failed: ', property.updateIndexFailedDate);
                  console.log(property);
                } else {
                  span.addEvent('Index update attempt: ' + currentAttempt);
                  await updateSearchIndex(listingDoc, property, hash, repo);
                }
              },
              {
                retries: maxAttempt,
              }
            );
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

  async function updateSearchIndex(
    listingDoc: Partial<PropertyListingIndexDocument>,
    property: Property<PropertyProps>,
    hash: any,
    repo: PropertyRepository<PropertyProps>
  ) {
    await cognitiveSearch.createOrUpdateIndex(PropertyListingIndexSpec.name, PropertyListingIndexSpec);
    await cognitiveSearch.indexDocument(PropertyListingIndexSpec.name, listingDoc);
    console.log(`Property Updated - Index Updated: ${JSON.stringify(listingDoc)}`);

    property.LastIndexed = new Date();
    property.Hash = hash;
    await repo.save(property);
    console.log('Index update successful: ', property.lastIndexed);
  }
};

function generateHash(listingDoc: Partial<PropertyListingIndexDocument>) {
  const listingDocCopy = JSON.parse(JSON.stringify(listingDoc));
  delete listingDocCopy.updatedAt;
  const hash = crypto.createHash('sha256').update(JSON.stringify(listingDocCopy)).digest('base64');
  return hash;
}

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
