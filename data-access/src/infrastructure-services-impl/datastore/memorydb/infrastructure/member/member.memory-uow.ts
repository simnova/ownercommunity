import { Member, MemberProps } from "../../../../../app/domain/contexts/community/member/member";
import { MemoryStore } from "../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-store";
import { MemoryUnitOfWork } from "../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-unit-of-work";
import { MemoryMemberRepository } from "./member.memory-repository";
import { SyncDomainEventBusInstance, NodeEventBusInstance } from "../../../../../../seedwork/event-bus-seedwork-node";

export const buildMemoryMemberUnitOfWork = (
  memberMemoryStore: MemoryStore<MemberProps>,
) => {
  return new MemoryUnitOfWork(SyncDomainEventBusInstance, NodeEventBusInstance, Member, memberMemoryStore, MemoryMemberRepository);
};