import { ApplicationServices,
  MemberBlobApi,
  PropertyBlobApi,
  PropertySearchApi,
  ServiceTicketSearchApi,
  UserDataApi,
  RoleDataApi,
  ServiceDataApi,
  ServiceTicketDataApi,
  ViolationTicketDataApi,
  MemberDataApi,
  PropertyDataApi,
  UserDomainApi,
  MemberDomainApi,
  RoleDomainApi,
  PropertyDomainApi,
  ServiceDomainApi,
  ServiceTicketDomainApi,
  PropertyMapsApi,
  PaymentApi,
} from "../application-services";
import { UserModel, RoleModel, PropertyModel, MemberModel, ServiceModel, ServiceTicketModel, ViolationTicketModel } from "../external-dependencies/datastore";
import { ViolationTicketUnitOfWork, MemberUnitOfWork, PropertyUnitOfWork, RoleUnitOfWork, ServiceTicketUnitOfWork, ServiceUnitOfWork, UserUnitOfWork } from "../external-dependencies/domain";
import { MemberBlobApiImpl, PropertyBlobApiImpl} from '../application-services-impl/blob-storage';
import { PropertySearchApiImpl, ServiceTicketSearchApiImpl } from '../application-services-impl/cognitive-search';
import { UserDataApiImpl, RoleDataApiImpl, ServiceDataApiImpl, ServiceTicketDataApiImpl, ViolationTicketDataApiImpl, MemberDataApiImpl, PropertyDataApiImpl } from '../application-services-impl/datastore';
import { UserDomainApiImpl, RoleDomainApiImpl, ServiceDomainApiImpl, ServiceTicketDomainApiImpl, MemberDomainApiImpl, PropertyDomainApiImpl, ViolationTicketDomainApiImpl } from "../application-services-impl/domain";
import { PropertyMapsApiImpl } from "../application-services-impl/maps";
import { AppContext } from "./app-context-builder";
import { ViolationTicketDomainApi } from "../application-services/domain";
import { PaymentApiImpl } from "../application-services-impl/payment";
import { CommunityApi, CommunityApiImpl } from "../application-services/community";
export class ApplicationServicesBuilder implements ApplicationServices {
  community: CommunityApi;
  memberBlobApi: MemberBlobApi;
  propertyBlobApi: PropertyBlobApi;
  propertySearchApi: PropertySearchApi;
  serviceTicketSearchApi: ServiceTicketSearchApi;
  userDataApi: UserDataApi;
  roleDataApi: RoleDataApi;
  serviceDataApi: ServiceDataApi;
  serviceTicketDataApi: ServiceTicketDataApi;
  violationTicketDataApi: ViolationTicketDataApi;
  memberDataApi: MemberDataApi;
  propertyDataApi: PropertyDataApi;
  userDomainApi: UserDomainApi;
  memberDomainApi: MemberDomainApi;
  roleDomainApi: RoleDomainApi;
  propertyDomainApi: PropertyDomainApi;
  serviceDomainApi: ServiceDomainApi;
  serviceTicketDomainApi: ServiceTicketDomainApi;
  violationTicketDomainApi: ViolationTicketDomainApi;
  propertyMapApi: PropertyMapsApi;
  paymentApi: PaymentApi;

  constructor(context: AppContext) {
    this.community = new CommunityApiImpl(context);
    this.memberBlobApi = new MemberBlobApiImpl({ context });
    this.propertyBlobApi = new PropertyBlobApiImpl({ context });
    this.propertySearchApi = new PropertySearchApiImpl({ context });
    this.serviceTicketSearchApi = new ServiceTicketSearchApiImpl({ context });
    this.userDataApi = new UserDataApiImpl({ modelOrCollection: UserModel, context });
    this.roleDataApi = new RoleDataApiImpl({ modelOrCollection: RoleModel, context });
    this.serviceDataApi = new ServiceDataApiImpl({ modelOrCollection: ServiceModel, context });
    this.serviceTicketDataApi = new ServiceTicketDataApiImpl({ modelOrCollection: ServiceTicketModel, context });
    this.violationTicketDataApi = new ViolationTicketDataApiImpl({ modelOrCollection: ViolationTicketModel, context });
    this.memberDataApi = new MemberDataApiImpl({ modelOrCollection: MemberModel, context });
    this.propertyDataApi = new PropertyDataApiImpl({ modelOrCollection: PropertyModel, context });
    this.userDomainApi = new UserDomainApiImpl({ unitOfWork: UserUnitOfWork, context });
    this.memberDomainApi = new MemberDomainApiImpl({ unitOfWork: MemberUnitOfWork, context });
    this.roleDomainApi = new RoleDomainApiImpl({ unitOfWork: RoleUnitOfWork, context });
    this.propertyDomainApi = new PropertyDomainApiImpl({ unitOfWork: PropertyUnitOfWork, context });
    this.serviceDomainApi = new ServiceDomainApiImpl({ unitOfWork: ServiceUnitOfWork, context });
    this.serviceTicketDomainApi = new ServiceTicketDomainApiImpl({ unitOfWork: ServiceTicketUnitOfWork, context });
    this.violationTicketDomainApi = new ViolationTicketDomainApiImpl({ unitOfWork: ViolationTicketUnitOfWork, context });
    this.propertyMapApi = new PropertyMapsApiImpl({ context });
    this.paymentApi = new PaymentApiImpl({ context });
  }
}