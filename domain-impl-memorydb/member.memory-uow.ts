import { Member, MemberProps } from "../domain/contexts/community/member";
import { InProcEventBus } from "../domain-impl-event-bus/in-proc-event-bus";
import { NodeEventBus } from "../domain-impl-event-bus/node-event-bus";
import { MemoryStore } from "../domain-seedwork-memorydb/memory-store";
import { MemoryUnitOfWork } from "../domain-seedwork-memorydb/memory-unit-of-work";
import { MemoryMemberRepository } from "./member.memory-repository";

// export const MemoryMemberUnitOfWork = new MemoryUnitOfWork(InProcEventBus, NodeEventBus, Member, MemoryMemberRepository)

export const buildMemoryMemberUnitOfWork = (memberMemoryStore: MemoryStore<MemberProps>) => {
  return new MemoryUnitOfWork(InProcEventBus, NodeEventBus, Member, memberMemoryStore, MemoryMemberRepository);
};