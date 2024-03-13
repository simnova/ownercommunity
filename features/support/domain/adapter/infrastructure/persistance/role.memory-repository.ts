import { CommunityEntityReference, CommunityProps } from "../../../../../../domain/contexts/community/community";
import { PermissionsProps } from "../../../../../../domain/contexts/community/permissions";
import { Role, RoleProps } from "../../../../../../domain/contexts/community/role";
import { RoleRepository } from "../../../../../../domain/contexts/community/role.repository";
import { DomainExecutionContext } from "../../../../../../domain/contexts/context";
import { MemoryRepositoryBase } from "../core/memory-store/memory-repository";


export class MemoryRole implements RoleProps {
  id: string;
  roleName: string;
  community: CommunityProps;
  setCommunityRef(community: CommunityEntityReference): void{
    this.community = community['props'] as CommunityProps;
  };
  isDefault: boolean;
  permissions: PermissionsProps;
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
} 

export class MemoryRoleRepository<
  PropType extends RoleProps, 
  DomainType extends Role<PropType>
  > extends MemoryRepositoryBase<DomainExecutionContext, PropType, DomainType> 
    implements RoleRepository<PropType> 
  {

    async getNewInstance(name: string, community: CommunityEntityReference): Promise<Role<PropType>>{
      return Role.getNewInstance(new MemoryRole as PropType, name, false, community, this.context);
    }

    async getById(id: string): Promise<Role<PropType>>{
      const role = await this.get(id);
      return role;
    }
}