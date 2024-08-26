export interface EntityRepository<props extends EntityProps> extends Repository<Entity<props>> {
  getNewInstance(name: string): Promise<Entity<props>>;
  getById(id: string): Promise<Entity<props>>;
  getAll(): Promise<Entity<props>[]>
}