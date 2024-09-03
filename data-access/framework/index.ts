import { BlobDataSource as BlobDataSourceClass} from "./data-sources/blob-data-source";
import { CognitiveSearchDataSource as CognitiveSearchDataSourceClass } from "./data-sources/cognitive-search-data-source";
import { CosmosDataSource as CosmosDataSourceClass } from "./data-sources/cosmos-data-source";
import { DomainDataSource as DomainDataSourceClass } from "./data-sources/domain-data-source";
import { MapsDataSource as MapsDataSourceClass } from "./data-sources/maps-data-source";
import { CybersourceDataSource as PaymentDataSourceClass } from "./data-sources/cybersource-data-source";
import { VercelDataSource as VercelDataSourceClass } from "./data-sources/vercel-data-source";
import { 
    DomainExecutionContext as DomainExecutionContextInterface, 
    SystemExecutionContext as SystemExecutionContextFunc, 
    ReadOnlyContext as ReadOnlyContextFunc 
} from "./domain/domain-execution-context";
import { BlobStorageInfrastructureService as BlobStorageInfrastructureServiceInterface} from "./infrastructure-services/blob-storage.infra.interface";
import { ApplicationServices as ApplicationServicesInterface } from "../src/app/application-services";
import { AppContext as AppContextInterface } from "./app/app-context-builder";
import * as GraphqlSchemaTypes from '../src/routes/http/graphql/schema/builder/generated';

export namespace App {
    export namespace DataSources {
        export const BlobDataSource = BlobDataSourceClass;
        export const CognitiveSearchDataSource = CognitiveSearchDataSourceClass
        export const CosmosDataSource = CosmosDataSourceClass;
        export const DomainDataSource = DomainDataSourceClass;
        export const MapsDataSource = MapsDataSourceClass;
        export const PaymentDataSource = PaymentDataSourceClass;
        export const VercelDataSource = VercelDataSourceClass
    }
    export namespace Domain {
        export interface DomainExecutionContext extends DomainExecutionContextInterface {}
        export const SystemExecutionContext = SystemExecutionContextFunc;
        export const ReadOnlyContext = ReadOnlyContextFunc;
    }
    // export namespace InfrastructureServices {
    //     export namespace Interfaces {
    //         export interface BlobStorageInfrastructureService extends BlobStorageInfrastructureServiceInterface {}
    //     }
    // }
    export interface ApplicationServices extends ApplicationServicesInterface {}
    export interface AppContext extends AppContextInterface {}
    export namespace ApiInterface {
        export import Graph = GraphqlSchemaTypes
    }
}

export namespace Infrastructure {
        export interface BlobStorageInterface extends BlobStorageInfrastructureServiceInterface {}
}


export namespace Community {
    export namespace Domain {
        export interface Props {}
        export interface EntityReference {}
        export const AggregateRoot = {}
        export const Repository = {}
        export const UnitOfWork = {}
    }
    export namespace MongoImpl {
        export interface DocumentType {}
        export const UnitOfWork = {}
        export const Repository = {}
        export const DomainAdapter = {}
        export const Converter = {}
    }    
}

