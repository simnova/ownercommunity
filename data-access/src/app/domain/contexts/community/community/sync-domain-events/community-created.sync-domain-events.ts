import { DomainEventImpl } from "../../../../../../../seedwork/domain-seedwork/domain-event"
import { Community, CommunityProps } from "../community"

export interface CommunityCreatedSyncDomainEventProps {
    name: string
}
export class CommunityCreatedSyncDomainEvent extends DomainEventImpl<CommunityCreatedSyncDomainEventProps> {}

// write a function with signature (event: CommunityCreateEvent) => void 
// where the function has 'this' context of Community<CommunityProps>
// and the function is named 'applyCommunityCreateEvent'
// and the function updates the 'name' property of the Community<CommunityProps> instance
// with the value of the 'name' property of the CommunityCreateEvent instance

const setCommunityName = function(this: Community<CommunityProps>, event: CommunityCreatedSyncDomainEvent) {
  this.props.name = event.payload.name
}

// export const communitySyncDomainEventMap = new Map<string, Array<(this: Community<CommunityProps>, event: any) => void>([
export const CommunityCreatedSyncDomainEventHandlers: ((event: CommunityCreatedSyncDomainEvent) => void)[] = [
  setCommunityName
]