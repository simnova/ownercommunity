import { UserCreatedEvent } from '../../../events/types/user-created';
import { AggregateRoot } from '../../../../../../seedwork/domain-seedwork/aggregate-root';
import { EntityProps } from '../../../../../../seedwork/domain-seedwork/entity';
import { DomainExecutionContext } from '../../../domain-execution-context';
import * as ValueObjects from './end-user.value-objects';
import { CommunityVisa } from '../../community/community.visa';
import { EndUserIdentityDetails, EndUserIdentityDetailsProps } from './end-user-identity-details';
import { EndUserContactInformation, EndUserContactInformationProps } from './end-user-contact-information';

export interface EndUserProps extends EntityProps {
  identityDetails: EndUserIdentityDetailsProps;
  contactInformation: EndUserContactInformationProps;
  
  displayName: string;
  externalId:string;
  accessBlocked: boolean;
  tags?: string[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly schemaVersion: string;
}

export interface EndUserEntityReference extends Readonly<EndUserProps> {}

export class EndUser<props extends EndUserProps> extends AggregateRoot<props> implements EndUserEntityReference  {
  private isNew: boolean = false;
  private readonly visa: CommunityVisa;
  constructor(props: props, context?:DomainExecutionContext) { super(props); }

  get id(): string {return this.props.id;}
  get identityDetails(): EndUserIdentityDetailsProps {
    return new EndUserIdentityDetails(this.props.identityDetails);
  }
  get contactInformation(): EndUserContactInformationProps {
    return new EndUserContactInformation(this.props.contactInformation);
  }

  get displayName(): string {return this.props.displayName;}
  get externalId(): string {return this.props.externalId;}
  get accessBlocked(): boolean {return this.props.accessBlocked;}
  get tags(): string[] {return this.props.tags;}
  get updatedAt(): Date {return this.props.updatedAt;}
  get createdAt(): Date {return this.props.createdAt;}
  get schemaVersion(): string {return this.props.schemaVersion;}

  public static getReadOnlyUser<readonlyProps extends EndUserProps> (props:readonlyProps): EndUserEntityReference{
    return new EndUser(props);
  }

  public static getNewUser<props extends EndUserProps> (newProps:props,externalId:string,lastName:string,restOfName?:string): EndUser<props> {
    newProps.externalId = externalId;
    let user = new EndUser(newProps);
    user.ExternalId=(externalId);
    if (restOfName !== undefined) {
      user.identityDetails.restOfName=(restOfName);
      user.identityDetails.legalNameConsistsOfOneName=(false);
      user.DisplayName=(`${restOfName} ${lastName}`);
    } else {
      user.identityDetails.legalNameConsistsOfOneName=(true);
      user.DisplayName=(lastName);
    }
    user.identityDetails.lastName=(lastName);
    user.MarkAsNew();
    return user;
  }

  private MarkAsNew(): void {
    this.addIntegrationEvent(UserCreatedEvent,{userId: this.props.id});
  }

  set DisplayName(displayName:string) {
    this.props.displayName = (new ValueObjects.DisplayName(displayName)).valueOf();
  }

  set ExternalId(externalId:string) {
    this.props.externalId = (new ValueObjects.ExternalId(externalId)).valueOf();
  }

  set AccessBlocked(accessBlocked:boolean) {
    if (!this.visa.determineIf((permissions) => permissions.isSystemAccount)) {
      throw new Error('Unauthorized');
    }
    this.props.accessBlocked = accessBlocked;
  }

  set Tags(tags:string[]) {
    if (!this.visa.determineIf((permissions) => permissions.isEditingOwnMemberAccount))
    this.props.tags = tags;
  }
}

