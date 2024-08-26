export interface StaffUserRepository<props extends StaffUserProps> extends Repository<StaffUser<props>> {
  getNewInstance(name: string): Promise<StaffUser<props>>;
  getById(id: string): Promise<StaffUser<props>>;
  getAll(): Promise<StaffUser<props>[]>
}