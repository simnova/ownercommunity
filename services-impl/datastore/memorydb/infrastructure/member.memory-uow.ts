import { Member, MemberProps } from "../../../../domain/contexts/community/member";
import { MemoryStore } from "../../../../services-seedwork-datastore-memorydb/infrastructure/memory-store";
import { MemoryUnitOfWork } from "../../../../services-seedwork-datastore-memorydb/infrastructure/memory-unit-of-work";
import { MemoryMemberRepository } from "./member.memory-repository";
import { InProcEventBusInstance, NodeEventBusInstance } from "../../../../event-bus-seedwork-node";

export const buildMemoryMemberUnitOfWork = (
  memberMemoryStore: MemoryStore<MemberProps>,
) => {
  return new MemoryUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, Member, memberMemoryStore, MemoryMemberRepository);
};