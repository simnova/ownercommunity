import { Member, MemberProps } from "../../../../../domain/contexts/community/member";
import { MemoryStore } from "../../../../../domain-impl-seedwork-datastore-memorydb/memory-store";
import { MemoryUnitOfWork } from "../../../../../domain-impl-seedwork-datastore-memorydb/memory-unit-of-work";
import { MemoryMemberRepository } from "./member.memory-repository";
import { InProcEventBusInstance, NodeEventBusInstance } from "../../../../../event-bus-seedwork-node";

export const buildMemoryMemberUnitOfWork = (
  memberMemoryStore: MemoryStore<MemberProps>,
) => {
  return new MemoryUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, Member, memberMemoryStore, MemoryMemberRepository);
};