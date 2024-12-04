import { VendorUserCreatedEvent } from '../../../events/types/vendor-user-created';
import { AggregateRoot } from '../../../../../../seedwork/domain-seedwork/aggregate-root';
import { DomainEntityProps } from '../../../../../../seedwork/domain-seedwork/domain-entity';
import { DomainExecutionContext, SystemDomainExecutionContext } from '../../../domain-execution-context';
import * as ValueObjects from './vendor-user.value-objects';
import { VendorUserVisa } from './vendor-user.visa';
import { VendorUserPersonalInformation, VendorUserPersonalInformationEntityReference, VendorUserPersonalInformationProps } from './vendor-user-personal-information';

export interface VendorUserProps extends DomainEntityProps {
  readonly personalInformation: VendorUserPersonalInformationProps;
  
  email?: string;
  displayName: string;
  externalId:string;
  accessBlocked: boolean;
  tags?: string[];
  readonly userType?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly schemaVersion: string;
}

export interface VendorUserEntityReference extends Readonly<Omit<VendorUserProps, 'personalInformation' >> {
  readonly personalInformation: VendorUserPersonalInformationEntityReference;
}

export class VendorUser<props extends VendorUserProps> extends AggregateRoot<props, DomainExecutionContext, VendorUserVisa> implements VendorUserEntityReference  {
  private isNew: boolean = false;
  constructor(props: props, _context: DomainExecutionContext) { 
    super(props, _context, SystemDomainExecutionContext(), (context) => context.domainVisa.forVendorUser(this), {});
  }

  get id(): string {return this.props.id;}
  get personalInformation() {
    return new VendorUserPersonalInformation(this.props.personalInformation);
  }

  get email(): string {return this.props.email;}
  get displayName(): string {return this.props.displayName;}
  get externalId(): string {return this.props.externalId;}
  get accessBlocked(): boolean {return this.props.accessBlocked;}
  get tags(): string[] {return this.props.tags;}
  get userType(): string {return this.props.userType;}
  get updatedAt(): Date {return this.props.updatedAt;}
  get createdAt(): Date {return this.props.createdAt;}
  get schemaVersion(): string {return this.props.schemaVersion;}

  public static getNewUser<props extends VendorUserProps> (newProps:props,externalId:string,lastName:string, context: DomainExecutionContext, restOfName?:string): VendorUser<props> {
    newProps.externalId = externalId;
    let user = new VendorUser(newProps, context);
    user.MarkAsNew();
    user.ExternalId=(externalId);
    if (restOfName !== undefined) {
      user.personalInformation.identityDetails.RestOfName=(restOfName);
      user.personalInformation.identityDetails.LegalNameConsistsOfOneName=(false);
      user.DisplayName=(`${restOfName} ${lastName}`);
    } else {
      user.personalInformation.identityDetails.LegalNameConsistsOfOneName=(true);
      user.DisplayName=(lastName);
    }
    user.personalInformation.identityDetails.LastName=(lastName);
    user.isNew = false;
    return user;
  }

  private MarkAsNew(): void {
    this.isNew = true;
    this.addIntegrationEvent(VendorUserCreatedEvent,{userId: this.props.id});
  }

  private validateVisa(): void {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.isEditingOwnAccount)) {
      throw new Error('Unauthorized');
    }
  }

  set Email(email:string) {
    this.props.email = (new ValueObjects.Email(email)).valueOf();
  }

  set DisplayName(displayName:string) {
    this.validateVisa();
    this.props.displayName = (new ValueObjects.DisplayName(displayName)).valueOf();
  }

  set ExternalId(externalId:string) {
    this.validateVisa();
    this.props.externalId = (new ValueObjects.ExternalId(externalId)).valueOf();
  }

  set AccessBlocked(accessBlocked:boolean) {
    this.validateVisa();
    this.props.accessBlocked = accessBlocked;
  }

  set Tags(tags:string[]) {
    this.validateVisa();
    this.props.tags = tags;
  }
}

