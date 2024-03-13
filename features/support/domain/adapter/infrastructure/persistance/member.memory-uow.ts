import { Member, MemberProps } from "../../../../../../domain/contexts/community/member";
import { InProcEventBus } from "../../../../../../domain/infrastructure/core/events/in-proc-event-bus";
import { NodeEventBus } from "../../../../../../domain/infrastructure/core/events/node-event-bus";
import { MemoryStore } from "../core/memory-store/memory-store";
import { MemoryUnitOfWork } from "../core/memory-store/memory-unit-of-work";
import { MemoryMemberRepository } from "./member.memory-repository";

// export const MemoryMemberUnitOfWork = new MemoryUnitOfWork(InProcEventBus, NodeEventBus, Member, MemoryMemberRepository)

export const buildMemoryMemberUnitOfWork = (memberMemoryStore: MemoryStore<MemberProps>) => {
  return new MemoryUnitOfWork(InProcEventBus, NodeEventBus, Member, memberMemoryStore, MemoryMemberRepository);
};